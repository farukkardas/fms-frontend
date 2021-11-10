import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { FertilizerAddComponent } from 'src/app/entries/fertilizer-add/fertilizer-add.component';
import { FertilizerDeleteComponent } from 'src/app/entries/fertilizer-delete/fertilizer-delete.component';
import { FertilizerUpdateComponent } from 'src/app/entries/fertilizer-update/fertilizer-update.component';
import { Fertilizer } from 'src/app/models/fertilizer';
import { FertilizersService } from 'src/app/services/fertilizers.service';

@Component({
  selector: 'app-fertilizers',
  templateUrl: './fertilizers.component.html',
  styleUrls: ['./fertilizers.component.css']
})
export class FertilizersComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource: MatTableDataSource<Fertilizer>;
  displayedColumns: string[] = ['id', 'fertilizerType', 'fertilizerBrand', 'weight', 'price', 'boughtDate'];
  emptyData:boolean = false;

  constructor(private cookieService: CookieService, private fertilizerService: FertilizersService, private dialog: MatDialog, private toastrService: ToastrService) { }

  ngOnInit(): void {
    this.getAllFertilizers();
  }

  getAllFertilizers() {
    let userId, securitykey;

    userId = this.cookieService.get("uid")
    securitykey = this.cookieService.get("sk")

    this.fertilizerService.getUserFertilizers(userId,securitykey).subscribe(response => {
      if(response.data.length == 0){
        this.emptyData = true;
      }
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
    dialogConfig.height = "70%";
    this.dialog.open(FertilizerDeleteComponent, dialogConfig).afterClosed().subscribe(result=>{
      this.refresh();
    });
  }

  openAddMenu() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = "30%";
    dialogConfig.height = "65%";
    this.dialog.open(FertilizerAddComponent, dialogConfig).afterClosed().subscribe(result=>{
      this.refresh();
    });

  }

  openUpdateMenu() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = "30%";
    dialogConfig.height = "70%";
    this.dialog.open(FertilizerUpdateComponent, dialogConfig).afterClosed().subscribe(result=>{
      this.refresh();
    });
  }


  refresh(){
    this.getAllFertilizers();
  }
}
