import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {merchantAuthData, MerchantAuthService} from '../../auth/merchant.auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public isLoading: boolean = true;
  public isLogging: boolean = false;

  public merchantAuthData: merchantAuthData

  constructor(
    private merchantAuthService: MerchantAuthService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.merchantAuthService.merchantAuthData.subscribe(
      (merchantAuthData) => {
        if (merchantAuthData) {
          this.merchantAuthData = merchantAuthData
          this.isLogging = true
        } else {
          this.isLogging = false
        }
      }
    )
    this.isLoading = false
  }

  public onLogout() {
    this.merchantAuthService.merchantAuthData.next(null)
    localStorage.removeItem('merchantAuthData');
    this.isLogging = false
    this.router.navigate(['/merchant/auth/sign-in'])
  }

}
