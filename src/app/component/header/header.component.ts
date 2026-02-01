import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { CommonServiceService } from '../../common/common-service.service';
import { MyLearningComponent } from '../shared/my-learning/my-learning.component';
import { RouterModule, Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { AuthServiceService } from '../services/auth-service.service';
import { MatIconModule } from '@angular/material/icon';
import { SharedServiceService } from '../shared/shared-service.service';
import { FormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, filter, Subject, tap } from 'rxjs';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, MatButtonModule, MatMenuModule, MatIconModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  loadComponentBluePrint = MyLearningComponent;
  @Input() user!: { name: string };
  displayShortName: string | null = null;
  isLoggedIn: boolean = false;
  data = ["Hello", "Aria", "Html", "Html5", "CSS", "JS"];
  totalCartItem!: number;
  searchText = '';
  private search$ = new Subject<string>();

  constructor(public dataSource: SharedServiceService, public commonService: CommonServiceService,
    private authService: AuthServiceService, private router: Router) { }

  ngOnInit(): void {
    this.search$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      filter(data => data.trim().length > 0),
      tap((searchData) => {
        return this.router.navigate(['/udemy/search/'], {
          queryParams: {
            p: 1,
            keyword: searchData
          }
        });
      }
      )).subscribe();
  }
  // Search
  onSearch(value: string) { 
    this.search$.next(value);
  }
  // Go to Login
  gotoLogin() {
    this.router.navigate(['/udemy/login']);
  }
  // Go to Register
  gotoRegister() {
    this.router.navigate(['/udemy/register']);
  }
  // Admin Page
  gotoAdmin() {
    this.router.navigate(['/admin/admin-profile']);
  }
  // Logout
  logout() {
    this.commonService.clearToken();
    this.router.navigate(['/home']);
  }
  // Go to add to cart 
  goToCart() {
    this.router.navigate(['/udemy/cart']);
  }
  // Go to profile
  gotoProfile() {
    this.router.navigate(['/udemy/user']);
  }
} 
