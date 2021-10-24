import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService, userAuthData} from '../../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  public isLoading: boolean = true;
  public isLogging: boolean = false;

  public userAuthData: userAuthData;

  constructor(private userAuthService: AuthService, private router: Router) {
  }

  ngOnInit(): void {
    this.userAuthService.userAuthData
      .subscribe(
        (userAuthData) => {
          if (userAuthData) {
            this.userAuthData = userAuthData;
            this.isLogging = true;
          } else {
            this.isLogging = false;
          }
        });
    this.isLoading = false;
  }

  public onLogot() {
    this.userAuthService.userAuthData.next(null);
    localStorage.removeItem('userAuthData');
    this.isLogging = false;
    this.router.navigate(['/']);
  }
}
