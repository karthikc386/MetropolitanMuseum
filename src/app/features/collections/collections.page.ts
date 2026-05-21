import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CollectionService } from '../../core/services/collection.service';
import { ArtworkCardComponent } from '../../shared/components/artwork-card/artwork-card.component';
import { SectionHeaderComponent } from '../../shared/components/section-header/section-header.component';

@Component({
  selector: 'app-collections-page',
  standalone: true,
  imports: [AsyncPipe, RouterLink, ArtworkCardComponent, SectionHeaderComponent],
  templateUrl: './collections.page.html',
  styleUrl: './collections.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CollectionsPage {
  readonly collectionService = inject(CollectionService);
}
