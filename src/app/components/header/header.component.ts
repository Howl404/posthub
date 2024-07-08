import { Component, inject } from '@angular/core';
import { Observable, debounceTime, distinctUntilChanged, of } from 'rxjs';
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
  userService = inject(UserService);

  user$ = this.userService.user$;

  search = '';

  private readonly modalService = inject(ModalService);

  private readonly authService = inject(AuthService);

  private readonly communitiesService = inject(CommunitiesService);

  searchResults$: Observable<Community[]> | undefined;

  onSearchChange(query: string): void {
    if (query.trim() !== '') {
      this.searchResults$ = this.communitiesService
        .searchCommunities(query)
        .pipe(debounceTime(300), distinctUntilChanged());
    } else {
      this.searchResults$ = of([]);
    }
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
