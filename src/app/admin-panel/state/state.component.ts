import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AdminServiceService } from '../service/admin-service.service';
import { ICountry, IStates } from '../model/admin_model';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialog } from '@angular/material/dialog';
import { SnakbarMessageService } from '../../component/shared/snakbarMessage/snakbarService.service';
import { MatSelectModule } from '@angular/material/select';
import { SuccessDialogComponent } from '../../component/shared/success-dialog/success-dialog.component';

@Component({
  selector: 'app-state',
  imports: [CommonModule, ReactiveFormsModule, MatCardModule, MatFormFieldModule, MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule, MatSelectModule,],
  templateUrl: './state.component.html',
  styleUrl: './state.component.scss'
})
export class StateComponent implements OnInit {
  countries: ICountry[] = [];
  states: any;
  isEditMode: boolean = false;
  addStateForm!: FormGroup;
  currentStateId!: string;
  dataSource = new MatTableDataSource<IStates>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  displayedColumns: string[] = ['index', 'name', 'stateCode', 'country', 'createdAt', 'status', 'actions'];

  constructor(private adminDataSource: AdminServiceService, private fb: FormBuilder, private matDialog: MatDialog, private snakbar$: SnakbarMessageService) {
    this.addStateForm = this.fb.group({
      StateName: [''],
      StateCode: [''],
      CountryId: ['']
    });
  }

  ngOnInit(): void {
    this.getAllGenericCountry();
    this.getAllGenericStates();
  }
  // Get All Categories
  getAllGenericCountry(){
    this.adminDataSource.udevGetAllCountry().subscribe({
      next: (result) => {
        this.countries = result.data as ICountry[];
      },
      error: (error: HttpErrorResponse) => { }
    });
  }
  // Get ALL States
  getAllGenericStates(){
    this.adminDataSource.udevGetAllStatesList().subscribe({
      next: (result) => {
        if (result.success) {
          this.states = result.data;
          this.dataSource.data = this.states;
        }
      },
      error: (error: HttpErrorResponse) => { }
    });
  }
  // Add New State
  addNewState() {
    if (this.addStateForm.valid) {
      this.adminDataSource.udevAddNewState(this.addStateForm.value).subscribe({
        next: (result) => {
          console.log("res", result);
          if (result.success) {
            this.getAllGenericStates();
            this.snakbar$.success("State has been added successfully");
            this.addStateForm.reset();
            this.setDefaultFormValue;
          }
        },
        error: (error: HttpErrorResponse) => { }
      });
    }
  }
  // Update State 
  updateState() {
    if (this.addStateForm.valid && this.isEditMode) {
      this.adminDataSource.udevUpdateSingleStateById(this.currentStateId, this.addStateForm.value).subscribe({
        next: (result) => {
          if (result.success) {
            this.getAllGenericStates();
            this.snakbar$.success("State has been updated successfully");
            this.addStateForm.reset();
            this.setDefaultFormValue;
          }
        },
        error: (error: HttpErrorResponse) => { }
      })
    }
  }
  // Delete State
  onDelete(element: IStates) {
    const diaLogRef = this.matDialog.open(SuccessDialogComponent, {
      width: '500px',
      data: { title: 'Confirm Delete', message: 'Are you sure you want to delete this State?', extraButton: 'Cancel' }
    });
    diaLogRef.afterClosed().subscribe(res => {
      if (res) {
        this.adminDataSource.udevDeleteSingleStateByID(element.id).subscribe({
          next: (result) => {
            if (result.success) {
              this.snakbar$.success("State has been deleted successfully");
              this.getAllGenericStates();
            } else {
              this.matDialog.open(SuccessDialogComponent, {
                width: '500px',
                data: { title: 'Delete failed', message: result.message, type: 'error' }
              });
            }
          },
          error: (error: HttpErrorResponse) => { }
        });
      }
    });
  }
  // Edit State
  editState(element: IStates) {
    this.isEditMode = true;
    this.currentStateId = element.id;
    this.addStateForm.patchValue({
      StateName: element.stateName,
      StateCode: element.stateCode,
      CountryId: element.countryId
    });
  }
  // addCategoryToggle
  addStateToggle() {
    this.isEditMode = false;
    this.addStateForm.reset({
      StateName: '',
      StateCode: '',
      CountryId: ' '
    });
    this.setDefaultFormValue;
  }
  // Get Form Controls
  get formControls() {
    return this.addStateForm.controls;
  }
  get setDefaultFormValue() {
    const formSet = Object.keys(this.formControls).forEach(key => {
      this.formControls[key].markAsPristine();
      this.formControls[key].markAsUntouched();
      this.formControls[key].setErrors(null);
    });
    return formSet;
  }

  // After View Init
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

} // END MAIN CLASS HERE
