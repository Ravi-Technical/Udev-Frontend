import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AiBusinessComponent } from '../shared/ai-business/ai-business.component';
import { SkillsPlaceComponent } from '../shared/skills-place/skills-place.component';
import { TestimonialComponent } from '../shared/testimonial/testimonial.component';
import { TrustedCompaniesComponent } from '../shared/trusted-companies/trusted-companies.component';
import { TrendingNowComponent } from '../shared/trending-now/trending-now.component';
import { HomeSliderComponent } from '../home-slider/home-slider.component';

@Component({
  selector: 'app-home',
  imports: [CommonModule, AiBusinessComponent, SkillsPlaceComponent, TestimonialComponent, 
    TrustedCompaniesComponent, TrendingNowComponent, HomeSliderComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
