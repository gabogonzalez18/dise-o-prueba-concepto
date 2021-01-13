import { Component, OnInit, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { StrapiService } from './services/strapi/strapi.service';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'DS-grid-angular';

  dynamicFlag = false;
  dynamicCSSUrl: string = '';
  host: any;

  constructor(private strapi: StrapiService, public sanitizer: DomSanitizer, @Inject(DOCUMENT) document: any) {
    this.host = document.location.host;
     console.log(document.location.host);
  }

  ngOnInit(): void {
    this.getInfoStrapi();
    this.getDefaultInfo();
    this.getStyles();
  }

  getInfoStrapi() {
    this.strapi.getInfo().subscribe((res: any) => {
      localStorage.setItem('info-strapi', JSON.stringify(res[0]));
    })
  }

  getDefaultInfo() {
    this.strapi.getDefault().subscribe((res: any) => {
      localStorage.setItem('default-info', JSON.stringify(res));
    });
  }

  getStyles() {
    const data:any = localStorage.getItem('info-strapi');
    const obj  = JSON.parse(data).styles[0];
    if (this.host == 'localhost:4200') {
      this.dynamicCSSUrl = '/assets/styles/' + obj.bolivar;
    } else {
      this.dynamicCSSUrl = '/assets/styles/' + obj.davivienda;
    }
    if (this.dynamicCSSUrl) {
      this.dynamicFlag = true;
    }
  }
}
