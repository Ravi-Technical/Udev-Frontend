import { CommonModule } from '@angular/common';
import { Component, OnInit, Output, ViewChild } from '@angular/core';
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
import { SnakbarMessageService } from '../../component/shared/snakbarMessage/snakbarService.service';
import { SuccessDialogComponent } from '../../component/shared/success-dialog/success-dialog.component';
import { ICountry } from '../model/admin_model'; 
import { StateComponent } from '../state/state.component';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-country-state',
  imports: [CommonModule, ReactiveFormsModule, MatCardModule, MatFormFieldModule, MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    StateComponent
  ],
  templateUrl: './country-state.component.html',
  styleUrl: './country-state.component.scss'
})
export class CountryStateComponent implements OnInit {
  allCountries: ICountry[] = [];
  addCountryFrom!: FormGroup;
  dataSource = new MatTableDataSource<ICountry>([]);
  isEditMode: boolean = false;
  currentCountryId!: string;
  currentCountryName!: string;
  currentCountryCode!: string;
  updated: any[] = [];

  displayedColumns: string[] = ['index', 'name', 'countryCode', 'createdAt', 'status', 'actions'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private dataAdminSource: AdminServiceService, private fb: FormBuilder, private matDialog: MatDialog, private snakbar$: SnakbarMessageService) {
    this.addCountryFrom = this.fb.group({
      Name: ['', Validators.required],
      CountryCode: ['', Validators.required]
    })
  }
  ngOnInit(): void { 
    this.getAllGenericCountry();
  }

  // Get All Categories
  getAllGenericCountry() {
    this.dataAdminSource.udevGetAllCountry().subscribe({
      next: (result) => {
        this.dataSource.data = result.data as ICountry[];
        this.allCountries = result.data as ICountry[];
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (error: HttpErrorResponse) => { }
    });
  }
  // Add New Country
  addCountry() {
    if (this.addCountryFrom.valid) {
      this.dataAdminSource.udevAddGenericCountry(this.addCountryFrom.value).subscribe({
        next: (result: any) => {
          if (result.success) {
            this.getAllGenericCountry();
            this.snakbar$.success("Country has been added successfully");
            this.addCountryFrom.reset();
            this.setDefaultForm;
          } else {
            this.matDialog.open(SuccessDialogComponent, {
              width: '500px',
              data: { title: 'Invalid Input', message: result.message, type: 'error' }
            });
          }
        },
        error: (err: HttpErrorResponse) => {}
      })
    }
  }
  // Update Country
  updateCountry() {
    if (this.addCountryFrom.valid && this.isEditMode) {
      if (this.currentCountryCode != this.addCountryFrom.value.CountryCode || this.currentCountryName != this.addCountryFrom.value.Name) {
        this.dataAdminSource.udevUpdateSingleCountryById(this.currentCountryId, this.addCountryFrom.value).subscribe({
          next: (result) => {
            if (result.success) {
              this.getAllGenericCountry();
              this.snakbar$.success("Country has been updated successfully");
              this.addCountryFrom.reset();
              this.setDefaultForm;
              this.isEditMode = false;
            }
          },
          error: (error: HttpErrorResponse) => { }
        });
      }
      else {
        this.matDialog.open(SuccessDialogComponent, {
          width: '500px',
          data: { title: 'Invalid Operation', message: 'Please fill the form correctly to update country' }
        });
      }
    }
  }
  // On Edit Country
  editCountry(row: ICountry) {
    this.isEditMode = true;
    this.currentCountryId = row.id;
    this.dataAdminSource.udevGetSingleCountryById(this.currentCountryId).subscribe({
      next: (result) => {
        this.currentCountryCode = result.countryCode;
        this.currentCountryName = result.name;
        this.addCountryFrom.patchValue({
          Name: result.name,
          CountryCode: result.countryCode
        });
      },
      error: (error: HttpErrorResponse) => { }
    })
  }

  // onDelete Country
  onDelete(row: ICountry) {
    const dialogRef = this.matDialog.open(SuccessDialogComponent, {
      width: '500px',
      data: { title: 'Confirm Delete', message: 'Are you sure you want to delete this Country?', extraButton: 'Cancel' }
    });
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.dataAdminSource.udevDeleteSingleCountryById(row.id).subscribe({
          next: (result) => {
            if (result.success) {
              this.snakbar$.success("Country has been deleted successfully");
              this.getAllGenericCountry();
            } else {
              this.matDialog.open(SuccessDialogComponent, {
                width: '500px',
                data: { title: 'Delete failed', message: result.message, type: 'error' }
              });
            }
          },
          error: (error) => { }
        });
      }
    });
  }
  // addCategoryToggle()
  addCountryToggle() {
    this.isEditMode = false;
    this.addCountryFrom.reset({
      Name: '',
      CountryCode: ''
    });
    this.setDefaultForm;
  }

  // Get Form Controls
  get setDefaultForm() {
    Object.keys(this.addCountryFrom.controls).forEach(key => {
      this.addCountryFrom.controls[key].markAsPristine();
      this.addCountryFrom.controls[key].markAsUntouched();
      this.addCountryFrom.controls[key].setErrors(null);
    });
    return this.addCountryFrom;
  }
  get countryFormControls() {
    return this.addCountryFrom.controls;
  }


  // After View Init
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

}
