import { HttpEventType } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { UserUpdateComponent } from 'src/app/entries/user-update/user-update.component';
import { CityConstants } from 'src/app/models/cityConstants';
import { UserDetail } from 'src/app/models/userDetail';
import { AuthService } from 'src/app/services/auth.service';
import { UserImageService } from 'src/app/services/user-image.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
// Şimdilik şehirleri sabit olarak tutuyorum. Bir şehir apisinden veriler çekilip de yapılabilir.
  cities = CityConstants.cities;


  profit : number;
  totalSale : number;
  progress: boolean = false;
  addImageGroup: FormGroup;
  fileName: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  cityAndDistrict: string;
  district: string;
  address: string;
  imagePath: string;


  constructor(private authService: AuthService, private matDialog: MatDialog, private userService: UserService, private cookieService: CookieService, private formBuilder: FormBuilder, private userImageService: UserImageService, private toastrService: ToastrService) {

  }

  ngOnInit(): void {
    this.authService.checkSkOutdated()
    this.getUserDetails()
    this.createAddImageGroup()
  }

  createAddImageGroup() {
    this.addImageGroup = this.formBuilder.group({
      file: ["", Validators.required],
      userId: [this.cookieService.get("uid"), Validators.required]

    });
  }

  // Bu function veli nimet. Inputta dosyayı seçmeme rağmen sürekli servere null gönderiyordu bu function çözdü.
  onFileSelect(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.addImageGroup.get('file').setValue(file);
    }
  }

  changePhoto() {
    if (this.imagePath == null) {
      this.addNewImage()
    }
    else {
      this.updateImage()
    }
  }

  updateImage() {

    if (!this.addImageGroup.valid) return;

    let fileModel = this.addImageGroup.get("file").value
    let idModel = this.addImageGroup.get("userId").value

    this.userImageService.updateUserImage(fileModel, idModel).subscribe((response) => {
      this.progress = true;
      this.toastrService.success(response.message, "Sucess", { positionClass: 'toast-bottom-right' })

      setTimeout(() => window.location.reload(), 1500)
    }, (responseError) => {
     
      this.toastrService.error("Invalid image type! Only accepts JPEG,PNG,BMP!", "Error", { positionClass: 'toast-bottom-right' });
    })
  }

  addNewImage() {
    if (!this.addImageGroup.valid) return;

    let fileModel = this.addImageGroup.get("file").value
    let idModel = this.addImageGroup.get("userId").value

    this.userImageService.addUserImage(fileModel, idModel).subscribe((response) => {
      this.toastrService.success(response.message, "Succes", { positionClass: 'toast-bottom-right' });
      setTimeout(() => window.location.reload(), 1500)
    }, (responseError) => {
      console.log(responseError)
      this.toastrService.error("Invalid image type! Only accepts JPEG,PNG,BMP!", "Error", { positionClass: 'toast-bottom-right' });
    })

  }

  openUpdateMenu() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = "30%";
    dialogConfig.height = "80%";
    this.matDialog.open(UserUpdateComponent, dialogConfig).afterClosed().subscribe(result => {
      this.refresh();
    });
  }

  refresh() {
    this.getUserDetails();
  }

  getUserDetails() {

    this.userService.getUserDetail().subscribe((response) => {

      let city: string = response.data.city ?? " Empty ";
      let district: string = response.data.district ?? " Empty ";

      this.profit = response.data.profit;
      this.totalSale = response.data.totalSales;
      this.firstName = response.data.firstName ?? 'Empty !';
      this.lastName = response.data.lastName ?? 'Empty!';
      this.email = response.data.email ?? 'Empty !';
      this.phoneNumber = response.data.phoneNumber ?? 'Empty !';
      this.cityAndDistrict = city, district ?? 'Empty !';
      this.address = response.data.address ?? 'Empty !';
      this.imagePath = response.data.imagePath ?? 'images/default.png';
    })
  }


}
