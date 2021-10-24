import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Subscription} from 'rxjs';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {switchMap, take} from 'rxjs/operators';

import {environment} from '../../../../../environments/environment';
import {AuthService, userAuthData} from '../../../auth/auth.service';

import {NgxSpinnerService} from 'ngx-spinner';
import * as Swal from 'sweetalert2'

interface userProfileInterface {
  valid: boolean,
  user_fullname?: string,
  user_email?: string,
  user_wallet_address?: string,
  msg?: string
}


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy {

  public form: FormGroup

  public isLoading: boolean = true
  public hasError: boolean = false
  public errorMessage: string = ''

  public userAuthData: userAuthData

  private subs: Subscription

  constructor(
    private http: HttpClient,
    private userAuthService: AuthService,
    private spinner: NgxSpinnerService
  ) {
  }

  ngOnInit(): void {
    this.initForm()
    this.initPage()
  }

  private initPage() {
    this.spinner.show()
    this.subs = this.userAuthService.userAuthData
      .pipe(
        take(1),
        switchMap(userAuthData => {
          this.userAuthData = userAuthData
          return this.http
            .get<userProfileInterface>(`${environment.request_url}user/my-account/profile`, {
              params: {
                wallet_address: userAuthData.wallet_address
              }
            })
            .pipe(
              take(1)
            )
        })
      )
      .subscribe(
        (response) => {
          if (response.valid) {
            this.form.get('wallet_address').setValue(response.user_wallet_address)
            this.form.get('fullname').setValue(response.user_fullname)
            this.form.get('email').setValue(response.user_email)
          }

          this.isLoading = false
          this.spinner.hide()
        }
      )
  }

  private initForm() {
    this.form = new FormGroup({
      wallet_address: new FormControl({value: null, disabled: true}, {
        validators: [
          Validators.required
        ]
      }),
      fullname: new FormControl(null, {
        validators: [
          Validators.required
        ]
      }),
      email: new FormControl({value: null, disabled: true}, {
        validators: [
          Validators.required,
          Validators.email
        ]
      })
    })
  }

  public onSubmit() {
    this.hasError = false
    this.errorMessage = ''
    this.form.markAllAsTouched()
    if (!this.form.valid) {
      return
    }

    const data = {
      wallet_address: this.form.get('wallet_address').value,
      user_fullname: this.form.get('fullname').value
    }

    this.subs = this.http
      .put<{ valid: boolean, msg?: string }>(`${environment.request_url}user/my-account/profile`, data)
      .pipe(
        take(1)
      )
      .subscribe(
        (response) => {
          if (response.valid) {
            this.userAuthService.userAuthData.next({
              ...this.userAuthData,
              user_fullname: this.form.get('fullname').value
            })
            localStorage.setItem('userAuthData', JSON.stringify({
              ...this.userAuthData,
              user_fullname: this.form.get('fullname').value
            }));
            Swal.default.fire(
              'Success!',
              '',
              'success'
            )
          }
        }
      )
  }

  ngOnDestroy() {
    if (this.subs) {
      this.subs.unsubscribe()
    }
  }

}
