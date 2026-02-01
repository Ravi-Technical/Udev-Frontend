import { Component, OnInit } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { AuthServiceService } from '../services/auth-service.service';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { SnakbarMessageService } from '../shared/snakbarMessage/snakbarService.service';
import { SuccessDialogComponent } from '../shared/success-dialog/success-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-register',
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    MatButtonModule,
    MatCheckboxModule,
    MatSnackBarModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit {
  UdemyRegForm!: FormGroup;
  constructor(private authS: AuthServiceService, private router: Router, private fb: FormBuilder, private dialog: MatDialog, private snakBar:SnakbarMessageService) {
    this.UdemyRegForm = this.fb.group({
      fullName: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email])
    })
  }

  ngOnInit(): void {

  }

  uRegSubmit() {
    if (this.UdemyRegForm.valid) {
      this.authS.udemyUserRegister(this.UdemyRegForm.value).subscribe({
        next: (result: any) => {
          this.dialog.open(SuccessDialogComponent, {
            width: '500px',
            data: { title:"Success", message: 'User Successfully Registered!' }
          })
          this.router.navigate(['/udemy/login']);
        },
        error: (error) => {
          this.snakBar.error(error.error.message || "Registration failed");
        }
      })
    }
  }


}
