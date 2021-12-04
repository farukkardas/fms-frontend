import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { CityConstants } from 'src/app/models/cityConstants';
import { OrderDetailDto } from 'src/app/models/orderDetailDto';
import { AuthService } from 'src/app/services/auth.service';
import { OrdersService } from 'src/app/services/orders.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource: MatTableDataSource<OrderDetailDto>;
  displayedColumns: string[] = ['id','sellerName', 'customerName', 'productName', 'deliveryCity', 'deliveryDistrict', 'deliveryAddress', 'boughtDate','status'];
  emptyData: boolean = false;
  cities = CityConstants.cities;
  constructor(private authService: AuthService, private ordersService: OrdersService, private dialog: MatDialog, private toastrService: ToastrService) { }

  ngOnInit(): void {
    this.authService.checkSkOutdated()
    this.getOrders()
  }


  getOrders() {
    this.ordersService.getUserOrders().subscribe((response) => {
      if (response.data.length == 0) {
        this.emptyData = true;
      }
      this.dataSource = new MatTableDataSource(response.data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    }, (responseError) => {
      this.toastrService.error(responseError.message, "Error", { positionClass: 'toast-bottom-right' })
    })
  }

}
