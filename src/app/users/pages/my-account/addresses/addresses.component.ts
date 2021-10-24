import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Subscription} from 'rxjs';
import {switchMap, take} from 'rxjs/operators';

import {environment} from '../../../../../environments/environment';
import {AuthService, userAuthData} from '../../../auth/auth.service';

import {NgxSpinnerService} from 'ngx-spinner';
import * as Swal from 'sweetalert2'

export interface UserAddressInterface {
  address_city: string,
  address_created_on: string,
  address_fullname: string,
  address_id: number,
  address_line1: string,
  address_line2: string,
  address_phone_number: string,
  address_postcode: string,
  address_state: string,
  address_status: number,
  address_updated_on: string
}

@Component({
  selector: 'app-addresses',
  templateUrl: './addresses.component.html',
  styleUrls: ['./addresses.component.css']
})
export class AddressesComponent implements OnInit, OnDestroy {

  public isLoading: boolean = true

  public addresses: UserAddressInterface[] = []
  public userAuthData: userAuthData

  private subs: Subscription

  constructor(
    private userAuthService: AuthService,
    private spinner: NgxSpinnerService,
    private http: HttpClient
  ) {
  }

  ngOnInit(): void {
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
            .get<{ valid: boolean, addresses: UserAddressInterface[], msg?: string }>(`${environment.request_url}user/my-account/addresses`, {
              params: {
                user_id: userAuthData.user_id
              }
            })
            .pipe(
              take(1)
            )
        })
      )
      .subscribe(
        (response) => {
          this.addresses = response.addresses
          this.isLoading = false
          this.spinner.hide()
        }
      )
  }

  public onDeleteAddress(address_id: number) {
    Swal.default.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.spinner.show('process')
        this.subs = this.http
          .delete(`${environment.request_url}user/my-account/address`, {
            params: {
              user_id: this.userAuthData.user_id,
              address_id: address_id
            }
          })
          .pipe(
            take(1)
          )
          .subscribe(
            (response) => {
              this.addresses.splice(this.addresses.findIndex(e => e.address_id === address_id), 1)
              this.spinner.hide('process')
            }
          )
      }
    })
  }

  ngOnDestroy() {
    if (this.subs) {
      this.subs.unsubscribe()
    }
  }

}
