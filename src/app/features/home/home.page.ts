import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { combineLatest, map } from 'rxjs';
import { ArtworkService } from '../../core/services/artwork.service';
import { CollectionService } from '../../core/services/collection.service';
import { ArtworkCardComponent } from '../../shared/components/artwork-card/artwork-card.component';
import { SectionHeaderComponent } from '../../shared/components/section-header/section-header.component';
import { SkeletonGalleryComponent } from '../../shared/components/skeleton-gallery/skeleton-gallery.component';
import { ArtworkImagePipe } from '../../shared/pipes/artwork-image.pipe';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [AsyncPipe, RouterLink, ArtworkCardComponent, SectionHeaderComponent, SkeletonGalleryComponent, ArtworkImagePipe],
  templateUrl: './home.page.html',
  styleUrl: './home.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomePage {
  private readonly artworks = inject(ArtworkService);
  private readonly collections = inject(CollectionService);

  readonly vm$ = combineLatest([
    this.collections.homeHero(),
    this.artworks.featuredArtworks()
  ]).pipe(
    map(([hero, featured]) => ({
      hero,
      featured: featured.filter((item) => item.objectID !== hero.objectID).slice(0, 8),
      collections: this.collections.collections
    }))
  );

  trackArtwork(_index: number, artwork: { objectID: number }): number {
    return artwork.objectID;
  }
}
