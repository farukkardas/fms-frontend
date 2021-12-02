import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimalsalesAddComponent } from './animalsales-add.component';

describe('AnimalsalesAddComponent', () => {
  let component: AnimalsalesAddComponent;
  let fixture: ComponentFixture<AnimalsalesAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnimalsalesAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnimalsalesAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
