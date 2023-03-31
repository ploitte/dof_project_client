import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  pageList: any[] = [
    {
      name: "Objets",
      url: "/home/equipments",
      selected: true
    },
    {
      name: "Ventes",
      url: "/home/trades",
      selected: false
    },
    {
      name: "Dofus drop",
      url: "/home/dofusdrop",
      selected: false
    }, 
    {
      name: "Drops",
      url: "/home/drops",
      selected: false
    },
    {
      name: "Criket",
      url: "/home/criket",
      selected: false
    }
  ]

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void { }


  /**
   * Change la page
   * @param url any
   */
  changePage(url: string) {
    console.log(url)
    this.router.navigate([url]);
  }
}
