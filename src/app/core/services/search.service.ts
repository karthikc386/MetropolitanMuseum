import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { MetArtwork, SearchCriteria } from '../models/met-api.models';
import { ArtworkService } from './artwork.service';

@Injectable({ providedIn: 'root' })
export class SearchService {
  private readonly artworks = inject(ArtworkService);

  search(criteria: SearchCriteria, limit = 36): Observable<MetArtwork[]> {
    return this.artworks.searchArtworks({
      hasImages: true,
      ...criteria,
      query: criteria.query.trim() || 'painting'
    }, limit);
  }
}
