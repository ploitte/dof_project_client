import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './routing/app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './modules/material/material.module';
import { EquipmentsComponent } from './components/home/equipments/equipments.component';
import { TradesComponent } from './components/home/trades/trades.component';
import { TestcomponentComponent } from './test/testcomponent/testcomponent.component';
import { TradeDialComponent } from './components/dialogs/trade-dial/trade-dial.component';
import { MatDialogModule } from '@angular/material/dialog';
import { PricePackPipe } from './pipes/price-pack.pipe';
import { RoundedPipe } from './pipes/rounded.pipe';
import { DropSimulationComponent } from './components/home/drop-simulation/drop-simulation.component';
import { CriketComponent } from './darts/criket/criket.component';
import { PointTypePipe } from './pipes/point-type.pipe';
import { GameFinishDialogComponent } from './darts/dialogs/game-finish-dialog/game-finish-dialog.component';
import { DropsComponent } from './components/home/drops/drops.component';
import { DropDialComponent } from './components/dialogs/drop-dial/drop-dial.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    EquipmentsComponent,
    TradesComponent,
    TestcomponentComponent,
    TradeDialComponent,
    PricePackPipe,
    RoundedPipe,
    DropSimulationComponent,
    CriketComponent,
    PointTypePipe,
    GameFinishDialogComponent,
    DropsComponent,
    DropDialComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    FormsModule,
    HttpClientModule,
    FlexLayoutModule,
    BrowserAnimationsModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
