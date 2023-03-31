import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DropDialComponent } from './drop-dial.component';

describe('DropDialComponent', () => {
  let component: DropDialComponent;
  let fixture: ComponentFixture<DropDialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DropDialComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DropDialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
