import { HttpEventType } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { UserImageService } from 'src/app/services/user-image.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  progress: boolean = false;
  userDetailArray : any = []
  addImageGroup: FormGroup;
  fileName: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  city: string;
  district: string;
  address: string;
  imagePath: string;
  
  constructor(private userService: UserService, private cookieService: CookieService, private formBuilder: FormBuilder, private userImageService: UserImageService, private toastrService: ToastrService) {
    this.userDetailArray =  [this.firstName, this.lastName, this.email, this.phoneNumber, this.city, this.address, this.district, this.imagePath]
   }

  ngOnInit(): void {
    
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

  getUserDetails() {
    let uid = this.cookieService.get("uid")
    let sk = this.cookieService.get("sk")

    this.userService.getUserDetail(uid, sk).subscribe((response) => {

      this.firstName = response.data.firstName;
      this.lastName = response.data.lastName;
      this.email = response.data.email;
      this.phoneNumber = response.data.phoneNumber;
      this.city = response.data.city;
      this.address = response.data.address;
      this.district = response.data.district;
      this.imagePath = response.data.imagePath;


     

      for (let index = 0; index < this.userDetailArray.length; index++) {
        if (this.userDetailArray[index] == null)
          this.userDetailArray[index] = "Veri bulunamadı!"
      }

      if (this.imagePath == null) {
        this.imagePath = "images/default.png"
      }
    })
  }
}
