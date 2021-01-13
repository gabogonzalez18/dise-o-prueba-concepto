import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  informationCms: any;
  headerInfo: any;

  constructor() { }

  ngOnInit(): void {
    this.getDataCMS();
  }

  getDataCMS() {
    this.informationCms = localStorage.getItem('info-strapi');
    if (this.informationCms) {
      this.informationCms = JSON.parse(this.informationCms);
      this.headerInfo = this.informationCms.Header[0];
    } else {
      
    }
    
  }

}
