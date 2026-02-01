import { Component, computed, OnInit, signal } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { AuthServiceService } from '../services/auth-service.service';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SnakbarMessageService } from '../shared/snakbarMessage/snakbarService.service';
import { SuccessDialogComponent } from '../shared/success-dialog/success-dialog.component';
import { CommonServiceService } from '../../common/common-service.service';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-login',
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    MatButtonModule,
    MatCheckboxModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  isOtpForm: boolean = false;
  otpForm!: FormGroup;
  loginForm!: FormGroup;
  currentUserEmail: string | null = null;
  count: number = 20;
  canResend: boolean = false;
  interval: any;
  emailAddress!: string;

  constructor(private authS: AuthServiceService, private fb: FormBuilder, private commonS: CommonServiceService,
    private router: Router, private dialog: MatDialog, private messageS: SnakbarMessageService) {
    // OTP SEND FORM CONTROL
    this.otpForm = this.fb.group({
      email: new FormControl('', [Validators.required, Validators.email])
    })
    // LOGIN FORM CONTROL
    this.loginForm = this.fb.group({
      otp: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(6), Validators.pattern(/^[0-9]{6}$/)])
    })
  }

  ngOnInit(): void {

  }

  // OTP SEND SUBMIT FORM
  otpFormSubmit() {
    localStorage.removeItem('currentUserEmail');
    const { email } = this.otpForm.value;  // email is string
    if (this.otpForm.valid) {
      this.authS.udemyEmailOtpSend(email).subscribe({
        next: (result) => {
          if (result) localStorage.setItem('currentUserEmail', email);
          this.currentUserEmail = this.commonS.getCurrenUserEmail();
          const dialogRef = this.dialog.open(SuccessDialogComponent, {
            width: '500px',
            data: { title: "Success", message: 'OTP has been sent successfully on your email id.' }
          })
          dialogRef.afterClosed().subscribe(res => {
            if (res) {
              this.isOtpForm = true;
              this.startCounter();
            }
          })
        },
        error: (error:HttpErrorResponse) => { 
          this.dialog.open(SuccessDialogComponent, {
            width: '500px',
            data: { title: "Unknown Error", message: 'Server is not reachable. Please check if backend is running.' }
          })
        }
      });
    }
  }

  // LOGIN FORM 
  loginFormSubmit() {
    this.loginForm.value.email = this.currentUserEmail ? this.currentUserEmail : null;
    if (this.loginForm.valid && this.loginForm.value) {
      this.authS.udemyUserLogin(this.loginForm.value).subscribe({
        next: (result) => {
          if (result.token) {
            this.commonS.setUserToken(result.token, result.data);
            this.messageS.success("Welcome to Udemy Learning Portal");
            this.isOtpForm = false;
            if (result.data.role === 'Admin') {
              this.router.navigate(['/admin/courseList']);
            } else {
              this.router.navigate(['/udemy/user']);
            }
          } else {
            this.isOtpForm = true;
            this.dialog.open(SuccessDialogComponent, {
              width: '500px',
              data: { title: "Failed", message: 'Invalid OTP, Please try again!' }
            })
          }
        },
        error: (error:HttpErrorResponse) => {
          this.dialog.open(SuccessDialogComponent, {
            width: '500px',
            data: { title: "Something went wrong", message: error }
          })
        }
      });
    } else {
      this.dialog.open(SuccessDialogComponent, {
        width: '500px',
        data: { title: "Failed!", message: "Please fill the form field" }
      })
    }
  }

  // Start counter for resend otp 
  startCounter() {
    this.canResend = false;
    this.interval = setInterval(() => {
      this.count--;
      if (this.count === 0) {
        clearInterval(this.interval);
        this.canResend = true;
      }
    }, 1000);
  }
  // Resend OTP 
  resedOTP() {
    alert("Resend is pending");
  }


}
