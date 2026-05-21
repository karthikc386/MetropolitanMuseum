import { Injectable, inject } from '@angular/core';
import { Observable, catchError, forkJoin, map, of, shareReplay, switchMap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { MetArtwork, MetSearchResponse, SearchCriteria } from '../models/met-api.models';
import { MetApiService } from './met-api.service';

const FEATURED_IDS = [437853, 436535, 459055, 436121, 544700, 435809, 438815, 459193, 436105, 437133];
const DAILY_IDS = [436535, 437853, 459055, 436121, 544700, 435809, 438815, 459193, 436105, 437133, 436524, 438817];

interface CacheEntry<T> {
  createdAt: number;
  value$: Observable<T>;
}

@Injectable({ providedIn: 'root' })
export class ArtworkService {
  private readonly api = inject(MetApiService);
  private readonly objectCache = new Map<number, CacheEntry<MetArtwork>>();

  getArtwork(id: number): Observable<MetArtwork> {
    const cached = this.objectCache.get(id);
    if (cached && Date.now() - cached.createdAt < environment.cacheTtlMs) {
      return cached.value$;
    }

    const value$ = this.api.get<MetArtwork>(`objects/${id}`).pipe(
      shareReplay({ bufferSize: 1, refCount: true })
    );
    this.objectCache.set(id, { createdAt: Date.now(), value$ });
    return value$;
  }

  getArtworks(ids: number[], limit = 24): Observable<MetArtwork[]> {
    const uniqueIds = [...new Set(ids)].slice(0, limit);
    if (!uniqueIds.length) {
      return of([]);
    }

    return forkJoin(
      uniqueIds.map((id) => this.getArtwork(id).pipe(catchError(() => of(null))))
    ).pipe(
      map((artworks) => artworks.filter((artwork): artwork is MetArtwork => Boolean(artwork)))
    );
  }

  searchIds(criteria: SearchCriteria): Observable<number[]> {
    return this.api.get<MetSearchResponse>('search', {
      q: criteria.query || 'art',
      departmentId: criteria.departmentId,
      artistOrCulture: criteria.artistOrCulture,
      dateBegin: criteria.dateBegin,
      dateEnd: criteria.dateEnd,
      hasImages: criteria.hasImages ?? true,
      isHighlight: criteria.isHighlight
    }).pipe(
      map((response) => response.objectIDs ?? []),
      catchError(() => of([]))
    );
  }

  searchArtworks(criteria: SearchCriteria, limit = 24): Observable<MetArtwork[]> {
    return this.searchIds(criteria).pipe(
      switchMap((ids) => this.getArtworks(ids, limit))
    );
  }

  featuredArtworks(): Observable<MetArtwork[]> {
    return this.getArtworks(FEATURED_IDS, FEATURED_IDS.length);
  }

  dailyArtwork(date = new Date()): Observable<MetArtwork> {
    const dayKey = Math.floor(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) / 86400000);
    const id = DAILY_IDS[dayKey % DAILY_IDS.length] ?? DAILY_IDS[0];
    return this.getArtwork(id);
  }
}
