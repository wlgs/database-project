import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs';
import { DataService } from '../shared/data.service';

@Component({
  selector: 'app-roomstypes',
  templateUrl: './roomstypes.component.html',
  styleUrls: ['./roomstypes.component.css']
})
export class RoomstypesComponent implements OnInit {

  fetchedRooms: any = [];

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.getRoomTypes().pipe(first()).subscribe(res => {
      console.log(res);
      this.fetchedRooms = res;
    })
  }

}
