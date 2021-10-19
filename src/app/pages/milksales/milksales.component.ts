import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { MilksaleAddComponent } from 'src/app/entries/milksale-add/milksale-add.component';
import { MilksaleDeleteComponent } from 'src/app/entries/milksale-delete/milksale-delete.component';
import { MilksaleUpdateComponent } from 'src/app/entries/milksale-update/milksale-update.component';
import { MilkSalesDto } from 'src/app/models/milkSalesDto';
import { MilksalesService } from 'src/app/services/milksales.service';

@Component({
  selector: 'app-milksales',
  templateUrl: './milksales.component.html',
  styleUrls: ['./milksales.component.css']
})
export class MilksalesComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource: MatTableDataSource<MilkSalesDto>;
  displayedColumns: string[] = ['salesId','customerName','amount','price','boughtDate'];
  
  constructor(private milkSalesService: MilksalesService, private toastrService: ToastrService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.getAllSales();
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); 
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }



  getAllSales() {
    this.milkSalesService.getMilkSales().subscribe(response => {
      this.dataSource = new MatTableDataSource(response.data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    }, (responseError) => {
      this.toastrService.error(responseError.message);
    });
  }

  openAddMenu() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = "30%";
    dialogConfig.height = "75%";
     this.dialog.open(MilksaleAddComponent, dialogConfig);

  }

  openDeleteMenu() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = "30%";
    dialogConfig.height = "75%";
      this.dialog.open(MilksaleDeleteComponent, dialogConfig);
  }

  openUpdateMenu() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = "30%";
    dialogConfig.height = "75%";
     this.dialog.open(MilksaleUpdateComponent, dialogConfig);
  }
}
