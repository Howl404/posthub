import { Component, inject, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
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
export class SidebarComponent implements OnInit {
  private readonly userService = inject(UserService);

  private readonly communitiesService = inject(CommunitiesService);

  private readonly modalService = inject(ModalService);

  communities$: Observable<Community[]> | null;

  user: User | null;

  ngOnInit(): void {
    this.userService.user$.subscribe((user) => {
      this.user = user;
      if (user) {
        this.communities$ = this.communitiesService.getUserCommunities(user);
      }
    });
  }

  onCreateCommunity(): void {
    this.modalService.open(Modals.CreateCommunity);
  }
}
