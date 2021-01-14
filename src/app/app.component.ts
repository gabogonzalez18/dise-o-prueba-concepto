import { Component, OnInit, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { StrapiService } from './services/strapi/strapi.service';
import { DomSanitizer, Meta, Title } from '@angular/platform-browser';
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

  constructor(
    private strapi: StrapiService, 
    public sanitizer: DomSanitizer, 
    @Inject(DOCUMENT) private document: any,
    private titleService: Title, 
    private metaService: Meta) {
    this.host = this.document.location.host;
     console.log(this.document.location.host);
  }

  ngOnInit(): void {
    this.getInfoStrapi();
    this.getDefaultInfo();
    this.getStyles();
  }

  getInfoStrapi() {
    this.strapi.getInfo().subscribe((res: any) => {
      localStorage.setItem('info-strapi', JSON.stringify(res[0]));
      this.setMetaTags(res[0].metadata[0]);
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

  setMetaTags(meta: any) {
    this.titleService.setTitle(meta.tituloseo);
    this.metaService.updateTag({property: 'og:title', content: meta.tituloseo}, "property='og:title'");
    this.metaService.updateTag({name: 'description', content: meta.descripcionseo});
    this.metaService.updateTag({property: 'og:description', content: meta.descripcionseo}, "property='og:description'");
    this.metaService.updateTag({property: 'og:url', content: meta.url});
    this.updateCanonicalUrl(meta.url);

  }

  updateCanonicalUrl(url:string){
    const head = this.document.getElementsByTagName('head')[0];
    var element: HTMLLinkElement= this.document.querySelector(`link[rel='canonical']`) || null
    if (element==null) {
      element= this.document.createElement('link') as HTMLLinkElement;
      head.appendChild(element);
    }
    element.setAttribute('rel','canonical')
    element.setAttribute('href',url)
  }
}
