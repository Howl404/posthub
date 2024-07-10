import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, map, switchMap } from 'rxjs';
import { EChartsOption } from 'echarts';
import { PostsService } from '../../../shared/services/posts.service';
import { filterWithSideEffect } from '../../../utils/filterWithSideEffect';
import { ModalService } from '../../../shared/components/modal/modal.service';
import { Modals } from '../../../shared/components/modal/modals.enum';
import { Post } from '../../../shared/models/post.model';
import { UserService } from '../../../shared/services/user.service';
import { CommentsService } from '../../../shared/services/comments.service';
import { CommentDraft, Comment } from '../../../shared/models/comment.model';
import { Community } from '../../../shared/models/community.model';
import { CommunitiesService } from '../../../shared/services/communities.service';
import { User } from '../../../shared/models/user.model';
import { FormField } from '../../../shared/components/dynamic-form-field/form-field.model';

@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.scss'],
})
export class PostPageComponent implements OnInit {
  community$: Observable<Community> | undefined;

  post$: Observable<Post> | undefined;

  comments$: Observable<Comment[]> | undefined;

  comment = '';

  field: FormField = {
    name: 'comment',
    placeholder: 'Comment',
    type: 'textarea',
    model: 'comment',
    required: true,
    minLength: 10,
  };

  private readonly route = inject(ActivatedRoute);

  private readonly postService = inject(PostsService);

  private readonly modalService = inject(ModalService);

  private readonly userService = inject(UserService);

  private readonly commentsService = inject(CommentsService);

  private readonly communitiesService = inject(CommunitiesService);

  private readonly router = inject(Router);

  readonly user$ = this.userService.user$;

  ngOnInit(): void {
    this.community$ = this.route.paramMap.pipe(
      map((params) => params.get('name') || ''),
      switchMap((name) => this.communitiesService.getCommunityByName(name)),
      filterWithSideEffect(
        (value) => !!value,
        () => this.modalService.open(Modals.NotFound),
      ),
    );

    this.post$ = this.community$.pipe(
      map((community) => community.name || ''),
      switchMap(() =>
        this.route.paramMap.pipe(
          map((params) => params.get('postId') || ''),
          switchMap((id) =>
            this.postService.getPostById(id).pipe(
              filterWithSideEffect(
                (value) => !!value,
                () => this.modalService.open(Modals.NotFound),
              ),
            ),
          ),
        ),
      ),
    );

    this.comments$ = this.post$.pipe(
      switchMap((post) =>
        this.commentsService
          .getCommentsByLocationId(post.id, 20, 0)
          .pipe(map((data) => data.reverse())),
      ),
    );
  }

  onNonAuthorized(): void {
    this.modalService.open(Modals.LogIn);
  }

  returnCharts(post: Post): EChartsOption {
    const sortedUpvotes = post.upvotesByDay.sort((a, b) => a.date.getTime() - b.date.getTime());

    const categories = sortedUpvotes.map((upvote) => upvote.date.toDateString());

    const data = sortedUpvotes.map((upvote) => upvote.amount);

    return {
      xAxis: {
        type: 'category',
        data: categories,
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          data,
          type: 'line',
          smooth: true,
        },
      ],
    };
  }

  onAddComment(userName: string, post: Post): void {
    const commentDraft: CommentDraft = {
      author: userName,
      text: this.comment,
      location: post.id,
      date: new Date(),
    };

    this.comment = '';

    this.postService.updatePost(post.id, { commentsAmount: post.commentsAmount + 1 });
    this.commentsService.createComment(commentDraft);
  }

  onRemoveComment(commentId: string, post: Post): void {
    this.postService.updatePost(post.id, { commentsAmount: post.commentsAmount - 1 });
    this.commentsService.deleteComment(commentId);
  }

  onEdit(): void {
    this.modalService.open(Modals.EditPost);
  }

  onDelete(postId: string, communityName: string): void {
    // eslint-disable-next-line no-restricted-globals
    const isConfirmed = confirm('Are you sure?');
    if (isConfirmed) {
      this.router.navigate(['/r/', communityName]);
      this.postService.deletePost(postId);
      this.commentsService.deleteCommentsByLocationId(postId);
    }
  }

  checkUserAccess(user: User, post: Post, community: Community): boolean {
    if (post.authorName === user.name) {
      return true;
    }
    if (community.ownerId === user.id) {
      return true;
    }
    if (community.moderatorsNames.includes(user.name)) {
      return true;
    }

    return false;
  }

  canDeleteComment(user: User, community: Community, comment: Comment): boolean {
    if (community.ownerId === user.id) {
      return true;
    }
    if (community.moderatorsNames.includes(user.name)) {
      return true;
    }
    if (comment.author === user.name) {
      return true;
    }
    return false;
  }
}
