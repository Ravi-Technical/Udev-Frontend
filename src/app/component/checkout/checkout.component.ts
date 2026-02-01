import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { SharedServiceService } from '../shared/shared-service.service';
import { Router } from '@angular/router'; 
import { MatDialog } from '@angular/material/dialog';
import { SuccessDialogComponent } from '../shared/success-dialog/success-dialog.component'; 
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-checkout',
  imports: [CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent implements OnInit {
  checkoutForm!: FormGroup;
  courses: any[] = [];
  currentUserId: string | null = null;
  countries: any[] = [];
  states: any[] = [];
  currentStateSelected: string = '';
  totalPrice:number = 0;

  constructor(private dataSource: SharedServiceService, private router: Router, private matDailog: MatDialog, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.checkoutForm = this.fb.group({
      country: ['', Validators.required],
      state: ['', Validators.required]
    })
    this.courses = [];
    this.courses = this.dataSource.getCartCourse(); 
    this.currentUserId = this.dataSource.getCurrentUserId();
    this.totalPrice = this.courses.reduce((acc, sum)=>{
       return acc + sum.price; 
    },0)
    this.getAllUdevCountries();
    this.checkoutForm.get('country')!.valueChanges.subscribe((countryName: any) => {
      this.onChangeCountry(countryName);
    });
  }
  //**********************  Countries Load  *******************************//
  getAllUdevCountries(){
    this.dataSource.udevGetAllCountry().subscribe({
      next: (res) => {
        if (res.success && res.data) {
          this.countries = res.data || [];
        } else {
          this.matDailog.open(SuccessDialogComponent, {
            width: '500px',
            data: { title: 'Something went wrong', message: 'Unable to load countries data', type: 'error' }
          });
        }
      },
      error: (error) => { },
    })
  }
  // Change Country
  onChangeCountry(countryName: string) {
    if (countryName) {
      const isSelected = this.countries.find(c => c.name === countryName);
      if (isSelected && isSelected.state?.length > 0) {
        this.states = isSelected.state || [];
        this.checkoutForm.get('state')!.setValue(this.states[0].stateName);
      } else {
        this.states = [];
        this.checkoutForm.get('state')!.reset();
      }
    }
  }
  //**********************  Pay Now  *******************************//
  payNow() {
    let getCourseIds: any[] = [];
    this.courses.forEach(course => {
      getCourseIds.push(course.id);
    }); 
    const payload = {
      UserId: this.currentUserId,
      CourseIds: getCourseIds,
      Country: this.checkoutForm.get('country')?.value,
      State: this.checkoutForm.get('state')?.value
    }
    if (payload.UserId && Array.isArray(payload.CourseIds) && payload.CourseIds.length > 0 && payload.Country && payload.State) {
      this.dataSource.coursePaymentOrderCreate(payload).subscribe({
        next: (res) => { 
          if (res.orderId && res.razorpayOrderId && res.totalAmount && res.razorpayKey) {
            this.openPaymentGateway(res);
          } else {
            this.matDailog.open(SuccessDialogComponent, {
              width: '500px',
              data: { title: 'Payment Initialization Failed', message: 'Unable to initiate payment. Please try again!', type: 'error' }
            });
          }
        },
        error: (err) => {
          this.matDailog.open(SuccessDialogComponent, {
            width: '500px',
            data: { title: 'Payment Failed', message: err, type: 'error' }
          });
        }
      });
    } else {
        this.matDailog.open(SuccessDialogComponent, {
          width:"500px",
          data: {title:'Payment failed',  message:'Something went wrong', type:'error'}
        })
    }
  }
  openPaymentGateway(res: any){
    const options = {
      key: res.razorpayKey,
      amount: res.totalAmount * 100,
      currency: "INR",
      order_id: res.razorpayOrderId,
      name: "Learning Online Platform",
      description: "Course Purchase",
      handler: (r: any) => {
        this.verifyPaymentOrder(r, res);
      }
    }
    const razorpay = new (window as any).Razorpay(options);
    razorpay.open();
  }
  verifyPaymentOrder(verifyResponse: any, res: any){
    const payload: any = {
      orderId: res.orderId,
      razorpayOrderId: res.razorpayOrderId,
      razorpayPaymentId: verifyResponse.razorpay_payment_id,
      razorpaySignature: verifyResponse.razorpay_signature
    }
    this.dataSource.coursePaymentVerify(payload).subscribe(res => {
      if (res) {
        this.dataSource.clearCartItem();
        this.router.navigate(['/udemy/thankyou']);
      } else {
        this.matDailog.open(SuccessDialogComponent, {
          width: '500px',
          data: { title: 'Payment Verification Failed', message: 'Payment verification failed. Please try again!', type: 'error' }
        });
      }
    });
  }

}
