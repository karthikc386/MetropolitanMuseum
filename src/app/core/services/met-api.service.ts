import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, retry, timer } from 'rxjs';
import { environment } from '../../../environments/environment';

type QueryValue = string | number | boolean | undefined | null;

@Injectable({ providedIn: 'root' })
export class MetApiService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = environment.apiBaseUrl.replace(/\/$/, '');

  get<T>(endpoint: string, query: Record<string, QueryValue> = {}): Observable<T> {
    const params = Object.entries(query).reduce((httpParams, [key, value]) => {
      if (value === undefined || value === null || value === '') {
        return httpParams;
      }

      return httpParams.set(key, String(value));
    }, new HttpParams());

    return this.http.get<T>(`${this.baseUrl}/${endpoint.replace(/^\//, '')}`, { params }).pipe(
      retry({
        count: 2,
        delay: (_error, attempt) => timer(attempt * 350)
      })
    );
  }
}
