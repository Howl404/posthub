import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { CommunitiesService } from '../../shared/communities.service';
import { Community } from '../../community.model';
import { ModalService } from '../../shared/modal/modal.service';
import { Post } from '../../post.model';
import { PostsService } from '../../shared/posts.service';
import { ViewService } from '../../shared/view-switcher/view.service';
import { postsTableHeaders } from '../main-page/main-page.component';
import { ViewMode } from '../../shared/view-switcher/view-mode.enum';

@Component({
  selector: 'app-community-page',
  templateUrl: './community-page.component.html',
  styleUrls: ['./community-page.component.scss'],
})
export class CommunityPageComponent implements OnInit {
  communityData: Community | undefined;

  posts: Observable<Post[]> | undefined;

  readonly headers = postsTableHeaders;

  private readonly route = inject(ActivatedRoute);

  private readonly router = inject(Router);

  private readonly communitiesService = inject(CommunitiesService);

  private readonly postsService = inject(PostsService);

  private readonly modalService = inject(ModalService);

  private readonly viewService = inject(ViewService);

  readonly viewMode$: Observable<ViewMode> = this.viewService.viewMode$;

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        switchMap((params) => {
          const name = params.get('name') || '';
          return this.communitiesService.getCommunityByName(name);
        }),
      )
      .subscribe((communityData) => {
        if (communityData) {
          this.communityData = communityData;
          this.posts = this.postsService.getPostsByLocationId(communityData.id, 20, 0);
        } else {
          this.modalService.open('community-not-found');
        }
      });
  }

  redirectToMainPage(): void {
    this.router.navigateByUrl('');
  }
}
