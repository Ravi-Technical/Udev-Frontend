import { Component, OnInit } from '@angular/core';
import { CommonServiceService } from '../../common/common-service.service';
import { AuthServiceService } from '../services/auth-service.service';
import { SnakbarMessageService } from '../shared/snakbarMessage/snakbarService.service';

@Component({
  selector: 'app-user-profile',
  imports: [],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss'
})
export class UserProfileComponent implements OnInit {
  currentUserEmail: string | null = null;
  userFullName!:string;
  userShortName!:string;
  constructor(private common$: CommonServiceService, private auth$: AuthServiceService, private messageS:SnakbarMessageService) { }
  ngOnInit(): void {
    this.currentUserEmail = (this.common$.getCurrenUserEmail()!);
    this.getCurrentUserDetails();
  }

  getCurrentUserDetails() {
    this.auth$.udemyGetUserDetail((this.currentUserEmail!)).subscribe({
       next:(result)=>{
        if(result) {
           this.userFullName = result.fullName;
           this.userShortName = this.userFullName.split(" ")[0].charAt(0) + this.userFullName.split(" ")[1].charAt(0)
        }
       },
       error:(error)=>{
        this.messageS.error(`Something went wrong`);
       }
    });
  }

}
