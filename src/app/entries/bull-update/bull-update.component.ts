import { ChangeDetectorRef, Component, OnChanges, OnDestroy, OnInit, SimpleChanges, TemplateRef } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { Observable, of, Subject } from 'rxjs';
import { Bull } from 'src/app/models/bull';
import { BullsService } from 'src/app/services/bulls.service';

@Component({
  selector: 'app-bull-update',
  templateUrl: './bull-update.component.html',
  styleUrls: ['./bull-update.component.css']
})
export class BullUpdateComponent implements OnInit {
  bulls: Bull[] = [];
  modalRef: BsModalRef;
  updateBullGroup: FormGroup;
  property = this.bulls[0];
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(private bullsService: BullsService, private modalService: BsModalService, private formBuilder: FormBuilder, private toastrService: ToastrService,
  ) { }

  ngOnInit(): void {
    this.getAllBulls();
    this.createUpdateBullForm();
  }

  confirm() {
    this.updateBull();
    this.modalRef.hide();

  }

  decline() {
    this.modalRef.hide();
  }

  get bullId() {
    return this.updateBullGroup.get('bullId')
  };

  getAllBulls() {
    this.bullsService.getAllBulls().subscribe((response) => {
      this.bulls = response.data;
    })
  }

  createUpdateBullForm() {
    this.updateBullGroup = this.formBuilder.group({
      id: [''],
      bullId: ['', Validators.required],
      age: [''],
      bullName: [''],
      weight: ['']
    });
  }




  openModal(template: TemplateRef<any>) {
    if (!this.updateBullGroup.valid) { return }

    this.modalRef = this.modalService.show(template, { class: 'modal-dialog-centered' })
  }



  updateBull() {
    let updateCowModel: Bull = { ...this.updateBullGroup.value };

    this.bullsService.updateBull(updateCowModel).subscribe((response) => {
      this.toastrService.success(response.message, "Succes", { positionClass: 'toast-bottom-right' });

      //After success load bulls again (Temporary, needs to be async)
      this.getAllBulls();

    }, (responseError) => {
      this.toastrService.error(responseError.message, "Error", { positionClass: 'toast-bottom-right' });
    })
  }

}
