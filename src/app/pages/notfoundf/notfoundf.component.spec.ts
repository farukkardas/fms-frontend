import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotfoundfComponent } from './notfoundf.component';

describe('NotfoundfComponent', () => {
  let component: NotfoundfComponent;
  let fixture: ComponentFixture<NotfoundfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotfoundfComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotfoundfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
