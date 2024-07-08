import { Component, Input, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Modals } from '../modal/modals.enum';

@Component({
  selector: 'app-not-found-modal[text]',
  templateUrl: './not-found-modal.component.html',
  styleUrls: ['./not-found-modal.component.scss'],
})
export class NotFoundModalComponent {
  @Input() text!: string;

  readonly modalId = Modals.NotFound;

  private readonly router = inject(Router);

  redirectToMainPage(): void {
    this.router.navigateByUrl('');
  }
}
