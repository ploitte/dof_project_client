import { FunctionExpr } from '@angular/compiler';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { BehaviorSubject, combineLatest, forkJoin, Observable, Subject } from 'rxjs';
import { TradeService } from 'src/app/services/api/trade.service';

@Component({
  selector: 'app-trades',
  templateUrl: './trades.component.html',
  styleUrls: ['./trades.component.scss']
})
export class TradesComponent implements OnInit {

  @ViewChild('searchFiltersBar', { read: ElementRef, static: false })
  searchFiltersBar!: ElementRef;

  trades: any[] = [];
  searchTrades: any[] = [];
  showSearchTrades: boolean = false;

  searchTrade: string = "";
  sortSelected: BehaviorSubject<number> = new BehaviorSubject(1);
  sortDirection: BehaviorSubject<number> = new BehaviorSubject(1);

  /**Observables */
  tradeObs = this.tradeApi.getTrades();
  sortSelctedObs = this.sortSelected.asObservable();
  observables = combineLatest([
    this.tradeObs,
    this.sortSelctedObs
  ]);

  totalBenefice: number = 0;
  totalTot: number = 0;
  totalInvest: number = 0;
  totalTrade: number = 0;

  waitingBenefice: number = 0;
  waitingTot: number = 0;
  waitingInvest: number = 0;
  waitingTrade: number = 0;

  soldBenefice: number = 0;
  soldTot: number = 0;
  soldInvest: number = 0;
  soldTrade: number = 0;

  constructor(
    private tradeApi: TradeService
  ) { }

  ngOnInit(): void {

    /** On souscrit aux observables */
    this.observables.subscribe(data => {

      /**
       * On récupère les trades
       */
      this.initDatas(data[0].trades);
      this.trades = data[0].trades;
      this.sortBy();

    })


  }

  ngAfterViewInit(): void {
  }

  /**
   * Initialise les données
   * @param trades 
   */
  initDatas(trades: any[]) {
    this.totalBenefice = 0;
    this.totalTot = 0;
    this.totalInvest = 0;
    this.totalTrade = 0;
    this.waitingBenefice = 0;
    this.waitingTot = 0;
    this.waitingInvest = 0;
    this.waitingTrade = 0;
    this.soldBenefice = 0;
    this.soldTot = 0;
    this.soldInvest = 0;
    this.soldTrade = 0;
    trades.map(trade => {

      this.totalBenefice += (trade.selling_price - trade.crafting_price);
      this.totalTot += trade.selling_price;
      this.totalInvest += trade.crafting_price;
      this.totalTrade += 1;

      if (!trade.sold) {
        this.waitingBenefice += (trade.selling_price - trade.crafting_price);
        this.waitingTot += trade.selling_price;
        this.waitingInvest += trade.crafting_price;
        this.waitingTrade += 1;
      } else {
        this.soldBenefice += (trade.selling_price - trade.crafting_price);
        this.soldTot += trade.selling_price;
        this.soldInvest += trade.crafting_price;
        this.soldTrade += 1;
      }
    })
  }

  /**
   * Modifie une vente
   * @param trade 
   */
  updateTrade(trade: any): void {
    this.tradeApi.updateTrade(trade).then(data => {
      this.initDatas(data.trades);
      this.trades = data.trades;
    })
  }

  /**
   * Trade vendu
   * @param trade 
   */
  tradeSolded(trade: any) {
    trade.sold = true;
    this.updateTrade(trade);
  }

  /**
  * Annuler une vente
  * @param trade 
  */
  tradeCanceled(trade: any) {
    trade.sold = false;
    this.updateTrade(trade);
  }

  /**
  * Annuler une vente
  * @param trade 
  */
  deleteTrade(trade: any) {
    this.tradeApi.deleteTrade(trade.id).then(data => {
      this.initDatas(data.trades);
      this.trades = data.trades;
    })
  }

  /**
   * Trie les ventes par... 
   * @param sortValue 
   */
  sortBy() {
    const sortValue = this.sortSelected.getValue();
    const sortDirection = this.sortDirection.getValue();
    let filter: any;

    switch (sortValue) {

      case 1:

        if (sortDirection < 1) {
          filter = this.trades.sort(function (a, b) {
            return a.name - b.name;
          });
        } else {
          filter = this.trades.sort(function (a, b) {
            return b.name - a.name;
          });
        }

        break;

      case 2:

        if (sortDirection < 1) {
          filter = this.trades.sort(function (a, b) {
            return a.sold - b.sold;
          });
        } else {
          filter = this.trades.sort(function (a, b) {
            return b.sold - a.sold;
          });
        }

        break;

      case 3:

        if (sortDirection < 1) {
          filter = this.trades.sort(function (a, b) {
            return a.crafting_price - b.crafting_price;
          });
        } else {
          filter = this.trades.sort(function (a, b) {
            return b.crafting_price - a.crafting_price;
          });
        }

        break;

      case 4:

        if (sortDirection < 1) {
          filter = this.trades.sort(function (a, b) {
            return a.selling_price - b.selling_price;
          });
        } else {
          filter = this.trades.sort(function (a, b) {
            return b.selling_price - a.selling_price;
          });
        }

        break;

      case 5:

        if (sortDirection < 1) {
          filter = this.trades.sort(function (a, b) {
            return (a.selling_price - a.crafting_price) - (b.selling_price - b.crafting_price);
          });
        } else {
          filter = this.trades.sort(function (a, b) {
            return (b.selling_price - b.crafting_price) - (a.selling_price - a.crafting_price);
          });
        }

        break;

      case 6:

        if (sortDirection < 1) {
          filter = this.trades.sort(function (a, b) {
            return ((a.selling_price - a.crafting_price) / a.crafting_price) - ((b.selling_price - b.crafting_price) / b.crafting_price);
          });
        } else {
          filter = this.trades.sort(function (a, b) {
            return ((b.selling_price - b.crafting_price) / b.crafting_price) - ((a.selling_price - a.crafting_price) / a.crafting_price);
          });
        }

        break;

      case 7:

        if (sortDirection < 1) {

          filter = this.trades.sort(function (a, b) {
            return ((a.selling_price - a.crafting_price) / a.crafting_price) - ((b.selling_price - b.crafting_price) / b.crafting_price);
          });

        } 
        
        else {
          filter = this.trades.sort(function (a, b) {
            return ((b.selling_price - b.crafting_price) / b.crafting_price) - ((a.selling_price - a.crafting_price) / a.crafting_price);
          });
        }


        


        break;
    }

    this.trades = filter;

  }

  sortTop(propretyName: string) {
    const sorted = this.trades.sort(function (a, b) {
      return b.propretyName - a.propretyName;
    });
    this.trades = sorted;
  }

  sortBottom(propretyName: string) {
    const sorted = this.trades.sort(function (a, b) {
      return a.propretyName - b.propretyName;
    });
    this.trades = sorted;
  }

  /**
   * Recherche un trade par son nom
   */
  searchTradeByName() {
    let filter = this.trades.filter(item => item.equipment.name.toLowerCase().indexOf(this.searchTrade.toLowerCase()) > -1);
    this.searchTrades = filter;
    this.showSearchTrades = this.searchTrade.length > 0 ? true : false;
  }

  /**
   * Reset la recherche
   */
  resetSearch() {
    this.searchTrade = "";
    this.showSearchTrades = false;
  }

  /**
   * SetSelectedSort
   * @param newValue 
   */
  setSelectedSort(newValue: number) {
    this.sortSelected.next(newValue);
  }


  /**
   * 
   * Trier par:
   * 
   * Vendu / pas vendu
   * Prix de craft
   * Benefice net
   * Benefice net % par rapport au prix de craft
   * Prix de vente
   * Par nom d'item
   * 
   * Rechercher 
   */

}
