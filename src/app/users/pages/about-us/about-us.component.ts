import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../auth/auth.service';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css']
})
export class AboutUsComponent implements OnInit {
  constructor(private userAuthService: AuthService) {
    this.userAuthService.checkUserLoginSession()
  }

  ngOnInit(): void {
  }

}
