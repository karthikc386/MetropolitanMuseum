import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ApiErrorService {
  readonly latestMessage = signal<string | null>(null);

  set(message: string): void {
    this.latestMessage.set(message);
  }

  clear(): void {
    this.latestMessage.set(null);
  }
}
