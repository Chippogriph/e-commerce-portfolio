import { Component } from '@angular/core';
import { SiteHeaderComponent } from '../site-header/site-header.component';
import { FooterComponent } from '../footer/footer.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-public-layout',
  imports: [SiteHeaderComponent, FooterComponent, RouterModule],
  templateUrl: './public-layout.component.html',
  styleUrl: './public-layout.component.css',
})
export class PublicLayoutComponent {}
