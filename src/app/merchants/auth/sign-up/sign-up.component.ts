import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {take} from 'rxjs/operators';

import {Router} from '@angular/router';
import {environment} from '../../../../environments/environment';

import {MerchantAuthService} from '../merchant.auth.service';

import {NgxSpinnerService} from 'ngx-spinner';
import * as Swal from 'sweetalert2'
import Web3 from 'web3';


declare let window: any;

export interface MerchantAuthInterface {
  access_token: string
  expired_on: number
  merchant_email: string
  merchant_id: number
  merchant_phone_number: string
  merchant_shop_name: string
  merchant_wallet_address: string
  valid: boolean,
  msg?: string
}

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit, OnDestroy {

  public form: FormGroup

  private subs: Subscription

  constructor(
    private http: HttpClient,
    private spinner: NgxSpinnerService,
    private merchantAuthService: MerchantAuthService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.initForm()
  }

  private initForm() {
    this.form = new FormGroup({
      merchant_shop_name: new FormControl(null, {
        validators: [
          Validators.required
        ]
      }),
      merchant_email: new FormControl(null, {
        validators: [
          Validators.required,
          Validators.email
        ]
      }),
      merchant_phone_number: new FormControl(null, {
        validators: [
          Validators.required
        ]
      }),
      merchant_wallet_address: new FormControl(null, {
        validators: [
          Validators.required
        ]
      })
    })
  }

  public onSubmit() {
    this.form.markAllAsTouched()
    if (!this.form.valid) {
      return
    }
    this.spinner.show('process')

    const data = {
      merchant_email: this.form.get('merchant_email').value.trim().toLowerCase().replace(/\s/g, ''),
      merchant_wallet_address: this.form.get('merchant_wallet_address').value,
      merchant_shop_name: this.form.get('merchant_shop_name').value,
      merchant_phone_number: this.form.get('merchant_phone_number').value
    }

    this.subs = this.http
      .post<MerchantAuthInterface>(`${environment.request_url}merchant/auth/register`, data)
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

  public connectWallet() {
    this.connectToMetaMask().then(
      () => {
        this.spinner.show('process');
        window.ethereum.send('eth_requestAccounts').then(
          (account) => {
            const address = account.result[0];
            this.form.get('merchant_wallet_address').setValue(address)
            this.spinner.hide('process')
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
