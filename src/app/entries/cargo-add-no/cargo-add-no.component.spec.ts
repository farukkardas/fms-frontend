import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CargoAddNoComponent } from './cargo-add-no.component';

describe('CargoAddNoComponent', () => {
  let component: CargoAddNoComponent;
  let fixture: ComponentFixture<CargoAddNoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CargoAddNoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CargoAddNoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
