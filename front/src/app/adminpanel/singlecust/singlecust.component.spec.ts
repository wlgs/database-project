import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SinglecustComponent } from './singlecust.component';

describe('SinglecustComponent', () => {
  let component: SinglecustComponent;
  let fixture: ComponentFixture<SinglecustComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SinglecustComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SinglecustComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
