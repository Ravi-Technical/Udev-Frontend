import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { SnakbarMessageService } from '../snakbarMessage/snakbarService.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-success-dialog',
  imports: [
    CommonModule,
    MatIconModule,
    MatDialogModule,
    MatButtonModule,
  ],
  templateUrl: './success-dialog.component.html',
  styleUrl: './success-dialog.component.scss'
})
export class SuccessDialogComponent implements OnInit {
  constructor(private snakbarS: SnakbarMessageService, public dialogRef: MatDialogRef<SuccessDialogComponent>,

    @Inject(MAT_DIALOG_DATA) public data: { title: string, message: string, extraButton?: string, type?: string }) {

    this.data.type = this.data.type || 'primary'; // By Default type
    
  }

  ngOnInit(): void {

  }

  closeDialog() {
    this.dialogRef.close(true);
  }

  cancelDialog() {
    this.dialogRef.close(false);
  }


}
