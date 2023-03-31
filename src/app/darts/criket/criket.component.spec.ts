import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CriketComponent } from './criket.component';

describe('CriketComponent', () => {
  let component: CriketComponent;
  let fixture: ComponentFixture<CriketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CriketComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CriketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
