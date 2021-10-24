import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {HttpClient} from '@angular/common/http';

import {NgxSpinnerService} from 'ngx-spinner';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit, OnDestroy {

  private subs: Subscription

  constructor(
    private http: HttpClient,
    private spinner: NgxSpinnerService
  ) {
  }

  ngOnInit(): void {
    this.initPage()
  }

  private initPage() {

  }

  ngOnDestroy() {
    if (this.subs) {
      this.subs.unsubscribe()
    }
  }

}
