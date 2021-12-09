import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Toast, ToastrService } from 'ngx-toastr';
import { ProductAddComponent } from 'src/app/entries/product-add/product-add.component';
import { ProductsOnSale } from 'src/app/models/productsOnSale';
import { AuthService } from 'src/app/services/auth.service';
import { ProductsonsaleService } from 'src/app/services/productsonsale.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource: MatTableDataSource<ProductsOnSale>;
  displayedColumns: string[] = ['id', 'name', 'price', 'imagePath','delete'];
  emptyData: boolean = false;
  constructor(private productOnSaleService: ProductsonsaleService, private toastrService: ToastrService, private authService: AuthService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.authService.checkSkOutdated()
    this.getProducts()
    
  }

 

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  getProducts() {

    this.productOnSaleService.getUserProducts().subscribe((response) => {
      if (response.data.length == 0) {
        this.emptyData = true;
      }
      this.dataSource = new MatTableDataSource(response.data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    }, (responseError) => {
      this.toastrService.error(responseError.message, "Error", { positionClass: 'toast-bottom-right' })
    })
  }

  deleteProducts(userId:any){
    this.productOnSaleService.deleteProduct(userId).subscribe((response)=>{
      this.toastrService.info(response.message, "Success", { positionClass: 'toast-bottom-right' })
      this.getProducts()
    },(responseError)=>{
     
      this.toastrService.error(responseError.error.message, "Error", { positionClass: 'toast-bottom-right' })
    })
  }


  openAddMenu() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = "30%";
    dialogConfig.height = "50%";
    this.dialog.open(ProductAddComponent, dialogConfig).afterClosed().subscribe(result => {
      this.refresh();
      this.emptyData = false;
    });;

  }

  refresh() {
    this.getProducts();
  }
}
