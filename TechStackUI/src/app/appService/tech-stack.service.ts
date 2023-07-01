import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TechStackService<T>{
  private baseUrl = 'https://localhost:7097/api/'; // Replace with your API base URL

  constructor(private http: HttpClient) { }

  getAll(endpoint: string): Observable<T[]> {
    return this.http.get<T[]>(this.baseUrl+endpoint);
  }

  getById(endpoint: string, id: number): Observable<T> {
    return this.http.get<T>(this.baseUrl+`${endpoint}/${id}`);
  }

  create(endpoint: string, item: T): Observable<T> {

    return this.http.post<T>(this.baseUrl+endpoint, item);
  }

  update(endpoint: string, id: number, item: T): Observable<T> {

    return this.http.put<T>(this.baseUrl+`${endpoint}/${id}`, item);
  }

  delete(endpoint: string, id: number): Observable<any> {
    return this.http.delete(this.baseUrl+`${endpoint}/${id}`);
  }

}
