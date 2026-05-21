import { Pipe, PipeTransform } from '@angular/core';
import { MetArtwork } from '../../core/models/met-api.models';

@Pipe({
  name: 'artworkImage',
  standalone: true
})
export class ArtworkImagePipe implements PipeTransform {
  transform(artwork: MetArtwork | null | undefined): string {
    return artwork?.primaryImageSmall || artwork?.primaryImage || '';
  }
}
