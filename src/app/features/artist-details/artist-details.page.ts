import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs';
import { SearchService } from '../../core/services/search.service';
import { ArtworkCardComponent } from '../../shared/components/artwork-card/artwork-card.component';
import { EmptyStateComponent } from '../../shared/components/empty-state/empty-state.component';
import { SectionHeaderComponent } from '../../shared/components/section-header/section-header.component';

@Component({
  selector: 'app-artist-details-page',
  standalone: true,
  imports: [AsyncPipe, ArtworkCardComponent, EmptyStateComponent, SectionHeaderComponent],
  templateUrl: './artist-details.page.html',
  styleUrl: './artist-details.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ArtistDetailsPage {
  private readonly route = inject(ActivatedRoute);
  private readonly search = inject(SearchService);

  readonly artistName$ = this.route.paramMap.pipe(map((params) => params.get('name') ?? 'Unknown artist'));
  readonly artworks$ = this.artistName$.pipe(
    switchMap((name) => this.search.search({ query: name, artistOrCulture: true, hasImages: true }, 48))
  );
}
