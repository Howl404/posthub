import { Component, inject } from '@angular/core';
import { ModalService } from '../../shared/modal/modal.service';
import { UserService } from '../../shared/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  userService = inject(UserService);

  user$ = this.userService.user$;

  constructor(public modalService: ModalService) {}
}
