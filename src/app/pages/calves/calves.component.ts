import { Component,OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { CalfAddComponent } from 'src/app/entries/calf-add/calf-add.component';
import { CalfDeleteComponent } from 'src/app/entries/calf-delete/calf-delete.component';
import { CalfUpdateComponent } from 'src/app/entries/calf-update/calf-update.component';
import { Calf } from 'src/app/models/calf';
import { AuthService } from 'src/app/services/auth.service';
import { CalvesService } from 'src/app/services/calves.service';


declare var $;
@Component({
  selector: 'app-calves',
  templateUrl: './calves.component.html',
  styleUrls: ['./calves.component.css']
})
export class CalvesComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource: MatTableDataSource<Calf>;
  displayedColumns: string[] = ['id','age', 'gender', 'calfName', 'weight','birthDate'];
  emptyData:boolean = false;

  constructor(private authService:AuthService,private cookieService:CookieService,private calfService:CalvesService,private dialog:MatDialog,private toastrService:ToastrService) { }

  ngOnInit(): void {
    this.authService.checkSkOutdated()
    this.getAllCalves();
    
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); 
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }


  getAllCalves(){
    let userId,securitykey;

    userId = this.cookieService.get("uid")
    securitykey = this.cookieService.get("sk")

    this.calfService.getUserCalves(userId,securitykey).subscribe(response => {
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

  openAddMenu(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = "30%";
    dialogConfig.height = "75%";
    this.dialog.open(CalfAddComponent, dialogConfig).afterClosed().subscribe(result=>{
      this.refresh();
    });

  }

  openDeleteMenu(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = "30%";
    dialogConfig.height = "75%";
    this.dialog.open(CalfDeleteComponent, dialogConfig).afterClosed().subscribe(result=>{
      this.refresh();
    });
  }

  openUpdateMenu(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = "30%";
    dialogConfig.height = "75%";
    this.dialog.open(CalfUpdateComponent, dialogConfig).afterClosed().subscribe(result=>{
      this.refresh();
    });
  }
  refresh(){
    this.getAllCalves();
  }
}
