import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { map, switchMap } from 'rxjs';
import { ArtworkService } from '../../core/services/artwork.service';
import { ArtworkCardComponent } from '../../shared/components/artwork-card/artwork-card.component';
import { SkeletonGalleryComponent } from '../../shared/components/skeleton-gallery/skeleton-gallery.component';
import { ArtworkImagePipe } from '../../shared/pipes/artwork-image.pipe';

@Component({
  selector: 'app-artwork-details-page',
  standalone: true,
  imports: [AsyncPipe, RouterLink, ArtworkCardComponent, SkeletonGalleryComponent, ArtworkImagePipe],
  templateUrl: './artwork-details.page.html',
  styleUrl: './artwork-details.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ArtworkDetailsPage {
  private readonly route = inject(ActivatedRoute);
  private readonly artworks = inject(ArtworkService);

  readonly artwork$ = this.route.paramMap.pipe(
    map((params) => Number(params.get('id'))),
    switchMap((id) => this.artworks.getArtwork(id))
  );

  readonly related$ = this.artwork$.pipe(
    switchMap((artwork) => this.artworks.searchArtworks({
      query: artwork.artistDisplayName || artwork.medium || artwork.department || 'art',
      departmentId: undefined,
      hasImages: true
    }, 8)),
    map((items) => items.slice(0, 6))
  );
}
