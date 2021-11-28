import { HttpEventType } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { UserUpdateComponent } from 'src/app/entries/user-update/user-update.component';
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
  cities = {
    1: "Adana",
    2: "Adıyaman",
    3: "Afyonkarahisar",
    4: "Ağrı",
    5: "Amasya",
    6: "Ankara",
    7: "Antalya",
    8: "Artvin",
    9: "Aydın",
    10: "Balıkesir",
    11: "Bilecik",
    12: "Bingöl",
    13: "Bitlis",
    14: "Bolu",
    15: "Burdur",
    16: "Bursa",
    17: "Çanakkale",
    18: "Çankırı",
    19: "Çorum",
    20: "Denizli",
    21: "Diyarbakır",
    22: "Edirne",
    23: "Elazığ",
    24: "Erzincan",
    25: "Erzurum",
    26: "Eskişehir",
    27: "Gaziantep",
    28: "Giresun",
    29: "Gümüşhane",
    30: "Hakkâri",
    31: "Hatay",
    32: "Isparta",
    33: "Mersin",
    34: "İstanbul",
    35: "İzmir",
    36: "Kars",
    37: "Kastamonu",
    38: "Kayseri",
    39: "Kırklareli",
    40: "Kırşehir",
    41: "Kocaeli",
    42: "Konya",
    43: "Kütahya",
    44: "Malatya",
    45: "Manisa",
    46: "Kahramanmaraş",
    47: "Mardin",
    48: "Muğla",
    49: "Muş",
    50: "Nevşehir",
    51: "Niğde",
    52: "Ordu",
    53: "Rize",
    54: "Sakarya",
    55: "Samsun",
    56: "Siirt",
    57: "Sinop",
    58: "Sivas",
    59: "Tekirdağ",
    60: "Tokat",
    61: "Trabzon",
    62: "Tunceli",
    63: "Şanlıurfa",
    64: "Uşak",
    65: "Van",
    66: "Yozgat",
    67: "Zonguldak",
    68: "Aksaray",
    69: "Bayburt",
    70: "Karaman",
    71: "Kırıkkale",
    72: "Batman",
    73: "Şırnak",
    74: "Bartın",
    75: "Ardahan",
    76: "Iğdır",
    77: "Yalova",
    78: "Karabük",
    79: "Kilis",
    80: "Osmaniye",
    81: "Düzce"
  }


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
      this.toastrService.error(responseError.message, "Error", { positionClass: 'toast-bottom-right' });
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
      this.toastrService.error(responseError.message, "Error", { positionClass: 'toast-bottom-right' });
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
    let uid = this.cookieService.get("uid")
    let sk = this.cookieService.get("sk")

    this.userService.getUserDetail(uid, sk).subscribe((response) => {

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
