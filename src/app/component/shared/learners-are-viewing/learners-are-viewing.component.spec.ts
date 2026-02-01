import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LearnersAreViewingComponent } from './learners-are-viewing.component';

describe('LearnersAreViewingComponent', () => {
  let component: LearnersAreViewingComponent;
  let fixture: ComponentFixture<LearnersAreViewingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LearnersAreViewingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LearnersAreViewingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
