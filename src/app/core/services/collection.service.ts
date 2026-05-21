import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { CollectionFeature, MetArtwork, TimelinePeriod } from '../models/met-api.models';
import { ArtworkService } from './artwork.service';

@Injectable({ providedIn: 'root' })
export class CollectionService {
  private readonly artworks = inject(ArtworkService);

  readonly collections: CollectionFeature[] = [
    {
      eyebrow: 'European Paintings',
      title: 'Light, Gesture, Atmosphere',
      description: 'Painterly rooms of impression, motion, and late afternoon color.',
      query: { query: 'impressionism', departmentId: 11, hasImages: true }
    },
    {
      eyebrow: 'Asian Art',
      title: 'Ink, Porcelain, Silence',
      description: 'Objects where restraint, surface, and time carry the entire composition.',
      query: { query: 'landscape', departmentId: 6, hasImages: true }
    },
    {
      eyebrow: 'Arms and Armor',
      title: 'Ceremony and Precision',
      description: 'Polished steel, ritual protection, and engineered beauty.',
      query: { query: 'armor', departmentId: 4, hasImages: true }
    }
  ];

  readonly timelinePeriods: TimelinePeriod[] = [
    { label: 'Ancient', range: '3000 BCE - 500 CE', dateBegin: -3000, dateEnd: 500, query: 'sculpture' },
    { label: 'Medieval', range: '500 - 1400', dateBegin: 500, dateEnd: 1400, query: 'manuscript' },
    { label: 'Renaissance', range: '1400 - 1600', dateBegin: 1400, dateEnd: 1600, query: 'portrait' },
    { label: 'Modern', range: '1850 - 1950', dateBegin: 1850, dateEnd: 1950, query: 'painting' }
  ];

  collectionArtworks(collection: CollectionFeature, limit = 12): Observable<MetArtwork[]> {
    return this.artworks.searchArtworks(collection.query, limit);
  }

  homeHero(): Observable<MetArtwork> {
    return this.artworks.featuredArtworks().pipe(
      map((items) => items.find((item) => Boolean(item.primaryImage)) ?? items[0])
    );
  }
}
