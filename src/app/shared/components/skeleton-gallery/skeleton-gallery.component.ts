import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-skeleton-gallery',
  standalone: true,
  templateUrl: './skeleton-gallery.component.html',
  styleUrl: './skeleton-gallery.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkeletonGalleryComponent {
  readonly count = input(8);
  readonly placeholders = Array.from({ length: 12 }, (_, index) => index);
}
