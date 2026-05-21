import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ArtworkService } from '../../core/services/artwork.service';
import { SkeletonGalleryComponent } from '../../shared/components/skeleton-gallery/skeleton-gallery.component';
import { ArtworkImagePipe } from '../../shared/pipes/artwork-image.pipe';

@Component({
  selector: 'app-daily-artwork-page',
  standalone: true,
  imports: [AsyncPipe, RouterLink, SkeletonGalleryComponent, ArtworkImagePipe],
  templateUrl: './daily-artwork.page.html',
  styleUrl: './daily-artwork.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DailyArtworkPage {
  readonly artwork$ = inject(ArtworkService).dailyArtwork();
}
