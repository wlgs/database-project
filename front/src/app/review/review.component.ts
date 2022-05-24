import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs';
import { DataService } from '../shared/data.service';
import { FakeReview } from '../shared/fakereview';
import { Review } from '../shared/review.model';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {
  fetchedReviews: any = [];
  modelForm!: FormGroup;
  formErrors:Map<string, string>;
  validationMessages:Map<string, Map<string, string>>;
  constructor(private dataService: DataService,
    private router: Router,
    private formBuilder: FormBuilder) {
      this.formErrors = new Map([
        ['name', ''],
        ['stars', ''],
        ['description', '']
      ])

      this.validationMessages = new Map([
        ['name', new Map([['required', 'name cannot be blank']])],
        ['stars', new Map([['required', 'stars cannot be blank']])],
        ['description', new Map([['required', 'description cannot be blank']])],
      ]);

    }

  ngOnInit(): void {
    this.dataService.getReviews().pipe(first()).subscribe(res => {
      this.fetchedReviews = res;
    });
    this.modelForm = this.formBuilder.group({
      name: ['',Validators.required],
      stars: ['',Validators.required],
      description: ['',Validators.required]
    });

    this.modelForm.valueChanges
          .subscribe((value) => {
            this.onControlValueChanged();
          })
    this.onControlValueChanged();
  }

  async onSubmit(form: FormGroup) {
    if (form.valid) {
      // dodac recenzje
      this.dataService.postReview(form.value.name,form.value.stars,form.value.description).subscribe(data => {
      });
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