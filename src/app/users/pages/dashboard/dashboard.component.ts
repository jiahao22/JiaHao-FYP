import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  constructor(private userAuthService: AuthService) {
    const userAuthData =
      localStorage.getItem('userAuthData') !== null
        ? JSON.parse(localStorage.getItem('userAuthData'))
        : null;
    if (userAuthData) {
      this.userAuthService.userAuthData.next(userAuthData);
    }
  }

  ngOnInit(): void {}
}
