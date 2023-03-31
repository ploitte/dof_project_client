import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MatDialog, MatDialogConfig, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EquipmentService } from 'src/app/services/api/equipment.service';
import { TradeService } from 'src/app/services/api/trade.service';


@Component({
  selector: 'app-trade-dial',
  templateUrl: './trade-dial.component.html',
  styleUrls: ['./trade-dial.component.scss']
})
export class TradeDialComponent implements OnInit {

  currEquipment: any;
  estimationPrice: number = 0;
  newTrade: any = {
    "equipment_id": "",
    "crafting_price": "",
    "selling_price": "",
    "sold": false
  };
  disabledButton = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) data: any,
    private dialogRef: MatDialogRef<TradeDialComponent>,
    private tradeApi: TradeService
  ) {
    this.currEquipment = data.equipment;
    this.getEstimationPrice();
    this.newTrade.equipment_id = this.currEquipment._id;
  }

  ngOnInit(): void { }

  /**
   * Get estimation price
   * @param event 
   */
  getEstimationPrice(event?: any): void {
    console.log("getEstimationPrice")
    let count = 0;
    this.currEquipment.recipe.map((ress: any) => {
      count += ress.price ? (ress.price * ress.quantity) : 0;
    })
    this.estimationPrice = count;
  }
  /**
   * Create trade
   */
  createTrade(): void {
    this.disabledButton = true;
    this.tradeApi.createTrade(this.newTrade, this.currEquipment).then(data=>{
      this.dialogRef.close(true);
      // Voir afficher message
    }).catch(err=>{
      // Voir Erreur
    })
  }

}
