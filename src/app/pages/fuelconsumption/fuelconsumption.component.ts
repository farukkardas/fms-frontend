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


  constructor(private iterableDiffers: IterableDiffers, private fuelConsumptionService: FuelConsumptionService, private dialog: MatDialog, private toastrService: ToastrService) {

  }

  ngOnInit(): void {
    this.getAllFuels();
    
  }


  public getAllFuels() {
    this.fuelConsumptionService.getAll().subscribe(response => {
      this.dataSource = new MatTableDataSource(response.data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    }, (responseError) => {
      this.toastrService.error(responseError.message);
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
    this.dialog.open(FuelDeleteComponent, dialogConfig);
  }

  openAddMenu() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = "30%";
    dialogConfig.height = "75%";
    this.dialog.open(FuelAddComponent, dialogConfig);

  }

  openUpdateMenu() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = "30%";
    dialogConfig.height = "75%";
    this.dialog.open(FuelUpdateComponent, dialogConfig);
  }


}
