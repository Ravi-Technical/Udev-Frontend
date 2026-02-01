import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatCard } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { SharedServiceService } from '../shared/shared-service.service';

@Component({
  selector: 'app-thank-you',
  imports: [CommonModule, MatIconModule, MatCard],
  templateUrl: './thank-you.component.html',
  styleUrl: './thank-you.component.scss'
})
export class ThankYouComponent implements OnInit {
  
  constructor(private dataSource:SharedServiceService){}
  
  ngOnInit(): void {
     
  }

}
