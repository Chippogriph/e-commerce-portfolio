import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '../../../enviroments/enviroments.prod';

@Pipe({
  name: 'fullImageUrl',
  standalone: true,
})
export class FullImageUrlPipe implements PipeTransform {
  transform(imageUrl: string | null | undefined): string {
    if (!imageUrl) return '';

    // Om det redan är en absolut URL (t.ex. från en extern källa), rör inte den
    if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
      return imageUrl;
    }

    return `${environment.apiUrl}${imageUrl}`;
  }
}