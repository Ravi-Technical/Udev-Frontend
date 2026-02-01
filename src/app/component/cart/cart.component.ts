import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { SharedServiceService } from '../shared/shared-service.service';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { SuccessDialogComponent } from '../shared/success-dialog/success-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';


@Component({
  selector: 'app-cart',
  imports: [CommonModule, MatIconModule, MatDialogModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {
  localProduct: any[] = [];
  totalPrice: number = 0;
  constructor(private dataSource: SharedServiceService, private router: Router, private matDialog: MatDialog) { }

  ngOnInit(): void {
    this.getLocalCourses();
  }
  // Get Local Courses
  getLocalCourses() { 
    this.localProduct = this.dataSource.getCartCourse();
    this.totalPrice = this.localProduct.reduce((acc, item)=> acc+item.price, 0); 
  }

  // Remove Course ID
  removeCourse(id: any) {
    const matRef = this.matDialog.open(SuccessDialogComponent, {
      width: '500px',
      data: { title: 'Deleting...', message: 'Are you sure want to delete?', extraButton:'Cancel' }
    });
    matRef.afterClosed().subscribe((res) => {
      if (res) {
        this.dataSource.removeCourseFromCart(id);
      this.getLocalCourses();
      }
    })
  }

  // Goto Checkout
  gotoCheckout(){
     this.router.navigate(['/udemy/checkout']);
  }
 // Goto Home
 gotoHome(){
     this.router.navigate(['/home']);
 }


}
