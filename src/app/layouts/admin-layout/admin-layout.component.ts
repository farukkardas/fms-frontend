import { Component, OnInit, ViewChild } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from 'src/app/services/auth.service';
import * as CryptoJS from 'crypto-js';
import { Router } from '@angular/router';


@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.css']
})
export class AdminLayoutComponent implements OnInit {
  @ViewChild("panel2") panel;
  activeRole: string;
  isAuth: boolean = false;
  isAdmin: boolean = false;
  isUser: boolean = false;
  isCustomer: boolean = false;
  public routerLinkVariable = "";
  public cowsPage = "/cows";
  public calvesPage = "/calves";
  public bullsPage = "/bulls";
  public sheepsPage = "/sheeps";
  public provendersPage = "/provenders";
  public fertilizerPage = "/fertilizers";
  public fuelConsumptionPage = "/fuelconsumption";
  public milkSalesPage = "/milksales";
  public customerPage = "/customers";
  public loginPage = "/login";
  public registerPage = "/register";
  public profilePage = "/profile"
  public animalsSalePage = "/animalsales";
  public ordersPage = "/orders";
  public listedProductsPage = "/listedproducts";
  public buyProductPage = "/buyproduct";
  public basketPage = "/basket";
  isShowing: boolean = true;
  displayedImage: string;
  public isCollapsed = true;

  constructor(private router: Router, private authService: AuthService, private cookieService: CookieService) { }

  ngOnInit(): void {
    this.isAuthenticated()
    this.checkUserRole()

  }

  logout() {
    this.authService.logout()
  }

  checkUserRole() {
    let getRole = localStorage.getItem('xx')
    if (getRole == null) { return; }

    let bytes = CryptoJS.AES.decrypt(getRole, 'superkey');
    let decryptedRole = bytes.toString(CryptoJS.enc.Utf8);

    this.activeRole = decryptedRole;

    if (this.activeRole.includes('admin')) {
      this.isAdmin = true;
    }
    else if (this.activeRole.includes('user')) {
      this.isUser = true;
    }
    else {
      this.isCustomer = true;
    }
  }

  isAuthenticated() {
    if (this.authService.isAuthenticated()) {
      this.isAuth = true;
    }
    else {
      this.isAuth = false;
    }
  }

  toggleSidenav() {
    this.isShowing = !this.isShowing;
  }

  navigateTo(value) {
    console.log(value);
    this.router.navigate([value]);

  }

}
