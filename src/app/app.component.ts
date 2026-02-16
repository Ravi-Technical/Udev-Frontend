import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './component/header/header.component';
import { FooterComponent } from './component/footer/footer.component';
import { LoaderComponentsComponent } from './component/shared/loader-components/loader-components.component';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, FooterComponent, LoaderComponentsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
   title = 'Udev';

  constructor(private http: HttpClient) { }
  ngOnInit(): void {
    // this.http.get(
    //   'http://localhost:7036/api/User/sessionRestore',
    //   { withCredentials: true }
    // ).subscribe(res => console.log(res));

  }
 
}
