import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, HostListener, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { BehaviorSubject, shareReplay, switchMap } from 'rxjs';
import { SearchCriteria } from '../../core/models/met-api.models';
import { DepartmentService } from '../../core/services/department.service';
import { SearchService } from '../../core/services/search.service';
import { ArtworkCardComponent } from '../../shared/components/artwork-card/artwork-card.component';
import { EmptyStateComponent } from '../../shared/components/empty-state/empty-state.component';
import { SectionHeaderComponent } from '../../shared/components/section-header/section-header.component';
import { SkeletonGalleryComponent } from '../../shared/components/skeleton-gallery/skeleton-gallery.component';

@Component({
  selector: 'app-discover-page',
  standalone: true,
  imports: [AsyncPipe, ReactiveFormsModule, ArtworkCardComponent, EmptyStateComponent, SectionHeaderComponent, SkeletonGalleryComponent],
  templateUrl: './discover.page.html',
  styleUrl: './discover.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DiscoverPage {
  private readonly fb = inject(FormBuilder);
  private readonly search = inject(SearchService);
  private readonly departments = inject(DepartmentService);
  private readonly criteria$ = new BehaviorSubject<SearchCriteria>({ query: 'painting', hasImages: true });

  readonly visibleCount = signal(18);
  readonly form = this.fb.nonNullable.group({
    query: 'painting',
    departmentId: '',
    artistOrCulture: false
  });

  readonly departments$ = this.departments.getDepartments();
  readonly results$ = this.criteria$.pipe(
    switchMap((criteria) => this.search.search(criteria, 72)),
    shareReplay({ bufferSize: 1, refCount: true })
  );

  searchCollection(): void {
    const value = this.form.getRawValue();
    this.visibleCount.set(18);
    this.criteria$.next({
      query: value.query,
      departmentId: value.departmentId ? Number(value.departmentId) : undefined,
      artistOrCulture: value.artistOrCulture,
      hasImages: true
    });
  }

  loadMore(): void {
    this.visibleCount.update((count) => count + 12);
  }

  @HostListener('window:scroll')
  onScroll(): void {
    const threshold = 680;
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - threshold) {
      this.loadMore();
    }
  }
}
