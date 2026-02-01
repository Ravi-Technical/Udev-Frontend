import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AdminServiceService } from '../service/admin-service.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnakbarMessageService } from '../../component/shared/snakbarMessage/snakbarService.service';
import { IGetAllCategories } from '../model/admin_model';
import { SuccessDialogComponent } from '../../component/shared/success-dialog/success-dialog.component';

@Component({
  selector: 'app-add-category',
  imports: [CommonModule, ReactiveFormsModule, MatCardModule, MatFormFieldModule, MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
  ],
  templateUrl: './add-category.component.html',
  styleUrl: './add-category.component.scss'
})
export class AddCategoryComponent implements OnInit {
  addCategoryFrom!: FormGroup;
  displayedColumns: string[] = ['index', 'categoryName', 'createdAt', 'actions'];
  isEditMode: boolean = false;
  dataSource = new MatTableDataSource<IGetAllCategories>([]);
  currentUserId!: string;
  currentCategoryName!: string;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private fb: FormBuilder, private adminService: AdminServiceService, private matDialog: MatDialog, private snakbar$: SnakbarMessageService) {
    this.addCategoryFrom = this.fb.group({
      categoryName: ['', Validators.required]
    })
  }
  ngOnInit(): void {
    this.getAllGenericCategories();
  }
  get catFormGet() {
    return this.addCategoryFrom.controls;
  }
  // Add New Category 
  addCategory() {
    if (this.addCategoryFrom.valid) {
      this.adminService.udemyAddNewCategory(this.addCategoryFrom.value).subscribe({
        next: (result: any) => {
          if (result.success) {
            this.getAllGenericCategories();
            this.snakbar$.success("Category has been added successfully");
            this.addCategoryFrom.reset();
          } else {
            this.matDialog.open(SuccessDialogComponent, {
              width: '500px',
              data: { title: 'Dublicate Category', message: 'The category already exists, please enter new category' }
            })
          }
        },
        error: (error) => { }
      });
    }
  }
  // Get All Categories
  getAllGenericCategories() {
    this.adminService.udemyGetAllCategories().subscribe({
      next: (result) => {
        this.dataSource.data = result;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (result) => { }
    });
  }
  // Get Single Category Call
  getSingleCategoryApiCall(id: string) {
    this.adminService.udemyGetSingleCategory(id).subscribe({
      next: (result) => {
        this.addCategoryFrom.patchValue({
          categoryName: result.categoryName
        });
      },
      error: () => { }
    })
  }
  // Update Category Call
  updateCategory() {
    if (this.currentCategoryName === this.addCategoryFrom.value.categoryName) {
      return;
    }
    this.adminService.udemyUpdateSingleRow(this.currentUserId, this.addCategoryFrom.value).subscribe({
      next: (result: any) => {
        if (result.success) {
          this.isEditMode = false;
          this.getAllGenericCategories();
          this.addCategoryFrom.reset();
          this.matDialog.open(SuccessDialogComponent, {
            width: '500px',
            data: { title: "Update Success", message: "Category has been updated successfully" }
          });
        }
      },
      error: (error) => { }
    })
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  // Edit single row of category
  onEdit(row: IGetAllCategories) {
    this.currentCategoryName = row?.categoryName;
    this.isEditMode = true;
    this.getSingleCategoryApiCall(row.id);
    this.currentUserId = row.id;
  }
  // Delete single row of category
  onDelete(row: IGetAllCategories) {
    const dialogRef = this.matDialog.open(SuccessDialogComponent, {
      width: '500px',
      data: { title: "Delete Category", message: 'Are you sure want to delete category?', extraButton: 'Cancel' }
    });
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.adminService.udemyDeleteSingleRow(row.id).subscribe({
          next: (result) => {
            if (result) {
              this.getAllGenericCategories();
              this.snakbar$.success("Category has been deleted successfully");
            }
          },
          error: (error) => { }
        });
      }
    });
  }

}
