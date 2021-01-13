import { Component, OnInit, ChangeDetectorRef, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  data: any;
  @Inject(DOCUMENT) document: any
  constructor(private cdRef: ChangeDetectorRef, public sanitizer: DomSanitizer) { 
    this.data = localStorage.getItem('default-info');
    console.log('constructor: ', this.data);
    
    this.convertInfo();
  }

  ngOnInit(): void {

  }

  ngAfterViewChecked() {
    this.getData();
    this.cdRef.detectChanges();
  }

  getData() {
    if (localStorage.getItem('info-strapi')) {
      this.data = localStorage.getItem('info-strapi');
       this.convertInfo();

    console.log('ingresa acá');
    }
    
  }

  convertInfo() {
    const obj  = JSON.parse(this.data).body[0];
    console.log('obj: ', obj);
    
    this.data = {content: obj.content[0] , side: obj.side[0] }
    console.log('data: ', this.data);
  }
}
