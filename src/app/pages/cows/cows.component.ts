import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig, } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { CowAddComponent } from 'src/app/entries/cow-add/cow-add.component';
import { CowDeleteComponent } from 'src/app/entries/cow-delete/cow-delete.component';
import { CowUpdateComponent } from 'src/app/entries/cow-update/cow-update.component';
import { Cow } from 'src/app/models/cow';
import { AuthService } from 'src/app/services/auth.service';
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
  emptyData:boolean = false;


  constructor(private authService:AuthService,private cookieService:CookieService,private cowService: CowsService, private dialog: MatDialog, private toastrService: ToastrService) { }

  ngOnInit(): void {
    this.authService.checkSkOutdated()
    this.getAllCows();
  }

  getAllCows() {
let userId,securitykey;

userId = this.cookieService.get("uid")
securitykey = this.cookieService.get("sk")

    this.cowService.getUserCows(userId,securitykey).subscribe(response => {
      if(response.data.length == 0){
        this.emptyData = true;
      }
      this.dataSource = new MatTableDataSource(response.data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    }, (responseError) => {
      console.log(responseError.error.message)
      this.toastrService.error(responseError.error.message,"Error" , {positionClass: 'toast-bottom-right'});
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
    this.dialog.open(CowDeleteComponent, dialogConfig).afterClosed().subscribe(result=>{
      this.refresh();
    });
  }

  openAddMenu() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = "30%";
    dialogConfig.height = "75%";
    this.dialog.open(CowAddComponent, dialogConfig).afterClosed().subscribe(result=>{
      this.refresh();
    });;

  }

  openUpdateMenu() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = "30%";
    dialogConfig.height = "75%";

    this.dialog.open(CowUpdateComponent, dialogConfig).afterClosed().subscribe(result=>{
      this.refresh();
    });;
  }

  refresh(){
    this.getAllCows();
  }

}




