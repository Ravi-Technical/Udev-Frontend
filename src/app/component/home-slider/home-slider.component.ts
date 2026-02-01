import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { UIServiceService } from '../services/uiservice.service';
import { GalleriaModule } from 'primeng/galleria';

@Component({
  selector: 'app-home-slider',
  imports: [CommonModule, GalleriaModule],
  templateUrl: './home-slider.component.html',
  styleUrl: './home-slider.component.scss',
  encapsulation:ViewEncapsulation.None,
  standalone: true
})
export class HomeSliderComponent implements OnInit {
  sliders:any[] = [];
  responsiveOptions: any[] = [
        {
            breakpoint: '991px',
            numVisible: 4
        },
        {
            breakpoint: '767px',
            numVisible: 3
        },
        {
            breakpoint: '575px',
            numVisible: 1
        }
    ];
  constructor(private UIService: UIServiceService) { }

  ngOnInit(): void {
    this.loadInitialSliders();
  } // END OnInIt()

  loadInitialSliders() {
    this.UIService.udev_UIGetAllHomeSlider().subscribe({
      next: (res) => { 
        this.sliders = res ? res : [];
      },
      error: (error) => {

      }
    })
  }

} // END CLASS
