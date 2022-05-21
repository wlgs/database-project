import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { AdminpanelComponent } from './adminpanel/adminpanel.component';
import { CustomerpanelComponent } from './customerpanel/customerpanel.component';
import { HomeComponent } from './home/home.component';
import { ReservationComponent } from './reservation/reservation.component';
import { ReviewComponent } from './review/review.component';

const routes: Routes = [
  {path: '', component:HomeComponent},
  {path: 'reservation', component:ReservationComponent},
  {path: 'review', component:ReviewComponent},
  {path: 'about', component:AboutComponent},
  {path: 'adminpanel', component:AdminpanelComponent},
  {path: 'customerpanel', component:CustomerpanelComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
