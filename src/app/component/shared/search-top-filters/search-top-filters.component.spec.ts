import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchTopFiltersComponent } from './search-top-filters.component';

describe('SearchTopFiltersComponent', () => {
  let component: SearchTopFiltersComponent;
  let fixture: ComponentFixture<SearchTopFiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchTopFiltersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchTopFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
