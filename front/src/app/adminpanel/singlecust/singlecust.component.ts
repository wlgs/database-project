import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs';
import { DataService } from 'src/app/shared/data.service';
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
  fetchedReservations: any = [];

  constructor(private router: Router,
    private dataService: DataService,
    private formBuilder: FormBuilder) {
      this.formErrors = new Map([
        ['email', '']
      ])

      this.validationMessages = new Map([
        ['email', new Map([['required', 'email cannot be blank']])]
      ]);

    }

  ngOnInit(): void {
    this.modelForm = this.formBuilder.group({
      email: ['',Validators.required],
    });

    this.modelForm.valueChanges
          .subscribe((value) => {
            this.onControlValueChanged();
          })
    this.onControlValueChanged();
  }

  async onSubmit(form: FormGroup) {
    if (form.valid) {
      // wyswietlic rezerwacje customera albo komunikat ze nie ma takiego
      this.fetchedReservations = this.dataService.getClientReservations(form.value.email).pipe(first()).subscribe((res:any) => {
        res.map((el:any) => {
          el.start_date = el.start_date.split('T')[0];
          el.end_date = el.end_date.split('T')[0];
        });
        this.fetchedReservations = res;
        console.log(res);
      });
      console.log('reservations found!');
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