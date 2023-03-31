import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TradeDialComponent } from './trade-dial.component';

describe('TradeDialComponent', () => {
  let component: TradeDialComponent;
  let fixture: ComponentFixture<TradeDialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TradeDialComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TradeDialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
