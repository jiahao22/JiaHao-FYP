import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {take} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';

import {AuthService} from '../auth.service';

import {environment} from 'src/environments/environment';
import {NgxSpinnerService} from 'ngx-spinner';

import Web3 from 'web3';
import * as Swal from 'sweetalert2'
declare let window: any;

export interface loginResponse {
  valid: boolean;
  user_id?: string;
  user_email?: string;
  access_token?: string;
  wallet_address?: string;
  expired_on?: number;
  user_fullname?: string;
  msg?: string;
}

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
})
export class SignInComponent implements OnInit, OnDestroy {
  private subs: Subscription;

  constructor(
    private userAuthService: AuthService,
    private spinner: NgxSpinnerService,
    private http: HttpClient,
    private router: Router
  ) {
  }

  ngOnInit(): void {
  }

  /* 1 - MetaMask */
  public onConnectWallet(type: number) {
    switch (type) {
      case 1: {
        this.connectToMetaMask().then(
          () => {
            this.spinner.show('process');
            window.ethereum.send('eth_requestAccounts').then(
              (account) => {
                const address = account.result[0];
                this.checkOnDatabase(address);
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
        break;
      }
      default: {
        break;
      }
    }
  }

  async connectToMetaMask() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable;
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      throw 'Non-Ethereum browser detected. You Should consider using MetaMask!'
    }
  }

  private checkOnDatabase(address: string) {
    const data = {
      wallet_address: address,
    };
    this.subs = this.http
      .post(`${environment.request_url}user/auth/check`, data)
      .pipe(take(1))
      .subscribe((result: { accountExist: boolean }) => {
        if (result.accountExist) {
          this.subs = this.http
            .post<loginResponse>(
              `${environment.request_url}user/auth/login`,
              data
            )
            .pipe(take(1))
            .subscribe((response) => {
              const authData = {
                wallet_address: response.wallet_address,
                access_token: response.access_token,
                expired_on: response.expired_on,
                user_id: response.user_id,
                user_email: response.user_email,
                user_fullname: response.user_fullname,
              };
              this.userAuthService.userAuthData.next(authData);
              localStorage.setItem('userAuthData', JSON.stringify(authData));
              this.spinner.hide('process').then(() => {
                this.router.navigate(['/']);
              });
            });
        } else {
          this.spinner.hide('process').then(() => {
            this.router.navigate(['/auth/sign-up', btoa(address)]);
          });
        }
      });
  }

  ngOnDestroy() {
    if (this.subs) {
      this.subs.unsubscribe();
    }
  }
}
