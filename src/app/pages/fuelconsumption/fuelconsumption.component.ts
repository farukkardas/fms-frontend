import { Component, IterableDiffers, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';
import { FuelAddComponent } from 'src/app/entries/fuel-add/fuel-add.component';
import { FuelDeleteComponent } from 'src/app/entries/fuel-delete/fuel-delete.component';
import { FuelUpdateComponent } from 'src/app/entries/fuel-update/fuel-update.component';
import { FuelConsumption } from 'src/app/models/fuelConsumption';
import { FuelConsumptionService } from 'src/app/services/fuelconsumption.service';
import {switchMap} from "rxjs/operators"
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-fuelconsumption',
  templateUrl: './fuelconsumption.component.html',
  styleUrls: ['./fuelconsumption.component.css']
})
export class FuelconsumptionComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource: MatTableDataSource<FuelConsumption>;
  displayedColumns: string[] = ['id', 'fuelType', 'amount', 'price', 'boughtDate'];
  emptyData:boolean = false;


  constructor(private cookieService:CookieService, private fuelConsumptionService: FuelConsumptionService, private dialog: MatDialog, private toastrService: ToastrService) {

  }

  ngOnInit(): void {
    this.getAllFuels();
    
  }


  public getAllFuels() {
    let uid, securityKey;

    uid = this.cookieService.get("uid");
    securityKey = this.cookieService.get("sk");

    this.fuelConsumptionService.getUserFuelConsumptions(uid,securityKey).subscribe(response => {
      if(response.data.length == 0){
        this.emptyData = true;
      }
      this.dataSource = new MatTableDataSource(response.data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    }, (responseError) => {
      this.toastrService.error(responseError.message,"Error",{ positionClass: 'toast-bottom-right' });
    });

  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }


  openDeleteMenu() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = "30%";
    dialogConfig.height = "75%";
    this.dialog.open(FuelDeleteComponent, dialogConfig).afterClosed().subscribe(result=>{
      this.refresh();
    });
  }

  openAddMenu() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = "30%";
    dialogConfig.height = "75%";
    this.dialog.open(FuelAddComponent, dialogConfig).afterClosed().subscribe(result=>{
      this.refresh();
    });

  }

  openUpdateMenu() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = "30%";
    dialogConfig.height = "75%";
    this.dialog.open(FuelUpdateComponent, dialogConfig).afterClosed().subscribe(result=>{
      this.refresh();
    });
  }


  refresh(){
    this.getAllFuels();
  }
}
