import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StrapiService {

  constructor(private http: HttpClient) { }

  getInfo(): Observable<any> {
    return this.http.get(environment.url);
  }

  getDefault(): Observable<any> {
    return this.http.get('/assets/json/defaultInfo.json');
  }
}
