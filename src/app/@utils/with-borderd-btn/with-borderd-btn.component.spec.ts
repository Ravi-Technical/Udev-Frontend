import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WithBorderdBtnComponent } from './with-borderd-btn.component';

describe('WithBorderdBtnComponent', () => {
  let component: WithBorderdBtnComponent;
  let fixture: ComponentFixture<WithBorderdBtnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WithBorderdBtnComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WithBorderdBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
