import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DropDialComponent } from 'src/app/components/dialogs/drop-dial/drop-dial.component';
import { TradeDialComponent } from 'src/app/components/dialogs/trade-dial/trade-dial.component';

@Injectable({
  providedIn: 'root'
})
export class DialogsService {

  constructor(
    private dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) { }


  openTradeDial(equipment: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      equipment: equipment
    }
    this.dialog.open(TradeDialComponent, dialogConfig).afterClosed().subscribe((data) => {
      if (data) {
        this._snackBar.open('Vente créée avec succès', 'Fermer');
      }
    });;
  }

  
  openDropDial(dofus: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      dofus: dofus
    }
    this.dialog.open(DropDialComponent, dialogConfig).afterClosed().subscribe((data) => {
      if (data) {
        this._snackBar.open('Drop créée avec succès', 'Fermer');
      }
    });;
  }

}


