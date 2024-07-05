import { Component, inject, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UserService } from '../../shared/user.service';
import { User } from '../../user.model';
import { CommunitiesService } from '../../shared/communities.service';
import { Community } from '../../community.model';
import { ModalService } from '../../shared/modal/modal.service';
import { Modals } from '../../shared/modal/modals.enum';

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
