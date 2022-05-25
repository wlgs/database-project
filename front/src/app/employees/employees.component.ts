import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs';
import { DataService } from '../shared/data.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {
  fetchedEmployees: any = [];

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.getEmployees().pipe(first()).subscribe(res => {
      this.fetchedEmployees = res;
      console.log(res);
    })
  }

}
