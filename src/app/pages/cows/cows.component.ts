import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig, } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { CowAddComponent } from 'src/app/entries/cow-add/cow-add.component';
import { CowDeleteComponent } from 'src/app/entries/cow-delete/cow-delete.component';
import { CowUpdateComponent } from 'src/app/entries/cow-update/cow-update.component';
import { Cow } from 'src/app/models/cow';
import { CowsService } from 'src/app/services/cows.service';

declare var $;
@Component({
  selector: 'app-cows',
  templateUrl: './cows.component.html',
  styleUrls: ['./cows.component.css']
})
export class CowsComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource: MatTableDataSource<Cow>;
  displayedColumns: string[] = ['id','name', 'age', 'weight', 'dailyMilkAmount','weeklyMilkAmount','monthlyMilkAmount'];


  constructor(private cowService: CowsService, private dialog: MatDialog, private toastrService: ToastrService) { }

  ngOnInit(): void {
    this.getAllCows();
  }

  getAllCows() {
    this.cowService.getAllCows().subscribe(response => {
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
    this.dialog.open(CowDeleteComponent, dialogConfig);
  }

  openAddMenu() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = "30%";
    dialogConfig.height = "75%";
    this.dialog.open(CowAddComponent, dialogConfig);

  }

  openUpdateMenu() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = "30%";
    dialogConfig.height = "75%";
    this.dialog.open(CowUpdateComponent, dialogConfig);
  }

}




