import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { routeTransition } from '../../animations/route-animations';
import { ApiErrorService } from '../../core/services/api-error.service';
import { ThemeService } from '../../core/services/theme.service';

@Component({
  selector: 'app-shell',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './shell.component.html',
  styleUrl: './shell.component.scss',
  animations: [routeTransition],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShellComponent {
  readonly theme = inject(ThemeService);
  readonly errors = inject(ApiErrorService);

  protected readonly links = [
    { label: 'Home', path: '/' },
    { label: 'Discover', path: '/discover' },
    { label: 'Collections', path: '/collections' },
    { label: 'Timeline', path: '/timeline' },
    { label: 'Daily', path: '/daily' }
  ];

  protected routeKey(outlet: RouterOutlet): string {
    if (!outlet.isActivated) {
      return 'initial';
    }

    return outlet.activatedRouteData['animation'] ?? outlet.activatedRoute?.routeConfig?.path ?? 'route';
  }
}
