import { Component, OnInit } from '@angular/core';
import { DataService } from '../shared/data.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {
  fetchedEmployees: any[] = [];

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
  }

}
