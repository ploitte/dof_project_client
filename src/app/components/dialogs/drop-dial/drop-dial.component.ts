import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DofusService } from 'src/app/services/api/dofus.service';

@Component({
  selector: 'app-drop-dial',
  templateUrl: './drop-dial.component.html',
  styleUrls: ['./drop-dial.component.scss']
})
export class DropDialComponent implements OnInit {

  currDofus: any;
  newDofusDrop: any = {
    "dofus_id": "",
    "value": ""
  };
  disabledButton = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) data: any,
    private dialogRef: MatDialogRef<DropDialComponent>,
    private dofusApi: DofusService
  ) {
    this.currDofus = data.dofus;
    this.newDofusDrop.dofus_id = this.currDofus.id;
  }

  ngOnInit(): void {
  }


  createDofusDrop(): void {
    this.dofusApi.createDofusDrop(this.newDofusDrop).then(data=>{
      this.dialogRef.close(data);
      // Voir afficher message
    }).catch(err=>{
      // Voir Erreur
    })
  }
}
