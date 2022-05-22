import { Component, OnInit } from '@angular/core';
import { Customer } from 'src/app/shared/customer.model';
import { FakeData } from 'src/app/shared/fakedata';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {
  fetchedCustomers: Customer[] = [];

  constructor() { }

  ngOnInit(): void {
    //fetch customers
    this.fetchedCustomers = FakeData;
  }

}
