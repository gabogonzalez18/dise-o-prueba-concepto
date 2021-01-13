import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { StrapiService } from './services/strapi/strapi.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'DS-grid-angular';

  constructor(private strapi: StrapiService) {
  }

  ngOnInit(): void {
    this.getInfoStrapi();
    this.getDefaultInfo();
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
}
