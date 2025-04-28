import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-accordion',
  imports: [CommonModule],
  templateUrl: './accordion.component.html',
  styleUrl: './accordion.component.css'
})
export class AccordionComponent {
  @Input() title: string = '';
  isOpen: boolean = false;

  toggleAccordion(): void {
    this.isOpen = !this.isOpen;
  }
}
