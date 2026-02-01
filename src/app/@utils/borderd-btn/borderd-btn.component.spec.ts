import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BorderdBtnComponent } from './borderd-btn.component';

describe('BorderdBtnComponent', () => {
  let component: BorderdBtnComponent;
  let fixture: ComponentFixture<BorderdBtnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BorderdBtnComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BorderdBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
