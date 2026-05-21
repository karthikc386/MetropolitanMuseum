import { DOCUMENT } from '@angular/common';
import { Injectable, computed, effect, inject, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly document = inject(DOCUMENT);
  readonly darkMode = signal(true);
  readonly label = computed(() => this.darkMode() ? 'Dark mode' : 'Light mode');

  constructor() {
    effect(() => {
      this.document.documentElement.dataset['theme'] = this.darkMode() ? 'dark' : 'light';
    });
  }

  toggle(): void {
    this.darkMode.update((value) => !value);
  }
}
