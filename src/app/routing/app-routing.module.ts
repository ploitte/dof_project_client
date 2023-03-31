import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DropSimulationComponent } from '../components/home/drop-simulation/drop-simulation.component';
import { DropsComponent } from '../components/home/drops/drops.component';
import { EquipmentsComponent } from '../components/home/equipments/equipments.component';
import { HomeComponent } from '../components/home/home.component';
import { TradesComponent } from '../components/home/trades/trades.component';
import { CriketComponent } from '../darts/criket/criket.component';
import { TestcomponentComponent } from '../test/testcomponent/testcomponent.component';

const routes: Routes = [

  {
    path: '',
    redirectTo: 'home',
    pathMatch: "full"
  },

  {
    path: 'test',
    component: TestcomponentComponent
  },

  {
    path: 'criket',
    component: CriketComponent
  },

  {
    path: 'home',
    component: HomeComponent,
    // canActivate: [AuthGuardMainService],
    children: [
      { path: '', redirectTo: 'equipments', pathMatch: 'full' },
      { path: 'equipments', component: EquipmentsComponent },
      { path: 'trades', component: TradesComponent },
      { path: 'dofusdrop', component: DropSimulationComponent },
      { path: 'drops', component: DropsComponent },
      { path: 'criket', component: CriketComponent },
      // { path: 'account', component: AccountComponent },
      // { path: 'addresses', component: AddressesComponent },
      // { path: 'cards', component: CardsComponent },
      // { path: 'notes', component: NotesComponent },
      // { path: 'notes/:merchantId', component: NotesComponent },
      // { path: 'orders', component: OrdersComponent },
      // { path: 'recharge/:merchantId', component: RechargeComponent },
      // { path: 'refills/:merchantId', component: RefillsComponent },
      // { path: 'merchantOptions/:merchantId', component: MerchantOptionsComponent },
      // { path: 'fidelity/:merchantId', component: FidelityComponent },
      // { path: 'cashlessOptions/:merchantId', component: CashlessOptionsComponent }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    useHash: true
  })],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
