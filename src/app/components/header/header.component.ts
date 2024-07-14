import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  searchTerm: string = '';
  debounceTimeout: ReturnType<typeof setTimeout> | undefined;

  @Input() showSearchBar = true;

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
