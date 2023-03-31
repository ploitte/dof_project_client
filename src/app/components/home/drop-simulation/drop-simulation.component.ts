import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-drop-simulation',
  templateUrl: './drop-simulation.component.html',
  styleUrls: ['./drop-simulation.component.scss']
})
export class DropSimulationComponent implements OnInit {

  perso1: number = 580;
  perso2: number = 580;
  perso3: number = 580;
  perso4: number = 480;
  grpPP: number = this.perso1 + this.perso2 + this.perso3 + this.perso4;
  challPercent: number = 40;

  bonusPack: boolean = true;
  bonusAlliance: boolean = true;

  tutuPercent: number = 0;
  pourprePercent: number = 0;
  emeraudePercent: number = 0;
  vulbisPercent: number = 0;
  persoPercent: number = 0;

  tutuTaux: number = 0.01;
  pourpreTaux: number = 0.008;
  emeraudeTaux: number = 0.1;
  vulbisTaux: number = 0.001;
  persoTaux: number = 0;

  prprPrice:number = 14;
  prprPriceCapture:number = 45000;
  prprTimeCapture:number = 2.5;
  kamasEuro:number = 3.2;
  moneyHourPourpre:number = 0;


  constructor() { };
  ngOnInit(): void {
  }

  calculPercents() {
    let that = this;
    that.grpPP = this.perso1 + this.perso2 + this.perso3 + this.perso4;
    let calculPercentFcnt = function (percentDofus: number) {
      let bonusPercent = that.challPercent + (that.bonusPack ? 150 : 0) + (that.bonusAlliance ? 25 : 0);
      let result = (percentDofus * (((that.grpPP * 2.5) / 100) + (0 / 100)) * (1 + (bonusPercent / 100))) / 100;
      let percentResult = 1 / result;
      return Math.floor(percentResult);
    };

    that.tutuPercent = calculPercentFcnt(that.tutuTaux);
    that.pourprePercent = calculPercentFcnt(that.pourpreTaux);
    that.emeraudePercent = calculPercentFcnt(that.emeraudeTaux);
    that.vulbisPercent = calculPercentFcnt(that.vulbisTaux);
    that.persoPercent = calculPercentFcnt(that.persoTaux);

    let realprprPrize = (that.prprPrice - ((that.prprPriceCapture * that.pourprePercent)/1000000));
    let hourDrop = (that.prprTimeCapture * that.pourprePercent)/60;
    let prprPrizeEuro = that.kamasEuro * realprprPrize; 
    that.moneyHourPourpre = prprPrizeEuro/hourDrop;

    console.log({"realprprPrize": realprprPrize, "hourDrop": hourDrop, "prprPrizeEuro":prprPrizeEuro, "moneyHourPourpre" : that.moneyHourPourpre})

  }


}
