import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {FormControl, FormGroup, Validators} from '@angular/forms';

import {NgxSpinnerService} from 'ngx-spinner';
import * as Swal from 'sweetalert2'

import Web3 from 'web3';

declare let window: any;

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
    private spinner: NgxSpinnerService
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
      merchant_wallet_address: new FormControl({value: null, disabled: true}, {
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
    console.log(this.form.value)
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
