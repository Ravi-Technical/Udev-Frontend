import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoaderComponentsComponent } from './loader-components.component';

describe('LoaderComponentsComponent', () => {
  let component: LoaderComponentsComponent;
  let fixture: ComponentFixture<LoaderComponentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoaderComponentsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoaderComponentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
