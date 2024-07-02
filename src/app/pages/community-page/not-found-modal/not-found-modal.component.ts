import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Modals } from '../../../shared/modal/modals.enum';

@Component({
  selector: 'app-not-found-modal',
  templateUrl: './not-found-modal.component.html',
  styleUrls: ['./not-found-modal.component.scss'],
})
export class NotFoundModalComponent {
  readonly modalId = Modals.CommunityNotFound;

  private readonly router = inject(Router);

  redirectToMainPage(): void {
    this.router.navigateByUrl('');
  }
}
