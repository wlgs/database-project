import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/shared/data.service';
import { first } from 'rxjs/operators'

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {
  fetchedCustomers: any = [];

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.getClients().pipe(first()).subscribe(res => {
      this.fetchedCustomers = res;
      console.log(res);
    });
  }

}
