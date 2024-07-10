import { Component, inject } from '@angular/core';
import { filter, Observable, switchMap } from 'rxjs';
import { ModalService } from '../../shared/components/modal/modal.service';
import { Modals } from '../../shared/components/modal/modals.enum';
import { Community } from '../../shared/models/community.model';
import { CommunitiesService } from '../../shared/services/communities.service';
import { UserService } from '../../shared/services/user.service';
import { User } from '../../shared/models/user.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  private readonly userService = inject(UserService);

  private readonly communitiesService = inject(CommunitiesService);

  private readonly modalService = inject(ModalService);

  user$: Observable<User> | null = this.userService.user$;

  communities$: Observable<Community[]> | null = this.user$.pipe(
    filter((value) => !!value),
    switchMap((user) => this.communitiesService.getUserCommunities(user)),
  );

  onCreateCommunity(): void {
    this.modalService.open(Modals.CreateCommunity);
  }

  onNonAuthorized(): void {
    this.modalService.open(Modals.LogIn);
  }
}
