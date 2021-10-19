import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalfDeleteComponent } from './calf-delete.component';

describe('CalfDeleteComponent', () => {
  let component: CalfDeleteComponent;
  let fixture: ComponentFixture<CalfDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalfDeleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalfDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
