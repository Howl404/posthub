import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { first, map, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { CommunitiesService } from '../../shared/services/communities.service';
import { Community } from '../../shared/models/community.model';
import { ModalService } from '../../shared/components/modal/modal.service';
import { Post } from '../../shared/models/post.model';
import { PostsService } from '../../shared/services/posts.service';
import { ViewService } from '../../shared/components/view-switcher/view.service';
import { postsTableHeaders } from '../main-page/main-page.component';
import { ViewMode } from '../../shared/components/view-switcher/view-mode.enum';
import { User } from '../../shared/models/user.model';
import { UserService } from '../../shared/services/user.service';
import { filterWithSideEffect } from '../../utils/filterWithSideEffect';
import { Modals } from '../../shared/components/modal/modals.enum';

@Component({
  selector: 'app-community-page',
  templateUrl: './community-page.component.html',
  styleUrls: ['./community-page.component.scss'],
})
export class CommunityPageComponent implements OnInit {
  communityData$: Observable<Community> | undefined;

  posts$: Observable<Post[]> | undefined;

  readonly headers = postsTableHeaders;

  private readonly route = inject(ActivatedRoute);

  private readonly communitiesService = inject(CommunitiesService);

  private readonly postsService = inject(PostsService);

  private readonly modalService = inject(ModalService);

  private readonly viewService = inject(ViewService);

  private readonly userService = inject(UserService);

  readonly user$: Observable<User> = this.userService.user$;

  readonly viewMode$: Observable<ViewMode> = this.viewService.viewMode$;

  ngOnInit(): void {
    this.communityData$ = this.route.paramMap.pipe(
      map((params) => params.get('name') || ''),
      switchMap((name) => this.communitiesService.getCommunityByName(name)),
      filterWithSideEffect(
        (value) => !!value,
        () => this.modalService.open(Modals.NotFound),
      ),
    );

    this.communityData$.pipe(first()).subscribe((communityData) => {
      this.posts$ = this.postsService.getPostsByLocationId(communityData.id, 20, 0);
    });
  }

  onCreatePost(): void {
    this.modalService.open(Modals.CreatePost);
  }

  onEditCommunity(): void {
    this.modalService.open(Modals.EditCommunity);
  }

  onJoinCommunity(communityId: string, userData: User): void {
    this.userService.joinCommunity(communityId, userData.id, userData);
  }

  onLeaveCommunity(communityId: string, userData: User): void {
    this.userService.leaveCommunity(communityId, userData.id, userData);
  }

  onNonAuthorized(): void {
    this.modalService.open(Modals.LogIn);
  }
}
