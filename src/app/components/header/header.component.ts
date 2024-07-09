import { Component, inject } from '@angular/core';
import { Observable, debounceTime, distinctUntilChanged } from 'rxjs';
import { ModalService } from '../../shared/components/modal/modal.service';
import { Modals } from '../../shared/components/modal/modals.enum';
import { Community } from '../../shared/models/community.model';
import { AuthService } from '../../shared/services/auth.service';
import { CommunitiesService } from '../../shared/services/communities.service';
import { UserService } from '../../shared/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  search = '';

  searchResults$: Observable<Community[]> | undefined;

  private readonly userService = inject(UserService);

  readonly user$ = this.userService.user$;

  private readonly modalService = inject(ModalService);

  private readonly authService = inject(AuthService);

  private readonly communitiesService = inject(CommunitiesService);

  onSearchChange(query: string): void {
    this.searchResults$ = this.communitiesService
      .searchCommunities(query.trim())
      .pipe(debounceTime(300), distinctUntilChanged());
  }

  resetSearch(): void {
    this.search = '';
  }

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
