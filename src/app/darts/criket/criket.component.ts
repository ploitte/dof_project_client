import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PhoenixService } from 'src/app/services/darts/phoenix.service';
import { GameFinishDialogComponent } from '../dialogs/game-finish-dialog/game-finish-dialog.component';

@Component({
  selector: 'app-criket',
  templateUrl: './criket.component.html',
  styleUrls: ['./criket.component.scss']
})
export class CriketComponent implements OnInit {

  // All games
  crickets: any[] = [];

  roundMode: number = 10;

  //Current game
  cricket: any = {
    round: 1,
    roundPoints: 0,
    dartsNumber: 3,
    tamponData: [],
    doors: [
      {
        number: 20,
        value: 0
      },
      {
        number: 19,
        value: 0
      },
      {
        number: 18,
        value: 0
      }, {
        number: 17,
        value: 0
      },
      {
        number: 16,
        value: 0
      },
      {
        number: 15,
        value: 0
      },
      {
        number: 25,
        value: 0
      },
    ],
    mpr: 0,
    ppt: 0,
    rating: 0
  };

  gameFinished: boolean = false;

  // Stats globaux
  globalStats: any = {
    game_played: 0,
    mpr: 0,
    ppt: 0,
    rating: 0,
    bestRoundGame: 0,
    bestMprGame: 0
  }

  // Type de points (simple, double, triple)
  pointTypes: any[] = [
    {
      name: "Simple",
      value: 1
    },
    {
      name: "Double",
      value: 2
    }, {
      name: "Triple",
      value: 3
    }
  ]

  constructor(
    private dialog: MatDialog,
    private phoenix: PhoenixService,
    private _snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.retrieveAllGames();

    this.phoenix.getbase().then(data=>{
      console.log(data)
    })
  }

  // Update la partie
  getAndUpdateDoor(number: number, pointType: any, miss?: boolean) {

    // Loop sur les doors
    this.cricket.doors.map((door: any) => {

      if (door.number === number) {

        let pointsMarked = 0;
        let value = door.value;
        let round = this.cricket.round;
        let dartNumber = this.cricket.dartsNumber;

        // Si pas raté
        if (!miss) {

          // Si la porte est fermée ou si elle est fermée grace aux points
          if (door.value === 3 || (door.value + pointType.value) > 3) {
            door.value = 3;
            pointsMarked = ((door.value + pointType.value) - 3) * number;
            this.cricket.roundPoints += pointsMarked;
          } else if (door.value < 3) {
            door.value += pointType.value;
          }
        }

        // Une fleche a été jouée
        this.cricket.dartsNumber -= 1;

        // On ajoute un round si les 3 fleches ont été tirées
        if (this.cricket.dartsNumber === 0) {
          this.cricket.round += 1;
          this.cricket.dartsNumber = 3;
        }


        // On enregistre dans la mémoire tampon pour revenir en arriere si besoin
        this.cricket.tamponData.push(
          {
            number: number,
            pointsMarked: pointsMarked,
            value: value,
            round: round,
            pointType: pointType,
            dartNumber: dartNumber,
            miss: miss ? true : false
          }
        )

      }
    })

    // On met à jour les stats
    this.makeCricketStats();

    //Check si la partie est finie
    let countDoorValue = 0;
    this.cricket.doors.map((door: any) => countDoorValue += door.value);


    if (this.roundMode === 0 && countDoorValue === 21) {
      this.openFinishDial();
      this.saveFinishedGame();
    } else if (this.roundMode === 10 && this.cricket.round === 11) {
      this.cricket.round = 10;
      this.openFinishDial();
      this.saveFinishedGame();
    } else if (this.roundMode === 20 && this.cricket.round === 21) {
      this.cricket.round = 20;
      this.openFinishDial();
      this.saveFinishedGame();
    }

  }

  // Revient en arriere dans la partie
  back() {

    // Récupération du dernier tampon
    let lastTampon: any = this.cricket.tamponData.slice(-1)[0];

    if (lastTampon) {

      // On Supprime le tampon
      this.cricket.tamponData.pop();

      // On remet les valeurs comme elles étaient avant
      this.cricket.doors.map((door: any) => {
        if (door.number === lastTampon.number) {
          door.value = lastTampon.value;
          this.cricket.roundPoints -= lastTampon.pointsMarked
          this.cricket.round = lastTampon.round
          this.cricket.dartsNumber = lastTampon.dartNumber;
        }
      })

      // On met à jour les stats
      this.makeCricketStats();

    }

  }

  // Recommence la partie
  restart() {
    this.cricket = {
      round: 1,
      roundPoints: 0,
      dartsNumber: 3,
      tamponData: [],
      doors: [
        {
          number: 20,
          value: 0
        },
        {
          number: 19,
          value: 0
        },
        {
          number: 18,
          value: 0
        }, {
          number: 17,
          value: 0
        },
        {
          number: 16,
          value: 0
        },
        {
          number: 15,
          value: 0
        },
        {
          number: 25,
          value: 0
        },
      ],
      mpr: 0,
      ppt: 0,
      rating: 0
    };
  }

  // On enregistre la partie dans la data
  saveFinishedGame() {
    this.crickets.push(this.cricket);
    localStorage.setItem('all_games', JSON.stringify(this.crickets));
    this.restart();
    this.retrieveAllGames();
    this.gameFinished = false;
  }

  // On save la partie pour la finir plus tard
  saveCurrentGame() {
    localStorage.setItem('current_game', JSON.stringify(this.cricket));
  }

  // On récupère la partie en cours
  retrieveCurrentGame() {
    let currentGame = JSON.parse(localStorage.getItem("current_game") || "");
    if (currentGame)
      this.cricket = currentGame;
  }

  // On récupère toutes les parties
  retrieveAllGames() {
    let allGames = JSON.parse(localStorage.getItem("all_games") || '[]');

    // this.cricket = allGames[0];
    // this.openFinishDial();

    if (allGames.length > 0) {
      this.crickets = allGames;
      this.makeCricketsStats();
    }


  }

  // Via les data on initialise les stats pour la partie en cours
  makeCricketStats() {
    let totalDarts = 0;
    let totalPoints = 0;
    let totalMarques = 0;
    let rounds = 0;
    this.cricket.tamponData.map((data: any) => {
      totalDarts += 1;
      totalPoints += data.number * data.pointType.value;
      totalMarques += data.pointType.value;
    })
    rounds = totalDarts / 3;

    // Calcul des moyennes
    if (rounds >= 1 && totalDarts % 3 === 0) {
      this.cricket.rating = Math.floor(totalPoints / rounds);
      this.cricket.mpr = Math.round((totalMarques / rounds) * 100) / 100;
    }

    this.cricket.ppt = Math.floor(totalPoints / totalDarts);
    this.cricket.totalDarts = totalDarts;

  }

  // Via les data on initialise les stats globaux
  makeCricketsStats() {
    let totalDarts = 0;
    let totalPoints = 0;
    let totalMarques = 0;
    let rounds = 0;
    let bestRoundGame = 99;
    let bestMprGame = 0;

    this.crickets.map((cricket: any) => {

      bestRoundGame = (cricket.round < bestRoundGame) ? cricket.round : bestRoundGame;
      bestMprGame = (cricket.mpr > bestMprGame) ? cricket.mpr : bestMprGame;

      cricket.tamponData.map((data: any) => {
        totalDarts += 1;
        totalPoints += data.number * data.pointType.value;
        totalMarques += data.pointType.value;
      });
    });

    rounds = totalDarts / 3;

    // Calcul des moyennes
    this.globalStats.game_played = this.crickets.length;
    this.globalStats.ppt = Math.floor(totalPoints / totalDarts);
    this.globalStats.rating = Math.floor(totalPoints / rounds);
    this.globalStats.mpr = Math.round((totalMarques / rounds) * 100) / 100;
    this.globalStats.bestRoundGame = bestRoundGame;
    this.globalStats.bestMprGame = bestMprGame;
  }

  changeRoundMode(mode: number) {
    if (this.roundMode != mode) {
      this.roundMode = mode;
      this.restart();
    }
  }

  // Dialogs
  // Ouvre la popup de fin de partie
  openFinishDial() {
    // this.saveFinishedGame();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      game: this.cricket
    }
    this.dialog.open(GameFinishDialogComponent, dialogConfig).afterClosed().subscribe((data) => {
      if (data) {
        this._snackBar.open('Partie ajoutée avec succès', 'Fermer');
      }
    });;
  }


}
