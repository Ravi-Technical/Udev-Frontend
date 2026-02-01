import { Component, OnInit, ViewChild } from '@angular/core';
import { AdminServiceService } from '../service/admin-service.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CommonModule } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SuccessDialogComponent } from '../../component/shared/success-dialog/success-dialog.component';
import { AgGridAngular } from 'ag-grid-angular';
import { GridApi, GridReadyEvent } from 'ag-grid-community';
import { column_Defs } from '../ag-grid/columnDef';

@Component({
  selector: 'app-course-list',
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatChipsModule,
    MatToolbarModule,
    MatTooltipModule,
    AgGridAngular,
  ],
  templateUrl: './course-list.component.html',
  styleUrl: './course-list.component.scss',
})
export class CourseListComponent implements OnInit {
  //************************* Ag grid Implement ****************************//
  gridApi!: GridApi;
  paginationPageSize = 10;
  gridColumnApi: any;
  rowData: any = [];
  columnDefs = column_Defs;
  defaultColDef = {
    flex: 1,
    minWidth: 150,
    resizable: true
  };

  totalCount!: number;



  constructor(private adminService: AdminServiceService, private matDailog: MatDialog, private snapbar$: MatSnackBar, private router: Router) { }

  ngOnInit(): void {
    this.getAllCourses();
  }

  goToAddCourse() {
    this.router.navigate([`admin/add-course`]);
  }

  //********************************************* Load All Courses *****************************************//
  onGridReady(params: GridReadyEvent) {
    //this.gridApi = params.api; 
    this.adminService.udemyGetAllCourses().subscribe((res) => {
      this.rowData = res ? res : [];
    });
  }

  getAllCourses() {
    this.adminService.udemyGetAllCourses().subscribe({
      next: (result) => {
        this.rowData = result ? result : [];
      },
      error: () => { }
    })
  }
 
  viewCourse(id: string) {
    this.router.navigate([`admin/add-course/`, id]);
  }

  deleteCourse(row: any) {
    this.adminService.udemyDeleteSingleCourseById(row.id).subscribe({
      next: (result) => {
        if (result) {
          this.getAllCourses();
        }
      },
      error: (error) => {
      }
    });
  }

  AddCourse() {
    this.router.navigate([`admin/add-course/`]);
  }



}
