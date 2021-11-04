import { Component, OnInit } from '@angular/core';
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
  public cowsLink = "/cows";
  public calvesLink = "/calves";
  public bullsLink = "/bulls";
  public sheepsLink = "/sheeps";
  public provendersLink = "/provenders";
  public fertilizerLink = "/fertilizers";
  public fuelConsumptionLink = "/fuelconsumption";
  public milkSalesLink = "/milksales";
  public customerLinkVariable = "/customers";
  public loginPage = "/login";
  public registerPage = "/register";

  public isAuth: boolean;

  displayedImage: string;
  public isCollapsed = true;

  constructor(private authService: AuthService, private cookieService: CookieService) { }

  ngOnInit(): void {
    this.isAuthenticated()
  }

  logout() {
    this.cookieService.delete("jwt")
    window.location.reload();
  }

  isAuthenticated() {
    if (this.authService.isAuthenticated()) {
      this.isAuth = true;
    }
    else {
      this.isAuth = false;
    }
  }

}
