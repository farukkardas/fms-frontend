import { Component, OnChanges, OnDestroy, OnInit, SimpleChange, SimpleChanges, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subject } from 'rxjs';
import { BullAddComponent } from 'src/app/entries/bull-add/bull-add.component';
import { BullDeleteComponent } from 'src/app/entries/bull-delete/bull-delete.component';
import { BullUpdateComponent } from 'src/app/entries/bull-update/bull-update.component';
import { Bull } from 'src/app/models/bull';
import { BullsService } from 'src/app/services/bulls.service';
declare var $;
@Component({
  selector: 'app-bulls',
  templateUrl: './bulls.component.html',
  styleUrls: ['./bulls.component.css']
})
export class BullsComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource: MatTableDataSource<Bull>;
  displayedColumns: string[] = ['id','age', 'bullName', 'weight'];

  constructor(private bullsService: BullsService, private toastrService: ToastrService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.getAllBulls();
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); 
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }



  getAllBulls() {
    this.bullsService.getAllBulls().subscribe(response => {
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
    dialogConfig.height = "70%";
    this.dialog.open(BullAddComponent, dialogConfig);

  }

  openDeleteMenu() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = "30%";
    dialogConfig.height = "60%";
    
     this.dialog.open(BullDeleteComponent, dialogConfig);
  }

  openUpdateMenu() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = "30%";
    dialogConfig.height = "60%";
    this.dialog.open(BullUpdateComponent, dialogConfig);
  }
}
