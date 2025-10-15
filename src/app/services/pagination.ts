// src/app/services/pagination.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.prod';

export interface PaginatedResponse<T> {
  fetchFiles: T[]; // match backend response
  pageNumber: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
  lastPage: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class PaginationService {
  private baseUrl = `${environment.BACKEND_URL}/api`; //

  constructor(private http: HttpClient) {}

  getPaginatedData<T>(
    endpoint: string,
    page: number,
    size: number
  ): Observable<PaginatedResponse<T>> {
    let params = new HttpParams().set('page', page.toString()).set('size', size.toString());

    return this.http.get<PaginatedResponse<T>>(`${this.baseUrl}/${endpoint}`, { params });
  }
}
