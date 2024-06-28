import { Component, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '@angular/fire/auth';
import { ModalService } from '../../shared/modal/modal.service';
import { Modals } from '../../shared/modal/modals.enum';
import { AuthService } from '../../shared/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  private readonly modalService = inject(ModalService);

  private readonly authService = inject(AuthService);

  readonly user$: Observable<User> = this.authService.user$;

  onLogIn(): void {
    this.modalService.open(Modals.LogIn);
  }

  onSignUp(): void {
    this.modalService.open(Modals.SignUp);
  }

  onLogOut(): void {
    this.authService.logOut();
  }
}
