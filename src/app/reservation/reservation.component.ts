import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Reservation } from '../shared/reservation.model';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent implements OnInit {

  modelForm!: FormGroup;
  formErrors:Map<string, string>;
  validationMessages:Map<string, Map<string, string>>;

  constructor(private router: Router,
    private formBuilder: FormBuilder) {
      this.formErrors = new Map([
        ['firstname', ''],
        ['lastname', ''],
        ['room_id', ''],
        ['start_date', ''],
        ['end_date', ''],
        ['email', ''],
        ['phone', '']
      ])

      this.validationMessages = new Map([
        ['firstname', new Map([['required', 'firstname cannot be blank']])],
        ['lastname', new Map([['required', 'lastname cannot be blank']])],
        ['email', new Map([['required', 'email cannot be blank']])],
        ['phone', new Map([['required', 'phone cannot be blank']])],
        ['room_id', new Map([['required', 'room cannot be blank']])],
        ['start_date', new Map([['required', 'please specify the start date']])],
        ['end_date', new Map([['required', 'please specify the end date']])],
      ]);

    }

  ngOnInit(): void {
    this.modelForm = this.formBuilder.group({
      firstname: ['',Validators.required],
      lastname: ['',Validators.required],
      email: ['',Validators.required],
      phone: ['',Validators.required],
      room_id: ['',Validators.required],
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
    const newRes: Reservation = {
        client_id: this.getClientId(),
        id: this.getReservationId(),
        status: 'P',
        room_id: form.value.room_id,
        start_date: form.value.start_date,
        end_date: form.value.end_date,
    }
    if (form.valid) {
      // dodac rezerwacje
      
      form.reset();
    } else {
      this.checkValidity('ignore-dirty');
    }
  }

  onControlValueChanged() {    
    this.checkValidity('check-dirty');
  }

  getReservationId() {
    // do zrobienia
    return 1
  }

  getClientId() {
    // do zrobienia
    return 1
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
