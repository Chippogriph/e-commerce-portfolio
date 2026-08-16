import { Component, Input } from '@angular/core';
import { FullImageUrlPipe } from '../../../shared/pipes/full-image-url.pipe';

@Component({
  selector: 'app-hero',
  imports: [FullImageUrlPipe],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css'
})
export class HeroComponent {
@Input() image = "";
@Input() heading = "";
@Input() companyname = "";
@Input() subheading = "";

}
