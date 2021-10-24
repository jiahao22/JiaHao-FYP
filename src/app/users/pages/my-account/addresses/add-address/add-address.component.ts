import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {switchMap, take} from 'rxjs/operators';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';
import {Router} from '@angular/router';

import {environment} from '../../../../../../environments/environment';
import {AuthService, userAuthData} from '../../../../auth/auth.service';

import {NgxSpinnerService} from 'ngx-spinner';
import * as Swal from 'sweetalert2'

export class stateInterface {
  state_id: string
  state_name: string
}

@Component({
  selector: 'app-add-address',
  templateUrl: './add-address.component.html',
  styleUrls: ['./add-address.component.css']
})
export class AddAddressComponent implements OnInit, OnDestroy {

  public isLoading: boolean = true

  public form: FormGroup

  public states: stateInterface[] = []
  private userAuthData: userAuthData

  private subs: Subscription

  constructor(
    private userAuthService: AuthService,
    private http: HttpClient,
    private spinner: NgxSpinnerService,
    private router: Router
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
            .get<stateInterface[]>(`${environment.request_url}shared/state`)
            .pipe(
              take(1)
            )
        })
      )
      .subscribe(
        (response) => {
          this.states = response
          this.isLoading = false
          this.spinner.hide()
        }
      )
  }

  private initForm() {
    this.form = new FormGroup({
      fullname: new FormControl(null, {
        validators: [
          Validators.required
        ]
      }),
      phone_number: new FormControl(null, {
        validators: [
          Validators.required
        ]
      }),
      address_line1: new FormControl(null, {
        validators: [
          Validators.required
        ]
      }),
      address_line2: new FormControl(null),
      city: new FormControl(null, {
        validators: [
          Validators.required
        ]
      }),
      state: new FormControl('-', {
        validators: [
          Validators.required
        ]
      }),
      postcode: new FormControl(null, {
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

    const data = {
      address_user_id: this.userAuthData.user_id,
      address_fullname: this.form.get('fullname').value,
      address_phone_number: this.form.get('phone_number').value,
      address_line1: this.form.get('address_line1').value,
      address_line2: this.form.get('address_line2').value,
      address_city: this.form.get('city').value,
      address_state: +this.form.get('state').value,
      address_postcode: this.form.get('postcode').value
    }

    this.subs = this.http
      .post<{ valid: boolean, address_id: number }>(`${environment.request_url}user/my-account/address`, data)
      .pipe(
        take(1)
      )
      .subscribe(
        (response) => {
          if (response.valid) {
            Swal.default.fire(
              'Success!',
              '',
              'success'
            ).then(
              () => {
                this.router.navigate(['/my-account/addresses'])
              }
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
