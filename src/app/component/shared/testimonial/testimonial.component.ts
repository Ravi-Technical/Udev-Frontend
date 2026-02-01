import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-testimonial',
  imports: [CommonModule],
  templateUrl: './testimonial.component.html',
  styleUrl: './testimonial.component.scss'
})
export class TestimonialComponent implements OnInit {
  testimonials = [
    {
      name: 'Amit Sharma',
      role: 'Frontend Developer',
      message: 'This platform helped me crack my first job. The courses are practical and easy to follow.',
      avatar: 'https://i.pravatar.cc/100?img=12'
    },
    {
      name: 'Priya Verma',
      role: 'Software Engineer',
      message: 'The Angular courses are world-class. I built real projects and gained confidence.',
      avatar: 'https://i.pravatar.cc/100?img=32'
    },
    {
      name: 'Rahul Mehta',
      role: 'Full Stack Developer',
      message: 'Best learning experience! The structured path and filters make it super easy to find content.',
      avatar: 'https://i.pravatar.cc/100?img=56'
    }
  ];

  constructor() { }

  ngOnInit(): void {

  }

}
