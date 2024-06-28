import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ViewMode } from './view-mode.enum';

@Injectable({
  providedIn: 'root',
})
export class ViewService {
  private viewModeSubject = new BehaviorSubject<ViewMode>(ViewMode.Cards);

  viewMode$: Observable<number> = this.viewModeSubject.asObservable();

  setViewMode(mode: number): void {
    this.viewModeSubject.next(mode);
  }
}
