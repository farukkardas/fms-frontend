import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { AnimalsalesAddComponent } from 'src/app/entries/animalsales-add/animalsales-add.component';
import { AnimalsalesDeleteComponent } from 'src/app/entries/animalsales-delete/animalsales-delete.component';
import { AnimalsalesUpdateComponent } from 'src/app/entries/animalsales-update/animalsales-update.component';
import { AnimalSalesDto } from 'src/app/models/animalSalesDto';
import { AnimalsalesService } from 'src/app/services/animalsales.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-animalsales',
  templateUrl: './animalsales.component.html',
  styleUrls: ['./animalsales.component.css']
})
export class AnimalsalesComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource: MatTableDataSource<AnimalSalesDto>;
  displayedColumns: string[] = ['salesId', 'customerName', 'amount', 'price', 'animalType', 'boughtDate'];
  emptyData: boolean = false;
  animals = { 1: "Cow", 2: "Calf", 3: "Sheep", 4: "Bull" }
  constructor(private authService: AuthService, private toastrService: ToastrService, private animalSalesService: AnimalsalesService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.authService.checkSkOutdated();
    this.getAnimalSales();
  }


  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  getAnimalSales() {
    this.animalSalesService.getUserAnimalSales().subscribe((response) => {
      if (response.data.length == 0) {
        this.emptyData = true;
      }
      this.dataSource = new MatTableDataSource(response.data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;

    }, (responseError) => {
      this.toastrService.error(responseError.message, "Error", { positionClass: 'toastr-bottom-right' })
    })

  }


  openAddMenu() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = "30%";
    dialogConfig.height = "75%";
    this.dialog.open(AnimalsalesAddComponent, dialogConfig).afterClosed().subscribe(result => {
      this.refresh();
    });

  }

  openDeleteMenu() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = "30%";
    dialogConfig.height = "75%";
    this.dialog.open(AnimalsalesDeleteComponent, dialogConfig).afterClosed().subscribe(result => {
      this.refresh();
    });
  }

  openUpdateMenu() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = "30%";
    dialogConfig.height = "75%";
    this.dialog.open(AnimalsalesUpdateComponent, dialogConfig).afterClosed().subscribe(result => {
      this.refresh();
    });
  }

  refresh() {
    this.getAnimalSales();
  }

}
