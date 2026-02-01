import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-overlay-component',
  imports: [CommonModule],
  templateUrl: './overlay-component.component.html',
  styleUrl: './overlay-component.component.scss'
})
export class OverlayComponentComponent {
course: any;
}
