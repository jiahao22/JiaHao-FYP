import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {take} from 'rxjs/operators';
import {Router} from '@angular/router';

import {environment} from '../../../../environments/environment';
import {MerchantAuthInterface} from '../sign-up/sign-up.component';

import {MerchantAuthService} from '../merchant.auth.service';

import {NgxSpinnerService} from 'ngx-spinner';
import * as Swal from 'sweetalert2'
import Web3 from 'web3';

declare let window: any;

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit, OnDestroy {

  private subs: Subscription

  constructor(
    private http: HttpClient,
    private spinner: NgxSpinnerService,
    private merchantAuthService: MerchantAuthService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
  }

  public connectWallet() {
    this.connectToMetaMask().then(
      () => {
        this.spinner.show('process');
        window.ethereum.send('eth_requestAccounts').then(
          (account) => {
            const address = account.result[0];
            if (address) {
              this.subs = this.http
                .post<MerchantAuthInterface>(`${environment.request_url}merchant/auth/login`, {wallet_address: address})
                .pipe(
                  take(1)
                )
                .subscribe(
                  (response) => {
                    if (response.valid) {
                      const authData = {
                        wallet_address: response.merchant_wallet_address,
                        access_token: response.access_token,
                        expired_on: response.expired_on,
                        merchant_id: response.merchant_id,
                        merchant_email: response.merchant_email,
                        merchant_shop_name: response.merchant_shop_name,
                        merchant_phone_number: response.merchant_phone_number
                      };
                      this.merchantAuthService.merchantAuthData.next(authData)
                      localStorage.setItem('merchantAuthData', JSON.stringify(authData));
                      this.spinner.hide('process').then(
                        () => {
                          Swal.default.fire(
                            'Success!',
                            '',
                            'success'
                          ).then(
                            () => {
                              this.router.navigate(['/merchant']);
                            }
                          )
                        }
                      )
                    } else {
                      this.spinner.hide('process').then(
                        () => {
                          Swal.default.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: response.msg
                          })
                        }
                      )
                    }
                  }
                )
            }
          },
          (error) => {
            Swal.default.fire({
              icon: 'error',
              title: 'Oops...',
              text: error.message,
            })
            this.spinner.hide('process');
          }
        );
      },
      (error) => {
        Swal.default.fire({
          icon: 'error',
          title: 'Oops...',
          text: error,
        })
      }
    );
  }

  private async connectToMetaMask() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable;
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      throw 'Non-Ethereum browser detected. You Should consider using MetaMask!'
    }
  }

  ngOnDestroy() {
    if (this.subs) {
      this.subs.unsubscribe()
    }
  }

}
