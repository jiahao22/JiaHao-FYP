import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../auth/auth.service';

@Component({
  selector: 'app-pricing',
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.css']
})
export class PricingComponent implements OnInit {
  constructor(private userAuthService: AuthService) {
    this.userAuthService.checkUserLoginSession()
  }

  ngOnInit(): void {
  }

}
