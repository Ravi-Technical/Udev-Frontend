import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseActionComponent } from './course-action.component';

describe('CourseActionComponent', () => {
  let component: CourseActionComponent;
  let fixture: ComponentFixture<CourseActionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourseActionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CourseActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
