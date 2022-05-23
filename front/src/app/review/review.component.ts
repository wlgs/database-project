import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FakeReview } from '../shared/fakereview';
import { Review } from '../shared/review.model';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {
  fetchedReviews: Review[] = [];
  modelForm!: FormGroup;
  formErrors:Map<string, string>;
  validationMessages:Map<string, Map<string, string>>;
  constructor(private router: Router,
    private formBuilder: FormBuilder) {
      this.formErrors = new Map([
        ['name', ''],
        ['room_number', ''],
        ['description', '']
      ])

      this.validationMessages = new Map([
        ['name', new Map([['required', 'name cannot be blank']])],
        ['room_number', new Map([['required', 'room number cannot be blank']])],
        ['description', new Map([['required', 'description cannot be blank']])],
      ]);

    }

  ngOnInit(): void {
    this.modelForm = this.formBuilder.group({
      name: ['',Validators.required],
      room_number: ['',Validators.required],
      description: ['',Validators.required]
    });

    this.modelForm.valueChanges
          .subscribe((value) => {
            this.onControlValueChanged();
          })
    this.onControlValueChanged();
  }

  async onSubmit(form: FormGroup) {
    this.fetchedReviews = FakeReview;
    if (form.valid) {
      // dodac recenzje
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