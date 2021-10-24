import {HttpClient} from '@angular/common/http';
import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {take} from 'rxjs/operators';

import {AuthService} from '../auth.service';

import {environment} from 'src/environments/environment';
import {loginResponse} from '../sign-in/sign-in.component';

import {NgxSpinnerService} from 'ngx-spinner';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnInit, OnDestroy {
  public form: FormGroup;

  public hasError: boolean = false;
  public errorMessage: string = '';

  private subs: Subscription;

  public walletAddress: string;

  constructor(
    private http: HttpClient,
    private activatedRoute: ActivatedRoute,
    private userAuthService: AuthService,
    private spinner: NgxSpinnerService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.initForm();
    this.initPage();
  }

  private initForm() {
    this.form = new FormGroup({
      address: new FormControl(null, {
        validators: [Validators.required],
      }),
      fullname: new FormControl(null, {
        validators: [Validators.required],
      }),
      email: new FormControl(null, {
        validators: [Validators.required, Validators.email],
      }),
    });
  }

  private initPage() {
    this.walletAddress = atob(
      this.activatedRoute.snapshot.paramMap.get('wallet_address')
    );
    this.form.get('address').setValue(this.walletAddress);

    // Check the account exists or not
    const data = {
      wallet_address: this.walletAddress,
    };
    this.subs = this.http
      .post(`${environment.request_url}user/auth/check`, data)
      .pipe(take(1))
      .subscribe((response: { accountExist: boolean }) => {
        // If the account exist then redirect to home page.
        if (response.accountExist) {
          this.router.navigate(['/']);
        }
      });
  }

  public onSubmit() {
    this.hasError = false;
    this.errorMessage = '';

    this.form.markAllAsTouched();
    if (!this.form.valid) {
      return;
    }

    this.spinner.show();
    const data = {
      user_fullname: this.form.get('fullname').value,
      user_email: this.form
        .get('email')
        .value.trim()
        .toLowerCase()
        .replace(/\s/g, ''),
      wallet_address: this.form.get('address').value,
    };

    this.subs = this.http
      .post<loginResponse>(`${environment.request_url}user/auth/register`, data)
      .pipe(take(1))
      .subscribe((response) => {
        if (response.valid) {
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
          this.spinner.hide().then(() => {
            this.router.navigate(['/']);
          });
        } else {
          this.hasError = true;
          this.errorMessage = response.msg;
          this.spinner.hide();
        }
      });
  }

  ngOnDestroy() {
    if (this.subs) {
      this.subs.unsubscribe();
    }
  }
}
