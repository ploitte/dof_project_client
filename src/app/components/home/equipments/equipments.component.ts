import { Component, OnInit, ViewChild } from '@angular/core';
import { EquipmentService } from 'src/app/services/api/equipment.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { TradeDialComponent } from '../../dialogs/trade-dial/trade-dial.component';
import { DialogsService } from 'src/app/services/dialogs/dialogs.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AlmanaxService } from 'src/app/services/almanax/almanax.service';

@Component({
  selector: 'app-equipments',
  templateUrl: './equipments.component.html',
  styleUrls: ['./equipments.component.scss']
})
export class EquipmentsComponent implements OnInit {

  inputValue: string = "";

  equipments: any[] = [];

  constructor(
    private equipmentApi: EquipmentService,
    private dialogService: DialogsService,
    private _snackBar: MatSnackBar,
    private almaApi: AlmanaxService
  ) { }

  ngOnInit(): void {

    this.almaApi.getbase("2022-04-01").then(data=>{
      console.log("data riched");
    })

    this.equipmentApi.getEquipmentByName("Harry").then(data => {
      this.equipments = data;
      console.log(data);
    })
  }

  getEquipmentsByName() {
    this.equipmentApi.getEquipmentByName(this.inputValue).then(data => {
      this.equipments = data;
      console.log(data);
    })
  }

  newTrade(equip: any) {
    this.dialogService.openTradeDial(equip);
  }

}
