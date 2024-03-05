import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GridGeneratorComponent } from '../components/grid-generator/grid-generator.component';
import { PaymentsComponent } from '../components/payments/payments.component';

const routes: Routes = [
  { path: '', redirectTo: 'grid', pathMatch: 'prefix' },
  { path: 'grid', component: GridGeneratorComponent },
  { path: 'payments', component: PaymentsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
