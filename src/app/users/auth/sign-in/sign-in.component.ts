import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';

import {AuthService} from '../auth.service';

import Web3 from 'web3';
import {NgxSpinnerService} from 'ngx-spinner';

declare let window: any;

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit, OnDestroy {

  public isLogging: boolean = false

  private subs: Subscription

  constructor(
    private userAuthService: AuthService,
    private spinner: NgxSpinnerService
  ) {
  }

  ngOnInit(): void {
    this.subs = this.userAuthService.userAuthData.subscribe(
      (userAuthData) => {
        if (userAuthData.wallet_address) {
          this.isLogging = true
        } else {
          this.isLogging = false
        }
      }
    )


  }

  /* 1 - MetaMask */
  public onConnectWallet(type: number) {
    switch (type) {
      case 1 : {
        this.connectToMetaMask().then(
          () => {
            this.spinner.show('process')
            window.ethereum.send('eth_requestAccounts').then(
              (account) => {
                const address = account.result[0]
                this.userAuthService.userAuthData.next({wallet_address: address})
                this.spinner.hide('process')
              },
              (error) => {
                this.spinner.hide('process')
              }
            )
          },
          (error) => {
            console.log(error)
          }
        )
        break;
      }
      default: {
        break;
      }
    }
  }

  public onDisconnectWallet() {

  }


  async connectToMetaMask() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable;
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert('Non-Ethereum browser detected. You Should consider using MetaMask!');
    }
  }

  ngOnDestroy() {
    if (this.subs) {
      this.subs.unsubscribe()
    }
  }
}
