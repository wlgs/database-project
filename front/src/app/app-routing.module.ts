import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminpanelComponent } from './adminpanel/adminpanel.component';
import { CustomersComponent } from './adminpanel/customers/customers.component';
import { SinglecustComponent } from './adminpanel/singlecust/singlecust.component';
import { UpdateresComponent } from './adminpanel/updateres/updateres.component';
import { CustomerpanelComponent } from './customerpanel/customerpanel.component';
import { EmployeesComponent } from './employees/employees.component';
import { ReservationComponent } from './reservation/reservation.component';
import { ReviewComponent } from './review/review.component';

const routes: Routes = [
  {path: '', component:ReservationComponent},
  {path: 'review', component:ReviewComponent},
  {path: 'adminpanel', component:AdminpanelComponent},
  {path: 'customerpanel', component:CustomerpanelComponent},
  {path: 'adminpanel/customers', component:CustomersComponent},
  {path: 'adminpanel/singlecust', component:SinglecustComponent},
  {path: 'adminpanel/updateres', component:UpdateresComponent},
  {path: 'employees', component:EmployeesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
