import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FreeroomsComponent } from './freerooms.component';

describe('FreeroomsComponent', () => {
  let component: FreeroomsComponent;
  let fixture: ComponentFixture<FreeroomsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FreeroomsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FreeroomsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
