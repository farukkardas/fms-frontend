import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MilksalesComponent } from './milksales.component';

describe('MilksalesComponent', () => {
  let component: MilksalesComponent;
  let fixture: ComponentFixture<MilksalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MilksalesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MilksalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
