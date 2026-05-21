import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MetArtwork } from '../../../core/models/met-api.models';
import { ArtworkImagePipe } from '../../pipes/artwork-image.pipe';

@Component({
  selector: 'app-artwork-card',
  standalone: true,
  imports: [RouterLink, ArtworkImagePipe],
  templateUrl: './artwork-card.component.html',
  styleUrl: './artwork-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ArtworkCardComponent {
  readonly artwork = input.required<MetArtwork>();
  readonly priority = input(false);
}
