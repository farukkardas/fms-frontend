import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SheepUpdateComponent } from './sheep-update.component';

describe('SheepUpdateComponent', () => {
  let component: SheepUpdateComponent;
  let fixture: ComponentFixture<SheepUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SheepUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SheepUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
