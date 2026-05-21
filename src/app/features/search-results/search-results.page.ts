import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { map, switchMap } from 'rxjs';
import { SearchService } from '../../core/services/search.service';
import { ArtworkCardComponent } from '../../shared/components/artwork-card/artwork-card.component';
import { EmptyStateComponent } from '../../shared/components/empty-state/empty-state.component';
import { SectionHeaderComponent } from '../../shared/components/section-header/section-header.component';
import { SkeletonGalleryComponent } from '../../shared/components/skeleton-gallery/skeleton-gallery.component';

@Component({
  selector: 'app-search-results-page',
  standalone: true,
  imports: [AsyncPipe, RouterLink, ArtworkCardComponent, EmptyStateComponent, SectionHeaderComponent, SkeletonGalleryComponent],
  templateUrl: './search-results.page.html',
  styleUrl: './search-results.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchResultsPage {
  private readonly route = inject(ActivatedRoute);
  private readonly search = inject(SearchService);

  readonly criteria$ = this.route.queryParamMap.pipe(
    map((params) => ({
      query: params.get('q') ?? 'art',
      departmentId: params.get('departmentId') ? Number(params.get('departmentId')) : undefined,
      hasImages: true
    }))
  );

  readonly results$ = this.criteria$.pipe(
    switchMap((criteria) => this.search.search(criteria, 48))
  );
}
