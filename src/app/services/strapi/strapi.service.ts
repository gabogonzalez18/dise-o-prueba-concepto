import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StrapiService {

  constructor(private http: HttpClient) { }

  getInfo() {
    this.http.get(environment.url).subscribe(res => {
      console.log(res);
    });
  }
}
