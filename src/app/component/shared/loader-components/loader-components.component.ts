import { Component, OnInit } from '@angular/core';
import { LoaderService } from '../../services/loaderService.service';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


@Component({
  selector: 'app-loader-components',
  imports: [CommonModule, MatProgressSpinnerModule],
  templateUrl: './loader-components.component.html',
  styleUrl: './loader-components.component.scss'
})
export class LoaderComponentsComponent implements OnInit {

  constructor(public loaderService: LoaderService){}

  ngOnInit(): void {
    
  }

}
