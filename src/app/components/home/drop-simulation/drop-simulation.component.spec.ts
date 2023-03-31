import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DropSimulationComponent } from './drop-simulation.component';

describe('DropSimulationComponent', () => {
  let component: DropSimulationComponent;
  let fixture: ComponentFixture<DropSimulationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DropSimulationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DropSimulationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
