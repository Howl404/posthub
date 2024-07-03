import { Component, inject } from '@angular/core';
import { ModalService } from '../../shared/components/modal/modal.service';
import { UserService } from '../../shared/services/user.service';
import { Modals } from '../../shared/components/modal/modals.enum';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  userService = inject(UserService);

  user$ = this.userService.user$;

  private readonly modalService = inject(ModalService);

  private readonly authService = inject(AuthService);

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
