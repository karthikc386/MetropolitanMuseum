import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ShellComponent } from './layouts/shell/shell.component';

@Component({
  selector: 'app-root',
  imports: [ShellComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class App {
}
