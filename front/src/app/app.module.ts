import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ReservationComponent } from './reservation/reservation.component';
import { ReviewComponent } from './review/review.component';
import { AdminpanelComponent } from './adminpanel/adminpanel.component';
import { CustomerpanelComponent } from './customerpanel/customerpanel.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SinglecustComponent } from './adminpanel/singlecust/singlecust.component';
import { UpdateresComponent } from './adminpanel/updateres/updateres.component';
import { CustomersComponent } from './adminpanel/customers/customers.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { EmployeesComponent } from './employees/employees.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ReservationComponent,
    ReviewComponent,
    AdminpanelComponent,
    CustomerpanelComponent,
    SinglecustComponent,
    UpdateresComponent,
    CustomersComponent,
    EmployeesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [HttpClient],
  bootstrap: [AppComponent]
})
export class AppModule { }
