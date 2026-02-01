import { Component, OnInit } from '@angular/core';
import { SharedServiceService } from '../shared-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-data-not-found',
  imports: [],
  templateUrl: './data-not-found.component.html',
  styleUrl: './data-not-found.component.scss'
})
export class DataNotFoundComponent implements OnInit {
  constructor(private dataSource:SharedServiceService, private router:Router){}
  ngOnInit(): void {
     //this.dataSource.clearFilters();
  }

   goToHome(){
      this.router.navigate(['/']);
   }

}
