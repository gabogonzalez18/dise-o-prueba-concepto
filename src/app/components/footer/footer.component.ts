import { AfterViewChecked, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import defaultInfo from '../../../assets/json/defaultInfo.json';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit, AfterViewChecked {

  informationCms: any;
  infoDefault = defaultInfo;
  footerInfo: any;

  constructor(private cdRef: ChangeDetectorRef) { 
    this.footerInfo = this.infoDefault.footer;
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
      this.footerInfo = this.informationCms.footer;
    }
  }

}
