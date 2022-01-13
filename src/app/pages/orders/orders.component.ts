import { Template } from '@angular/compiler/src/render3/r3_ast';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { CargoAddNoComponent } from 'src/app/entries/cargo-add-no/cargo-add-no.component';
import { CargoInfoComponent } from 'src/app/entries/cargo-info/cargo-info.component';
import { CityConstants } from 'src/app/models/cityConstants';
import { OrderDetailDto } from 'src/app/models/orderDetailDto';
import { AuthService } from 'src/app/services/auth.service';
import { OrdersService } from 'src/app/services/orders.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(TemplateRef) approveTemplate: TemplateRef<any>;

  dataSource: MatTableDataSource<OrderDetailDto>;
  listOfOrders : OrderDetailDto[] = [];
  displayedColumns: string[] = ['id', 'sellerName', 'customerName', 'productName', 'deliveryCity', 'deliveryDistrict', 'deliveryAddress', 'boughtDate', 'status', 'actions'];
  emptyData: boolean = false;
  disableActionButton: boolean;
  cities = CityConstants.cities;
  buttonName = "";
  modalRef: BsModalRef;
  statusNumber :number;
  orderId : any;
  deliveryNo : number;
  constructor(private modalService: BsModalService, private authService: AuthService, private ordersService: OrdersService, private dialog: MatDialog, private toastrService: ToastrService) { }

  ngOnInit(): void {
    this.authService.checkSkOutdated()
    this.getOrders()
  }

  checkOrderStatusIcon(status: number) {
    switch (status) {
      case 1: {
        return "assets/icons/canceled.png"
      }
      case 2: {
        return "assets/icons/pending.png"
      }
      case 3: {
        return "assets/icons/approved.png"
      }
      case 5: {
        return "assets/icons/delivery.png"
      }
      case 6: {
        return "assets/icons/completed.png"
      }
      default: {
        return "assets/icons/pending.png"
      }
    }
  }

  setImageHolder(status: number) {
    switch (status) {
      case 1: {
        return "Canceled"
      }
      case 2: {
        return "Pending"
      }
      case 3: {
        return "Approved"
      }
      case 5: {
        return "On delivery.."
      }
      case 6: {
        return "Completed"
      }
      default: {
        return "Pending"
      }
    }
  }


  setActionButtonName(status: number) {
    switch (status) {
      case 1: {
        this.buttonName = "Canceled";
        return "Canceled"
      }
      case 2: {
        this.buttonName = "Approve";
        return "Pending"
      }
      case 3: {
        this.buttonName = "Add Cargo No";
        return "Approved"
      }
      case 5: {
        this.buttonName = "Delivery No";
        return "On delivery.."
      }
      case 6: {
        this.buttonName = "Completed";
        return "Completed"
      }
      default: {
        return "Pending"
      }
    }
  }

  setButtonClass(status: number) {
    switch (status) {
      case 1: {

        return "canceled-button"
      }
      case 2: {
        return "pending-button"
      }
      case 3: {
        return "approved-button"
      }
      case 5: {
        return "delivery-button"
      }
      case 6: {
        this.disableActionButton = true;
        return "completed-button"
      }
      default: {
        return "pending-button"
      }
    }
  }

  openModal(template: TemplateRef<any>,orderId:number) {
    this.modalRef = this.modalService.show(template, { class: 'modal-dialog-centered' })
    this.orderId = orderId;
  }


  confirmApprove(){
    console.log(this.orderId)
    this.ordersService.approveOrder(this.orderId).subscribe((response)=>{
    this.toastrService.success(response.message,"Success",{positionClass:'toast-bottom-right'})
    this.refresh()
    },(responseError)=>{
    });
    this.modalRef.hide();
  }

  decline(): void {
    this.modalRef.hide();
  }

  orderAction(status: number,orderId:number,deliveryNo:number) {
    switch (status) {
      case 1: {
        return
      }
      case 2: {
        this.openModal(this.approveTemplate,orderId)
        break;
      }
      case 3: {
       this.orderId = orderId
        this.openAddCargoNoMenu()
        break;
      }
      case 5: {
        this.deliveryNo = deliveryNo;
        this.openCargoInfoMenu()
        break;
      }
      default: {
      }
    }
  }

  openAddCargoNoMenu() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = "25%";
    dialogConfig.height = "25%";
    dialogConfig.data = this.orderId
    this.dialog.open(CargoAddNoComponent, dialogConfig).afterClosed().subscribe(result => {
      this.refresh();
      this.emptyData = false;
    });;
  }

  openCargoInfoMenu() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = "25%";
    dialogConfig.height = "20%";
    dialogConfig.data = this.deliveryNo
    this.dialog.open(CargoInfoComponent, dialogConfig).afterClosed().subscribe(result => {
      this.refresh();
      this.emptyData = false;
    });;
  }

  refresh(){
    this.getOrders()
    this.setImageHolder(this.orderId)
  }

  getOrders() {
    this.ordersService.getUserOrders().subscribe((response) => {
      if (response.data.length == 0) {
        this.emptyData = true;
      }
      this.listOfOrders = response.data;
      this.dataSource = new MatTableDataSource(response.data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    }, (responseError) => {
      this.toastrService.error(responseError.message, "Error", { positionClass: 'toast-bottom-right' })
    })
  }

}
