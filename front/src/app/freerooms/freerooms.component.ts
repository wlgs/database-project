import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs';
import { DataService } from '../shared/data.service';

@Component({
  selector: 'app-freerooms',
  templateUrl: './freerooms.component.html',
  styleUrls: ['./freerooms.component.css']
})
export class FreeroomsComponent implements OnInit {

  modelForm!: FormGroup;
  formErrors:Map<string, string>;
  validationMessages:Map<string, Map<string, string>>;
  fetchedRooms: any = [];

  constructor(private dataService: DataService,
    private formBuilder: FormBuilder) {
      this.formErrors = new Map([
        ['start_date', ''],
        ['end_date', '']
      ])

      this.validationMessages = new Map([
        ['start_date', new Map([['required', 'please specify the start date']])],
        ['end_date', new Map([['required', 'please specify the end date']])],
      ]);

    }

  ngOnInit(): void {
    this.modelForm = this.formBuilder.group({
      start_date: ['',Validators.required],
      end_date: ['',Validators.required]
    });

    this.modelForm.valueChanges
          .subscribe((value) => {
            this.onControlValueChanged();
          })
    this.onControlValueChanged();
  }

  async onSubmit(form: FormGroup) {
    if (form.valid) {
      this.dataService.getFreeRoomsByDay(form.value.start_date,form.value.end_date).pipe(first()).subscribe((res:any) => {
        console.log(res);
        this.fetchedRooms = res;
    })
    } else {
      this.checkValidity('ignore-dirty');
    }
  }

  onControlValueChanged() {    
    this.checkValidity('check-dirty');
  }

  checkValidity(mode:string) {
    const form = this.modelForm;
      for (let [key, value] of this.formErrors) {     
        this.formErrors.set(key, '');
        let control = form.get(key); 
        const modeControl = mode =='check-dirty' ? control?.dirty : true;
        if (control && modeControl && !control.valid) {
          const validationMessages = this.validationMessages.get(key);
          for (const key1 in control.errors) {
            this.formErrors.set(key, validationMessages?.get(key1) + ' ')
          }
        }
      }
  }
}