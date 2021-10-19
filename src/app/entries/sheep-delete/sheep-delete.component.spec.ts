import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SheepDeleteComponent } from './sheep-delete.component';

describe('SheepDeleteComponent', () => {
  let component: SheepDeleteComponent;
  let fixture: ComponentFixture<SheepDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SheepDeleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SheepDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
