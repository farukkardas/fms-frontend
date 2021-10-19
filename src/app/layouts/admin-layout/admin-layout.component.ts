import { Component, OnInit } from '@angular/core';

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
  public fuelConsumptionLink ="/fuelconsumption";
  public milkSalesLink ="/milksales";
  public customerLinkVariable ="/customers";

  displayedImage: string;
  public isCollapsed = true;

  constructor() { }

  ngOnInit(): void {
  }

 
}
