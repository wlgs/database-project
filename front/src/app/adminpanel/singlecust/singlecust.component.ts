import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FakeReservation } from 'src/app/shared/fakereservation';
import { Reservation } from 'src/app/shared/reservation.model';

@Component({
  selector: 'app-singlecust',
  templateUrl: './singlecust.component.html',
  styleUrls: ['./singlecust.component.css']
})
export class SinglecustComponent implements OnInit {
  modelForm!: FormGroup;
  formErrors:Map<string, string>;
  validationMessages:Map<string, Map<string, string>>;
  fetchedReservations: Reservation[] = [];

  constructor(private router: Router,
    private formBuilder: FormBuilder) {
      this.formErrors = new Map([
        ['firstname', ''],
        ['lastname', ''],
        ['email', ''],
        ['phone', '']
      ])

      this.validationMessages = new Map([
        ['firstname', new Map([['required', 'firstname cannot be blank']])],
        ['lastname', new Map([['required', 'lastname cannot be blank']])],
        ['email', new Map([['required', 'email cannot be blank']])],
        ['phone', new Map([['required', 'phone cannot be blank']])],
      ]);

    }

  ngOnInit(): void {
    this.modelForm = this.formBuilder.group({
      firstname: ['',Validators.required],
      lastname: ['',Validators.required],
      email: ['',Validators.required],
      phone: ['',Validators.required],
    });

    this.modelForm.valueChanges
          .subscribe((value) => {
            this.onControlValueChanged();
          })
    this.onControlValueChanged();
  }

  async onSubmit(form: FormGroup) {
    this.fetchedReservations = FakeReservation;
    if (form.valid) {
      // wyswietlic rezerwacje customera albo komunikat ze nie ma takiego
      
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