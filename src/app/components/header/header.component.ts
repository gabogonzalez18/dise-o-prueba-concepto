import { AfterViewChecked, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import defaultInfo from '../../../assets/json/defaultInfo.json';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, AfterViewChecked {

  informationCms: any;
  infoDefault = defaultInfo;
  headerInfo: any;


  constructor(private cdRef: ChangeDetectorRef ) {
    this.headerInfo = this.infoDefault.header[0];
   }

  ngOnInit(): void {
  }

  ngAfterViewChecked(): void {
    this.getDataCMS();
    this.cdRef.detectChanges(); 
  }

  getDataCMS() {
    this.informationCms = localStorage.getItem('info-strapi');

    if (this.informationCms) {
      this.informationCms = JSON.parse(this.informationCms);
      this.headerInfo = this.informationCms.header[0];
    }
  }
}
