import { Component, OnInit } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.css']
})
export class AdminLayoutComponent implements OnInit {
  panelOpenState = false;
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
  public isAuth: boolean;
  isShowing: boolean = true;
  displayedImage: string;
  public isCollapsed = true;

  constructor(private authService: AuthService, private cookieService: CookieService) { }

  ngOnInit(): void {
    this.isAuthenticated()
  }

  logout() {
    this.authService.logout()
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

}
