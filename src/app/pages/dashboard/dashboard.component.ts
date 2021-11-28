import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CookieService } from 'ngx-cookie-service';
import { ChartModel } from 'src/app/models/chartModel';
import { MilkSalesDto } from 'src/app/models/milkSalesDto';
import { AuthService } from 'src/app/services/auth.service';
import { MilksalesService } from 'src/app/services/milksales.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  userTestId :string;
  profit: number
  sales: number
  customerCount: number
  animalCount: number
  animals: any[] = [];
  cowCount: ChartModel;
  bullCount: ChartModel;
  sheepCount: ChartModel;
  calfCount: ChartModel;
  allAnimals: ChartModel;
  milkSales: any[] = [];
  displayedColumns: string[] = ['id', 'firstName', 'amount', 'price'];
  milkSalesData: MatTableDataSource<MilkSalesDto>;
  toastrService: any;
  emptyData:boolean = false;

  constructor(private authService:AuthService,private milkSaleService: MilksalesService, private userService: UserService, private cookieService: CookieService) {
  }

  ngOnInit(): void {
    this.authService.checkSkOutdated()
    this.getUserDetail()
    this.getMilkSales()
  }

  getMilkSales() {
    let userId, securitykey;

    userId = this.cookieService.get("uid")
    securitykey = this.cookieService.get("sk")

    this.milkSaleService.getUserMilkSales(userId,securitykey).subscribe(response => {
      if(response.data.length == 0){
        this.emptyData = true;
      }
      this.milkSalesData = new MatTableDataSource(response.data);
      this.milkSalesData.sort = this.sort;
      this.milkSalesData.paginator = this.paginator;
    }, (responseError) => {
      this.toastrService.error(responseError.message);
    });
     

    this.milkSaleService.getUserMilkSales(userId, securitykey).subscribe(response => {

      for (let index = 0; index < response.data.length; index++) {
        this.milkSales = response.data;


        response.data[index].name = response.data[index].firstName
        response.data[index].value = response.data[index].price


        delete response.data[index].amount
        delete response.data[index].price
        delete response.data[index].firstName
        delete response.data[index].lastName
        delete response.data[index].boughtDate
        delete response.data[index].customerId
        delete response.data[index].salesId
        delete response.data[index].sellerId


      }
    })
  }

  getUserDetail() {
    let uid = this.cookieService.get("uid")
    let sk = this.cookieService.get("sk")

    this.userService.getUserDetail(uid, sk).subscribe((response) => {
      // single values
      this.animalCount = response.data.animalCount
      this.sales = response.data.totalSales
      this.customerCount = response.data.customerCount
      this.profit = response.data.profit

      // Horizontal bar chart values
      this.cowCount = { name: "Cow", value: response.data.cowCount }
      this.sheepCount = { name: "Sheep", value: response.data.sheepCount }
      this.bullCount = { name: "Bull", value: response.data.bullCount }
      this.calfCount = { name: "Calf", value: response.data.calfCount }
      this.allAnimals = { name: "Total", value: response.data.sheepCount + response.data.bullCount + response.data.calfCount + response.data.cowCount }

      this.animals = [this.cowCount, this.sheepCount, this.bullCount, this.calfCount, this.allAnimals]


    })

  }

}
