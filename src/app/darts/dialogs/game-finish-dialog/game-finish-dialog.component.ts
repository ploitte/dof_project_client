import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-game-finish-dialog',
  templateUrl: './game-finish-dialog.component.html',
  styleUrls: ['./game-finish-dialog.component.scss']
})
export class GameFinishDialogComponent implements OnInit {

  game: any;
  totalMissedShoots: number = 0;
  totalShoots: number = 0;
  percentMissed: number = 0;

  constructor(
    @Inject(MAT_DIALOG_DATA) data: any,
    private dialogRef: MatDialogRef<GameFinishDialogComponent>,
  ) {
    this.game = data.game;
    console.log(this.game)
    this.getDetailsStats();
  }

  ngOnInit(): void {
  }

  getDetailsStats() {
    let totalMissedShoots = 0;
    let totalShoots = 0;

    this.game.tamponData.map((data: any) => {
      totalShoots += 1;
      if (data.pointType.name === "miss") {
        totalMissedShoots += 1;
      }
    });

    this.totalMissedShoots = totalMissedShoots;
    this.totalShoots = totalShoots;
    this.percentMissed = Math.round(((totalMissedShoots / totalShoots) * 100) * 100) / 100;

    let test = this.game.tamponData.filter((data: any) => {
      return data.pointType.name === "miss";
    });

  }

}
