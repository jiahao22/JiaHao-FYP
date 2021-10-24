import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {switchMap, take} from 'rxjs/operators';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';

import {environment} from '../../../../../../environments/environment';
import {AuthService, userAuthData} from '../../../../auth/auth.service';
import {stateInterface} from '../add-address/add-address.component';
import {UserAddressInterface} from '../addresses.component';

import {NgxSpinnerService} from 'ngx-spinner';
import * as Swal from 'sweetalert2'

@Component({
  selector: 'app-edit-address',
  templateUrl: './edit-address.component.html',
  styleUrls: ['./edit-address.component.css']
})
export class EditAddressComponent implements OnInit, OnDestroy {

  public isLoading: boolean = true

  public form: FormGroup

  public address: UserAddressInterface
  public address_id: string = ''
  public states: stateInterface[] = []
  private userAuthData: userAuthData

  private subs: Subscription

  constructor(
    private userAuthService: AuthService,
    private http: HttpClient,
    private spinner: NgxSpinnerService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.initForm()
    this.initPage()
  }

  private initPage() {
    this.spinner.show()
    this.address_id = this.activatedRoute.snapshot.paramMap.get('address_id')
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
        }),
        switchMap(stateResponse => {
          this.states = stateResponse

          return this.http
            .get<{ valid: boolean, address?: UserAddressInterface, msg?: string }>(`${environment.request_url}user/my-account/address`, {
              params: {
                user_id: this.userAuthData.user_id,
                address_id: this.address_id
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
            this.address = response.address
            this.form.get('fullname').setValue(response.address.address_fullname)
            this.form.get('phone_number').setValue(response.address.address_phone_number)
            this.form.get('address_line1').setValue(response.address.address_line1)
            this.form.get('address_line2').setValue(response.address.address_line2)
            this.form.get('city').setValue(response.address.address_city)
            this.form.get('state').setValue(response.address.address_state)
            this.form.get('postcode').setValue(response.address.address_postcode)
          }
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
    this.spinner.show('process')
    const data = {
      address_id: this.address_id,
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
      .put<{ valid: boolean }>(`${environment.request_url}user/my-account/address`, data)
      .pipe(
        take(1)
      )
      .subscribe(
        (response) => {
          if (response.valid) {
            this.spinner.hide('process')
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
