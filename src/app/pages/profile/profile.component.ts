import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  city: string;
  district: string;
  address: string;
  constructor(private userService: UserService, private cookieService: CookieService) { }

  ngOnInit(): void {
    this.getUserDetails()
  }


  getUserDetails() {
    let uid = this.cookieService.get("uid")
    let sk = this.cookieService.get("sk")

    this.userService.getUserDetail(uid, sk).subscribe((response) => {
      this.firstName = response.data.firstName;
      this.lastName = response.data.lastName;
      this.email = response.data.email;
      this.phoneNumber = response.data.phoneNumber;
      this.city = response.data.city;
      this.address = response.data.address;
      this.district = response.data.district;
    })
  }
}
