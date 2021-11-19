import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CookieService } from 'ngx-cookie-service';
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
  emptyData:boolean = false;
  constructor(private cookieService:CookieService,private provendersService: ProvenderService, private toastrService: ToastrService, private dialog: MatDialog,) {
  }

  ngOnInit(): void {

    this.getAllProvenders();
  }



  getAllProvenders() {
    let userId,securitykey;

    userId = this.cookieService.get("uid")
    securitykey = this.cookieService.get("sk")

    this.provendersService.getUserProvenders(userId,securitykey).subscribe(response => {
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

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }



  openAddMenu() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = "30%";
    dialogConfig.height = "60%";
    this.dialog.open(ProvenderAddComponent, dialogConfig).afterClosed().subscribe(result=>{
      this.refresh();
    });

  }

  openDeleteMenu() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = "30%";
    dialogConfig.height = "60%";
    this.dialog.open(ProvenderDeleteComponent, dialogConfig).afterClosed().subscribe(result=>{
      this.refresh();
    });
  }

  openUpdateMenu() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = "30%";
    dialogConfig.height = "60%";
    this.dialog.open(ProvenderUpdateComponent, dialogConfig).afterClosed().subscribe(result=>{
      this.refresh();
    });
  }
  refresh(){
    this.getAllProvenders();
  }
}


