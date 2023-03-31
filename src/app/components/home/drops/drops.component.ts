import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DofusService } from 'src/app/services/api/dofus.service';
import { DialogsService } from 'src/app/services/dialogs/dialogs.service';
import { DropDialComponent } from '../../dialogs/drop-dial/drop-dial.component';

@Component({
  selector: 'app-drops',
  templateUrl: './drops.component.html',
  styleUrls: ['./drops.component.scss']
})
export class DropsComponent implements OnInit {

  dofusList: any[] = [];
  dropsList: any[] = [];
  totalDrops:number = 0;

  constructor(
    private dofusApi: DofusService,
    private dialogService: DialogsService,
    private dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.getDofus();
  }


  initDatas(dofusDrops:any){
    const drops = [];
    const turquoises = [];
    const pourpres = [];
    const emeraudes = [];
    const vulbis = [];
    for (let i = 0; i < dofusDrops.length; i++) {
      const drop = dofusDrops[i];
      if(drop.dofus.name === "Emeraude"){emeraudes.push(drop)}
      if(drop.dofus.name === "Turquoise"){turquoises.push(drop)}
      if(drop.dofus.name === "Vulbis"){vulbis.push(drop)}
      if(drop.dofus.name === "Pourpre"){pourpres.push(drop)}
      this.totalDrops ++;
    }
    drops.push(turquoises, pourpres, emeraudes, vulbis);
    this.dropsList = drops;

    this.dofusList.map(dofus=>{
      if(dofus.name === "Emeraude"){dofus.count = emeraudes.length}
      if(dofus.name === "Turquoise"){dofus.count = turquoises.length}
      if(dofus.name === "Vulbis"){dofus.count = vulbis.length}
      if(dofus.name === "Pourpre"){dofus.count = pourpres.length}
    })

  }

  getDofus() {
    this.dofusApi.getDofus().then(data=>{
      this.dofusList = data.dofus;
      this.getDofusDrops();
    })
  }

  getDofusDrops() {
    this.dofusApi.getDofusDrops().then(data=>{
      this.initDatas(data.dofusDrops);
    })
  }

  newDrop(dofus: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      dofus: dofus
    }
    this.dialog.open(DropDialComponent, dialogConfig).afterClosed().subscribe((data) => {
      if (data) {
        console.log(data)
        this.initDatas(data.dofusDrops);
        this._snackBar.open('Drop créée avec succès', 'Fermer');
      }
    });;
  }

  updateDrop(drop: any): void {
    this.dofusApi.updateDofusDrop(drop).then(data => {
      this.initDatas(data.dofusDrops);
    })
  }

  deleteDrop(drop: any) {
    this.dofusApi.deleteDofusDrop(drop.id).then(data => {
      this.initDatas(data.dofusDrops);
    })
  }

}
