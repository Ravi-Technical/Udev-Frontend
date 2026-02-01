import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddHomeSliderComponent } from './add-home-slider.component';

describe('AddHomeSliderComponent', () => {
  let component: AddHomeSliderComponent;
  let fixture: ComponentFixture<AddHomeSliderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddHomeSliderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddHomeSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
