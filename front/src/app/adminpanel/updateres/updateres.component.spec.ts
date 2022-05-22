import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateresComponent } from './updateres.component';

describe('UpdateresComponent', () => {
  let component: UpdateresComponent;
  let fixture: ComponentFixture<UpdateresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateresComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
