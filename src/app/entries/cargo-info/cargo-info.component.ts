import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-cargo-info',
  templateUrl: './cargo-info.component.html',
  styleUrls: ['./cargo-info.component.css']
})
export class CargoInfoComponent implements OnInit {
  cargoId :number;
  constructor(@Inject(MAT_DIALOG_DATA) public data: number) { }

  ngOnInit(): void {
    this.cargoId = this.data;
    console.log(this.cargoId)
  }

}
