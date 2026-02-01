import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { SuccessDialogComponent } from '../../component/shared/success-dialog/success-dialog.component';

@Component({
  selector: 'app-course-action',
  imports: [CommonModule, MatIconModule],
  templateUrl: './course-action.component.html',
  styleUrl: './course-action.component.scss'
})
export class CourseActionComponent implements ICellRendererAngularComp {
  params: any;
  constructor(private router: Router, private matDialog: MatDialog) { }

  ngOnInit(): void {

  }

  agInit(params: any): void {
    this.params = params;
  }

  refresh(): boolean {
    return false;
  }

  onEdit() {  
    const id = this.params.data.id;
    this.router.navigate(['/admin/add-course', id]);
  }

  onDelete() {
    const matRef = this.matDialog.open(SuccessDialogComponent, {
      width: '500px',
      data: { title: 'Course Deleteing...', message: 'Are you sure want to delete course?', extraButton: 'Cancel' }
    });
    matRef.afterClosed().subscribe(res => {
      if (res) {
        this.params.context.componentParent.deleteCourse(this.params.data);
      }
    })
  }


}
