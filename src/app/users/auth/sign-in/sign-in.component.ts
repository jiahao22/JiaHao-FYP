import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';

import Web3 from 'web3';

declare let window: any;

declare let ethereum: any;

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit, OnDestroy {


  private subs: Subscription

  constructor() {
  }

  ngOnInit(): void {
  }

  /* 1 - MetaMask */
  public onConnectWallet(type: number) {
    switch (type) {
      case 1 : {
        this.connectToMetaMask().then(
          () => {
            window.ethereum.send('eth_requestAccounts').then(
              (account) => {
                console.log(account.result[0])
              },
              (error) => {
                console.log(error)
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
