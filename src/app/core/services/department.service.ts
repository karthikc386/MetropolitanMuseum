import { Injectable, inject } from '@angular/core';
import { Observable, shareReplay } from 'rxjs';
import { MetDepartment, MetDepartmentsResponse } from '../models/met-api.models';
import { MetApiService } from './met-api.service';

@Injectable({ providedIn: 'root' })
export class DepartmentService {
  private readonly api = inject(MetApiService);
  private readonly departments$ = this.api.get<MetDepartmentsResponse>('departments').pipe(
    shareReplay({ bufferSize: 1, refCount: true })
  );

  getDepartments(): Observable<MetDepartment[]> {
    return new Observable<MetDepartment[]>((subscriber) => {
      const subscription = this.departments$.subscribe({
        next: (response) => subscriber.next(response.departments),
        error: (error) => subscriber.error(error),
        complete: () => subscriber.complete()
      });

      return () => subscription.unsubscribe();
    });
  }
}
