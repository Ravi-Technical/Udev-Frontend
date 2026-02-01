import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkillsPlaceComponent } from './skills-place.component';

describe('SkillsPlaceComponent', () => {
  let component: SkillsPlaceComponent;
  let fixture: ComponentFixture<SkillsPlaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SkillsPlaceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SkillsPlaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
