import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadyToCareerComponent } from './ready-to-career.component';

describe('ReadyToCareerComponent', () => {
  let component: ReadyToCareerComponent;
  let fixture: ComponentFixture<ReadyToCareerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReadyToCareerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReadyToCareerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
