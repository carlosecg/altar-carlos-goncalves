import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GridGeneratorComponent } from '../components/grid-generator/grid-generator.component';
import { FormsModule } from '@angular/forms';
import { PaymentsComponent } from '../components/payments/payments.component';
import { LiveCodeComponent } from '../components/live-code/live-code.component';
import { HttpClientModule } from '@angular/common/http';
import { TopnavComponent } from '../components/topnav/topnav.component';

@NgModule({
  declarations: [
    AppComponent,
    TopnavComponent,
    GridGeneratorComponent,
    LiveCodeComponent,
    PaymentsComponent
  ],
  imports: [
    FormsModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
