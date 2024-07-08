import { Component, inject } from '@angular/core';
import { ViewService } from './view.service';
import { ViewMode } from './view-mode.enum';

@Component({
  selector: 'app-view-switcher',
  templateUrl: './view-switcher.component.html',
  styleUrls: ['./view-switcher.component.scss'],
})
export class ViewSwitcherComponent {
  viewService = inject(ViewService);

  viewMode$ = this.viewService.viewMode$;

  setViewMode(mode: ViewMode): void {
    this.viewService.setViewMode(mode);
  }
}
