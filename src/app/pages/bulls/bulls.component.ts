import { ChangeDetectorRef, Component, OnChanges, OnDestroy, OnInit, SimpleChange, SimpleChanges, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CookieService } from 'ngx-cookie-service';
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
  displayedColumns: string[] = ['bullId','age', 'bullName', 'weight'];
  emptyData:boolean = false;


  constructor(private cookieService:CookieService,private bullsService: BullsService, private toastrService: ToastrService, private dialog: MatDialog, private changeDetectorRefs: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.getAllBulls();
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); 
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }



  getAllBulls() {
    let userId,securitykey;

    userId = this.cookieService.get("uid")
    securitykey = this.cookieService.get("sk")
    
    this.bullsService.getUserBulls(userId,securitykey).subscribe(response => {

      
      if(response.data.length == 0){
        this.emptyData = true;
      }
      this.dataSource = new MatTableDataSource(response.data);
      this.changeDetectorRefs.detectChanges() 
      this.dataSource.sort = this.sort;

      this.dataSource.paginator = this.paginator;
      this.changeDetectorRefs.detectChanges();
    }, (responseError) => {
      this.toastrService.error(responseError.message,"Error",{positionClass:'toast-bottom-right'});
      
    });
  }

  openAddMenu() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = "30%";
    dialogConfig.height = "70%";
    this.dialog.open(BullAddComponent, dialogConfig).afterClosed().subscribe(result=>{
      this.refresh();
    });

  }

  openDeleteMenu() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = "30%";
    dialogConfig.height = "60%";
    
     this.dialog.open(BullDeleteComponent, dialogConfig).afterClosed().subscribe(result=>{
      this.refresh();
    });

  }

  openUpdateMenu() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = "30%";
    dialogConfig.height = "60%";
    this.dialog.open(BullUpdateComponent, dialogConfig).afterClosed().subscribe(result=>{
      this.refresh();
    });

  }

 refresh(){
   this.getAllBulls();
 }
}
