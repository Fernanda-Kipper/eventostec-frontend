import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  searchTerm: string = '';
  debounceTimeout: ReturnType<typeof setTimeout> | undefined;

  @Output() searchTermChange: EventEmitter<string> = new EventEmitter<string>();

  onSearchTerm(event: KeyboardEvent) {
    clearTimeout(this.debounceTimeout);
    const target = event.target as HTMLInputElement;

    this.debounceTimeout = setTimeout(() => {
      this.searchTerm = target.value;
      this.searchTermChange.emit(this.searchTerm);
    }, 1000);
  }
}
