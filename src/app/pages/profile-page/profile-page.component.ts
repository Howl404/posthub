import { Component, inject } from '@angular/core';
import { map, Observable, switchMap } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../shared/services/user.service';
import { Modals } from '../../shared/components/modal/modals.enum';
import { filterWithSideEffect } from '../../utils/filterWithSideEffect';
import { ModalService } from '../../shared/components/modal/modal.service';
import { CommunitiesService } from '../../shared/services/communities.service';
import { PostsService } from '../../shared/services/posts.service';
import { postsTableHeaders } from '../main-page/main-page.component';
import { ViewService } from '../../shared/components/view-switcher/view.service';
import { ViewMode } from '../../shared/components/view-switcher/view-mode.enum';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss'],
})
export class ProfilePageComponent {
  readonly headers = postsTableHeaders;

  viewService = inject(ViewService);

  readonly viewMode$: Observable<ViewMode> = this.viewService.viewMode$;

  userService = inject(UserService);

  route = inject(ActivatedRoute);

  modalService = inject(ModalService);

  communitiesService = inject(CommunitiesService);

  postsService = inject(PostsService);

  user$ = this.route.paramMap.pipe(
    map((params) => params.get('name') || ''),
    switchMap((name) => this.userService.getUserByName(name)),
    filterWithSideEffect(
      (value) => !!value,
      () => this.modalService.open(Modals.NotFound),
    ),
  );

  communities$ = this.user$.pipe(
    switchMap((user) => this.communitiesService.getUserCommunities(user)),
  );

  posts$ = this.user$.pipe(
    switchMap((user) => this.postsService.getPostsByAuthorName(user.name, 999, 0)),
  );
}
