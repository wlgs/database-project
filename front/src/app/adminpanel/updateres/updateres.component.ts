import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-updateres',
  templateUrl: './updateres.component.html',
  styleUrls: ['./updateres.component.css']
})
export class UpdateresComponent implements OnInit {

  modelForm!: FormGroup;
  formErrors:Map<string, string>;
  validationMessages:Map<string, Map<string, string>>;

  constructor(private router: Router,
    private formBuilder: FormBuilder) {
      this.formErrors = new Map([
        ['id', ''],
        ['status', ''],
        ['room_id', ''],
        ['start_date', ''],
        ['end_date', ''],
        ['client_id', '']
      ])

      this.validationMessages = new Map([
        ['id', new Map([['required', 'id cannot be blank']])],
        ['client_id', new Map([['required', 'client id cannot be blank']])],
        ['status', new Map([['required', 'status cannot be blank']])],
        ['room_id', new Map([['required', 'room cannot be blank']])],
        ['start_date', new Map([['required', 'please specify the start date']])],
        ['end_date', new Map([['required', 'please specify the end date']])],
      ]);

    }

  ngOnInit(): void {
    this.modelForm = this.formBuilder.group({
      id: ['',Validators.required],
      client_id: ['',Validators.required],
      status: ['',Validators.required],
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
    if (form.valid) {
      // update rezerwacji
      
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