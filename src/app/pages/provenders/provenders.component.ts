import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { ProvenderAddComponent } from 'src/app/entries/provender-add/provender-add.component';
import { ProvenderDeleteComponent } from 'src/app/entries/provender-delete/provender-delete.component';
import { ProvenderUpdateComponent } from 'src/app/entries/provender-update/provender-update.component';
import { Provender } from 'src/app/models/provender';
import { ProvenderService } from 'src/app/services/provender.service';

@Component({
  selector: 'app-provenders',
  templateUrl: './provenders.component.html',
  styleUrls: ['./provenders.component.css']
})
export class ProvendersComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource: MatTableDataSource<Provender>;
  displayedColumns: string[] = ['id', 'provenderName', 'weight', 'price', 'boughtDate'];
  constructor(private provendersService: ProvenderService, private toastrService: ToastrService, private dialog: MatDialog,) {
  }

  ngOnInit(): void {

    this.getAllProvenders();
  }



  getAllProvenders() {
    this.provendersService.getAll().subscribe(response => {
      this.dataSource = new MatTableDataSource(response.data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    }, (responseError) => {
      this.toastrService.error(responseError.message);
    });
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }



  openAddMenu() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = "30%";
    dialogConfig.height = "75%";
    this.dialog.open(ProvenderAddComponent, dialogConfig);

  }

  openDeleteMenu() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = "30%";
    dialogConfig.height = "75%";
    this.dialog.open(ProvenderDeleteComponent, dialogConfig);
  }

  openUpdateMenu() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = "30%";
    dialogConfig.height = "75%";
    this.dialog.open(ProvenderUpdateComponent, dialogConfig);
  }

}


