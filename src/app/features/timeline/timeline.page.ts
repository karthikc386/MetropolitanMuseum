import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { switchMap } from 'rxjs';
import { CollectionService } from '../../core/services/collection.service';
import { SearchService } from '../../core/services/search.service';
import { ArtworkCardComponent } from '../../shared/components/artwork-card/artwork-card.component';
import { SectionHeaderComponent } from '../../shared/components/section-header/section-header.component';

@Component({
  selector: 'app-timeline-page',
  standalone: true,
  imports: [AsyncPipe, ArtworkCardComponent, SectionHeaderComponent],
  templateUrl: './timeline.page.html',
  styleUrl: './timeline.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TimelinePage {
  private readonly collections = inject(CollectionService);
  private readonly search = inject(SearchService);

  readonly periods = this.collections.timelinePeriods;
  readonly activeIndex = signal(0);
  readonly activePeriod = computed(() => this.periods[this.activeIndex()] ?? this.periods[0]);
  readonly artworks$ = toObservable(this.activePeriod).pipe(
    switchMap((period) => this.search.search({
      query: period.query,
      dateBegin: period.dateBegin,
      dateEnd: period.dateEnd,
      hasImages: true
    }, 16))
  );
}
