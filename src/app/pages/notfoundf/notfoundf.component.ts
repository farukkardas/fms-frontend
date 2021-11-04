import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-notfoundf',
  templateUrl: './notfoundf.component.html',
  styleUrls: ['./notfoundf.component.css']
})
export class NotfoundfComponent implements OnInit,AfterViewInit {
  
  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    setTimeout(()=>this.router.navigateByUrl(''),5000)
  }
}
