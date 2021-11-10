import { Component, Injectable, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { UserService } from 'src/app/services/user.service';
import { LoginComponent } from '../auth/login/login.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {

  profit: number
  sales: number
  customerCount: number
  animalCount: number

  constructor(private userService: UserService, private cookieService: CookieService) { }

  ngOnInit(): void {
    this.getUserDetail()
  }

  getUserDetail() {
    let uid = this.cookieService.get("uid")
    let sk = this.cookieService.get("sk")

    this.userService.getUserDetail(uid, sk).subscribe((response) => {
      console.log(response)
      this.profit = response.data.profit,
        this.sales = response.data.totalSales,
        this.customerCount = response.data.customerCount,
        this.animalCount = response.data.animalCount  
    })
  }

}
