import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  data: any;

  constructor(private cdRef: ChangeDetectorRef) { 
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
