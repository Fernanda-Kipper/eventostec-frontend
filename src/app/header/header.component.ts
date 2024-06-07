import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  EventEmitter,
  Output,
  ViewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  searchTerm: string = '';
  debounceTimeout: ReturnType<typeof setTimeout> | undefined;

  @Output() searchTermChange: EventEmitter<string> = new EventEmitter<string>();
  @ViewChild('searchbar') searchInput!: ElementRef;

  onSearchTerm(event: KeyboardEvent) {
    clearTimeout(this.debounceTimeout);
    const target = event.target as HTMLInputElement;

    this.debounceTimeout = setTimeout(() => {
      this.searchTerm = target.value;
      this.searchTermChange.emit(this.searchTerm);
    }, 1000);
  }
}
