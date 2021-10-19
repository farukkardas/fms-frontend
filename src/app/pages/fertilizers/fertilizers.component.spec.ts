import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FertilizersComponent } from './fertilizers.component';

describe('FertilizersComponent', () => {
  let component: FertilizersComponent;
  let fixture: ComponentFixture<FertilizersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FertilizersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FertilizersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
