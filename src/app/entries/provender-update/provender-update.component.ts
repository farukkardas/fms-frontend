import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { Provender } from 'src/app/models/provender';
import { ProvenderService } from 'src/app/services/provender.service';

@Component({
  selector: 'app-provender-update',
  templateUrl: './provender-update.component.html',
  styleUrls: ['./provender-update.component.css']
})
export class ProvenderUpdateComponent implements OnInit {
  provenders: Provender[] = [];
  modalRef: BsModalRef;
  updateProvenderGroup: FormGroup;
  property = this.provenders[0];
  dtTrigger: Subject<any> = new Subject<any>();
  constructor(private provenderService: ProvenderService, private modalService: BsModalService, private formBuilder: FormBuilder, private toastrService: ToastrService,
    ) { }
  

    ngOnInit(): void {
      this.getAllProvenders();
      this.createUpdateProvenderForm();
    }
  
    confirm() {
      this.updateProvender();
      this.modalRef.hide();
  
    }
  
    decline() {
      this.modalRef.hide();
    }
  
    // get bullId() {
    //   return this.updateProvenderGroup.get('bullId')
    // };
  
    getAllProvenders() {
      this.provenderService.getAll().subscribe((response) => {
        this.provenders = response.data;
      })
    }
  
    createUpdateProvenderForm() {
      this.updateProvenderGroup = this.formBuilder.group({
        id: ['', Validators.required],
        provenderName: ['', Validators.required],
        weight: ['', Validators.required],
        price: ['', Validators.required],
        boughtDate: ['', Validators.required]
      });
    }
  
  
  
  
    openModal(template: TemplateRef<any>) {
      if (!this.updateProvenderGroup.valid) { return }
  
      this.modalRef = this.modalService.show(template, { class: 'modal-dialog-centered' })
    }
  
  
  
    updateProvender() {
      let updateProvenderGroup: Provender = { ...this.updateProvenderGroup.value };
  
      this.provenderService.updateProvender(updateProvenderGroup).subscribe((response) => {
        this.toastrService.success(response.message, "Succes", { positionClass: 'toast-bottom-right' });
  
        
        this.getAllProvenders();
  
      }, (responseError) => {
        if (responseError.error.Errors.length > 0) {
          for (let i = 0; i < responseError.error.Errors.length; i++) {
            this.toastrService.error(responseError.error.Errors[i].ErrorMessage, "Error", { positionClass: 'toast-bottom-right' }
            )
          }
        }
  
        else {
          this.toastrService.error(responseError.error, "Error", { positionClass: 'toast-bottom-right' })
        }
      })
    }


}
