import { Component, OnInit, inject } from '@angular/core';
import { ViewService } from './view.service';
import { ViewMode } from './view-mode.enum';

@Component({
  selector: 'app-view-switcher',
  templateUrl: './view-switcher.component.html',
  styleUrls: ['./view-switcher.component.scss'],
})
export class ViewSwitcherComponent implements OnInit {
  viewMode: ViewMode = ViewMode.Cards;

  viewService = inject(ViewService);

  ngOnInit(): void {
    this.viewService.viewMode$.subscribe((mode) => {
      this.viewMode = mode;
    });
  }

  setViewMode(mode: ViewMode): void {
    this.viewService.setViewMode(mode);
  }
}
