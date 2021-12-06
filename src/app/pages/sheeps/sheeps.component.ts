import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { SheepAddComponent } from 'src/app/entries/sheep-add/sheep-add.component';
import { SheepDeleteComponent } from 'src/app/entries/sheep-delete/sheep-delete.component';
import { SheepUpdateComponent } from 'src/app/entries/sheep-update/sheep-update.component';
import { Sheep } from 'src/app/models/sheep';
import { AuthService } from 'src/app/services/auth.service';
import { SheepsService } from 'src/app/services/sheeps.service';

@Component({
  selector: 'app-sheeps',
  templateUrl: './sheeps.component.html',
  styleUrls: ['./sheeps.component.css']
})
export class SheepsComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource: MatTableDataSource<Sheep>;
  displayedColumns: string[] = ['id', 'age', 'race', 'weight'];
  emptyData:boolean = false;
  constructor(private authService:AuthService,private cookieService:CookieService,private sheepsService: SheepsService, private toastrService: ToastrService,
    private dialog: MatDialog) { }

  ngOnInit(): void {
    this.authService.checkSkOutdated()
    this.getAllSheeps();
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); 
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  getAllSheeps() {

  
     this.sheepsService.getUserSheeps().subscribe(response => {
      if(response.data.length == 0){
        this.emptyData = true;
      }
      this.dataSource = new MatTableDataSource(response.data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    }, (responseError) => {
      this.toastrService.error(responseError.error.message,"Error",{ positionClass: 'toast-bottom-right' });
    });
  }

  openAddMenu() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = "30%";
    dialogConfig.height = "75%";
    this.dialog.open(SheepAddComponent, dialogConfig).afterClosed().subscribe(result=>{
      this.refresh();
    });

  }

  openDeleteMenu() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = "30%";
    dialogConfig.height = "75%";
    this.dialog.open(SheepDeleteComponent, dialogConfig).afterClosed().subscribe(result=>{
      this.refresh();
    });
  }

  openUpdateMenu() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = "30%";
    dialogConfig.height = "75%";
    this.dialog.open(SheepUpdateComponent, dialogConfig).afterClosed().subscribe(result=>{
      this.refresh();
    });
  }
  refresh(){
    this.getAllSheeps();
  }
}
