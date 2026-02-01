import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AdminServiceService } from '../service/admin-service.service';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ISlider } from '../model/admin_model';
import { SnakbarMessageService } from '../../component/shared/snakbarMessage/snakbarService.service';
import { SuccessDialogComponent } from '../../component/shared/success-dialog/success-dialog.component';
import { LoaderComponentsComponent } from '../../component/shared/loader-components/loader-components.component';
import { LoaderService } from '../../component/services/loaderService.service';

@Component({
  selector: 'app-add-home-slider',
  imports: [CommonModule, ReactiveFormsModule, MatCardModule, MatFormFieldModule, MatInputModule,
    MatTableModule, MatPaginatorModule, MatSortModule, MatIconModule, MatButtonModule, MatTooltipModule],
  templateUrl: './add-home-slider.component.html',
  styleUrl: './add-home-slider.component.scss'
})
export class AddHomeSliderComponent implements OnInit {
  addSliderFrom!: FormGroup;
  displayedColumns: string[] = ['index', 'imageUrl', 'sliderName', 'createdAt', 'actions'];
  isEditMode: boolean = false;
  dataSource = new MatTableDataSource<any>([]);
  currentUserId!: string;
  currentSliderName!: string;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  selectedFile: any;
  ImagePreview!: string;
  DummyImagePreview = '';

  constructor(private fb: FormBuilder, private adminService: AdminServiceService, private matDialog: MatDialog,
    private loader$: LoaderService, private snakbar$: SnakbarMessageService) {
    this.addSliderFrom = this.fb.group({
      alt_Tag: ['', Validators.required]
    })
  }

  ngOnInit(): void {
    this.fetchAllSlider();
  } // END OnInIt()

  get catFormGet() {
    return this.addSliderFrom.controls;
  }
  // Initial Slider Loads
  fetchAllSlider() {
    this.adminService.udevGetAllHomeSlider().subscribe({
      next: (result) => {
        this.dataSource.data = result;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (error) => { }
    })
  }

  // Image Upload
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    this.adminService.uploadImage(this.selectedFile ?? this.selectedFile).subscribe({
      next: (result: any) => {
        if (result.secure_url) {
          this.ImagePreview = result.secure_url;
          this.loader$.hide();
        }
      },
      error: (err) => {
        this.loader$.hide();
        this.matDialog.open(SuccessDialogComponent, {
          width: '500px',
          data: { title: 'Something went wrong', message: 'Please check your internet connection & try again' }
        })
      }
    })
  }

  // Goto Add Slider Mode
  goToAddSlider() {
    this.isEditMode = false;
    this.addSliderFrom.reset();
    this.ImagePreview = "";
  }
  // Add New Slider 
  addSlider() {
    if (this.addSliderFrom.valid && this.ImagePreview) {
      let mergeImage = {
        ...this.addSliderFrom.value,
        imageUrl: this.ImagePreview
      }
      this.adminService.udevAddNewHomeSlider(mergeImage).subscribe({
        next: (result: any) => {
          if (result.success) {
            this.fetchAllSlider();
            this.snakbar$.success("Slider has been added successfully");
            this.addSliderFrom.reset();
            mergeImage = {};
            this.ImagePreview = "";
          } else {
            this.matDialog.open(SuccessDialogComponent, {
              width: '500px',
              data: { title: 'Dublicate Slider', message: 'The slider already exists, please enter new slider' }
            })
          }
        },
        error: (error) => { }
      });
    }
  }
  // Get Single Slider Call
  getSingleCategoryApiCall(id: string) {
    this.adminService.udevGetSliderById(id).subscribe({
      next: (result) => {
        this.addSliderFrom.patchValue({
          alt_Tag: result.data.alt_Tag
        });
        this.ImagePreview = result.data.imageUrl
      },
      error: (err) => { }
    })
  }
  // Update Slider Call
  updateCategory() {
    if (this.currentSliderName === this.addSliderFrom.value.alt_Tag) {
      return;
    }
    let mergeImage = {
      ...this.addSliderFrom.value,
      imageUrl: this.ImagePreview
    }
    this.adminService.udemyUpdateSingleRow(this.currentUserId, mergeImage).subscribe({
      next: (result: any) => {
        if (result.success) {
          this.matDialog.open(SuccessDialogComponent, {
            width: '500px',
            data: { title: "Update Success", message: "Slider has been updated successfully" }
          });
          this.addSliderFrom.reset();
          this.isEditMode = false;
          this.fetchAllSlider();
          this.ImagePreview = "";
        }
      },
      error: (error) => { }
    })
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  // Edit single row of slider
  onEdit(row: any) { 
    this.currentSliderName = row?.imageUrl;
    this.isEditMode = true;
    this.getSingleCategoryApiCall(row.sliderId);
    this.currentUserId = row.sliderId;
  }
  // Delete single row of slider
  onDelete(row: any) {
    const dialogRef = this.matDialog.open(SuccessDialogComponent, {
      width: '500px',
      data: { title: "Delete Slider", message: 'Are you sure want to delete slider?', extraButton: 'Cancel' }
    });
    dialogRef.afterClosed().subscribe(res => {
      if (res) { 
        this.adminService.udevDeleteSliderById(row.sliderId).subscribe({
          next: (result) => {
            if (result) {
              this.fetchAllSlider();
              this.snakbar$.success("Slider has been deleted successfully");
            }
          },
          error: (error) => { }
        });
      }
    });
  }


}  // END CLASS
