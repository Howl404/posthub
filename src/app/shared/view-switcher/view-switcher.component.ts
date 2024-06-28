import { Component, OnInit, inject } from '@angular/core';
import { ViewService } from './view.service';

@Component({
  selector: 'app-view-switcher',
  templateUrl: './view-switcher.component.html',
  styleUrls: ['./view-switcher.component.scss'],
})
export class ViewSwitcherComponent implements OnInit {
  viewMode = 0;

  viewService = inject(ViewService);

  ngOnInit(): void {
    this.viewService.viewMode$.subscribe((mode) => {
      this.viewMode = mode;
    });
  }

  setViewMode(mode: number): void {
    this.viewService.setViewMode(mode);
  }
}
