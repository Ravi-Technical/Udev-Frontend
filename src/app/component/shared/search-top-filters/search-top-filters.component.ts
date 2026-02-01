import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { SharedServiceService } from '../shared-service.service';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { IFilterModel } from '../../../@core/models/commonModel';

@Component({
  selector: 'app-search-top-filters',
  imports: [CommonModule, RouterModule, MatIconModule, MatMenuModule, MatCheckboxModule, MatButtonModule],
  templateUrl: './search-top-filters.component.html',
  styleUrl: './search-top-filters.component.scss'
})
export class SearchTopFiltersComponent implements OnInit {
  searching: string = '';

  // Data Sharing Variables
  @Input() topFilters!: IFilterModel;
  @Output() addFilter = new EventEmitter<{
    key: keyof IFilterModel;
    selected: IFilterModel;
  }>();

  // Filters Variables
  levels: any[] = [];
  // languages: any[] = ["English", "Spanish", "French", "German", "Chinese", "Japanese", "Hindi", "Arabic", "Portuguese", "Russian", "Italian", "Korean"];
  languages: any[] = [];
  ratings: any[] = [];

  selectedLevels: string[] = [];   // ex: [0,1]
  selectedRatings: any[] = [];
  // Testing Here
  selected: IFilterModel = {
    Level: [],
    Language: [],
    Rating: [],
    Hours: [],
    VideoLength: []
  }

  currentFilterIndex: any;

  constructor(private dataSource: SharedServiceService) { }
  ngOnInit(): void {
    this.getInitialFilters();
    this.getCurrentSelectedFilters();
  }
  // Initialize Levels
  getInitialFilters() {
    this.dataSource.courseSearchTopFilters().subscribe({
      next: (res) => {
        if (res) {
          this.levels = []; this.languages = []; this.ratings = [];
          for (let filter of res) {
            if (filter.filterType === "Level") {
              this.levels.push({
                Type: filter.filterType,
                Value: filter.filterValue,
                Count: filter.totalCount,
              });
            } else if (filter.filterType === "Rating") {
              this.ratings.push({
                Type: filter.filterType,
                Value: filter.filterValue,
                Count: filter.totalCount,
              })
            }
            else if (filter.filterType === "Language") {
              this.languages.push({
                Type: filter.filterType,
                Value: filter.filterValue,
                Count: filter.totalCount,
              });
            }
          } // END FOR LOOP HERE 
        }
      },
      error: (err) => {
        console.log("Error in Top Filters API:", err);
      }
    })
  }
  // Get Current Filters
  getCurrentSelectedFilters() {
    this.selected = this.dataSource.getTopFiltersData() ? this.dataSource.getTopFiltersData() || {} : {};
  }
  // Top Filters
  toggleFilter(key: keyof IFilterModel, value: string, event: any) {
    const current = (this.selected[key] ?? []) as string[];
    const list = [...current];
    if (event.checked) {
      if (!list.includes(value)) list.push(value);
    } else {
      const i = list.indexOf(value);
      if (i > -1) list.splice(i, 1);
    }
    this.selected = {
      ...this.selected,
      [key]: list
    }
    this.addFilter.emit({ key, selected: this.selected });
  }

  getLabel(key: keyof IFilterModel): string {
    if (key === 'Rating') {
      return this.selected[key] ? this.selected[key].map(r => `${r} & up`).join(',') : '';
    }
    return this.selected[key] ? this.selected[key].join(', ') : '';
  }

  getCount(key: keyof IFilterModel): number {
    return this.selected[key] ? this.selected[key].length : 0;
  }

  get getCountActiveFilters(): number {
    return Object.values(this.selected).filter(x => (x ?? []).length > 0).length;
  }

  clearAll(): void {
    if(this.getCountActiveFilters === 0)return;
    this.selected = {
      Language: [],
      Level: [],
      Rating: [],
      Hours: [],
      VideoLength: [],
      ClearFilter: [],
    };
      this.addFilter.emit({ key: "ClearFilter", selected: this.selected }); // notify parent to refresh data
  }


}
