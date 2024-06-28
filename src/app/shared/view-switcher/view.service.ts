import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ViewService {
  private viewModeSubject = new BehaviorSubject<number>(0);

  viewMode$: Observable<number> = this.viewModeSubject.asObservable();

  setViewMode(mode: number): void {
    this.viewModeSubject.next(mode);
  }
}
