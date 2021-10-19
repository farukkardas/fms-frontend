import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FertilizerDeleteComponent } from './fertilizer-delete.component';

describe('FertilizerDeleteComponent', () => {
  let component: FertilizerDeleteComponent;
  let fixture: ComponentFixture<FertilizerDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FertilizerDeleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FertilizerDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
