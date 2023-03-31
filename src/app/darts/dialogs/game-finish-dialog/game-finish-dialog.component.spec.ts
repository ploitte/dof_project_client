import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameFinishDialogComponent } from './game-finish-dialog.component';

describe('GameFinishDialogComponent', () => {
  let component: GameFinishDialogComponent;
  let fixture: ComponentFixture<GameFinishDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GameFinishDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GameFinishDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
