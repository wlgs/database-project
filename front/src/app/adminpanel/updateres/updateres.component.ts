import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs';
import { DataService } from 'src/app/shared/data.service';

@Component({
  selector: 'app-updateres',
  templateUrl: './updateres.component.html',
  styleUrls: ['./updateres.component.css']
})
export class UpdateresComponent implements OnInit {

  modelForm!: FormGroup;
  formErrors:Map<string, string>;
  validationMessages:Map<string, Map<string, string>>;

  constructor(private dataService: DataService,
    private formBuilder: FormBuilder) {
      this.formErrors = new Map([
        ['id', ''],
        ['status', ''],
        ['room_type', ''],
        ['start_date', ''],
        ['end_date', '']
      ])

      this.validationMessages = new Map([
        ['id', new Map([['required', 'id cannot be blank']])],
        ['status', new Map([['required', 'status cannot be blank']])],
        ['room_type', new Map([['required', 'room type cannot be blank']])],
        ['start_date', new Map([['required', 'please specify the start date']])],
        ['end_date', new Map([['required', 'please specify the end date']])],
      ]);

    }

  ngOnInit(): void {
    this.modelForm = this.formBuilder.group({
      id: ['',Validators.required],
      status: ['',Validators.required],
      room_type: ['',Validators.required],
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
      // TODO
      this.dataService.updateReservation(form.value.id,form.value.start_date,form.value.end_date,form.value.status,form.value.room_id).pipe(first()).subscribe(res => {
        console.log(res);
      });
      console.log('reservation updated!');
      form.reset();
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