import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { CustomerAddComponent } from 'src/app/entries/customer-add/customer-add.component';
import { CustomerDeleteComponent } from 'src/app/entries/customer-delete/customer-delete.component';
import { CustomerUpdateComponent } from 'src/app/entries/customer-update/customer-update.component';
import { Customer } from 'src/app/models/customer';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource: MatTableDataSource<Customer>;
  displayedColumns: string[] = ['id','firstName', 'lastName', 'address','phoneNumber'];

  constructor(private customerService: CustomerService, private toastrService: ToastrService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.getAllCustomers();
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); 
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }



  getAllCustomers() {
    this.customerService.getAll().subscribe(response => {
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
    this.dialog.open(CustomerAddComponent, dialogConfig);

  }

  openDeleteMenu() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = "30%";
    dialogConfig.height = "75%";
     this.dialog.open(CustomerDeleteComponent, dialogConfig);
  }

  openUpdateMenu() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = "30%";
    dialogConfig.height = "75%";
    this.dialog.open(CustomerUpdateComponent  , dialogConfig);
  }

}
