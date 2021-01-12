import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  dynamicFlag = false;
  dynamicCSSUrl: string = '';

  constructor(route: ActivatedRoute, public sanitizer: DomSanitizer, private http: HttpClient ) {
    route.params.subscribe(params => {
      this.dynamicCSSUrl = '/assets/styles/' + params.styles;
      console.log(params);
      
      
    });
  }

  ngOnInit() {
    
    if (this.dynamicCSSUrl) {
        this.dynamicFlag = true;
    }
    
  }

  // ngAfterViewInit() {
  //   setTimeout(() => {
  //     if (this.dynamicCSSUrl) {
  //     this.getJSON().subscribe(data => {
  //       console.log(data);
  //       this.dynamicFlag = true;
  //       this.selectTheme(data);
  //      });
  //   }
  //   }, 500);
  // }

  // selectTheme(data: any) {
  //   let root = document.documentElement;
  //   data.forEach((element: any) => {
  //     root.style.setProperty(element.name, element.valor);
  //     console.log(element);
      
  //   });
  // }

  // public getJSON(): Observable<any> {
  //   return this.http.get(this.dynamicCSSUrl);
  // }

}
