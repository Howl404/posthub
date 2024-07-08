import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, first, map, switchMap, tap } from 'rxjs';
import { EChartsOption } from 'echarts';
import { PostsService } from '../../../shared/services/posts.service';
import { filterWithSideEffect } from '../../../utils/filterWithSideEffect';
import { ModalService } from '../../../shared/components/modal/modal.service';
import { Modals } from '../../../shared/components/modal/modals.enum';
import { Post } from '../../../shared/models/post.model';
import { UserService } from '../../../shared/services/user.service';
import { CommentsService } from '../../../shared/services/comments.service';
import { CommentDraft, Comment } from '../../../shared/models/comment.model';

@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.scss'],
})
export class PostPageComponent implements OnInit {
  communityName = '';

  post$: Observable<Post> | undefined;

  comments$: Observable<Comment[]> | undefined;

  comment = '';

  private readonly route = inject(ActivatedRoute);

  private readonly postService = inject(PostsService);

  private readonly modalService = inject(ModalService);

  private readonly userService = inject(UserService);

  private readonly commentsService = inject(CommentsService);

  readonly user$ = this.userService.user$;

  ngOnInit(): void {
    this.post$ = this.route.paramMap.pipe(
      tap((params) => {
        this.communityName = params.get('name') || '';
      }),
      map((params) => params.get('postId') || ''),
      switchMap((id) => this.postService.getPostById(id)),
      filterWithSideEffect(
        (value) => !!value,
        () => this.modalService.open(Modals.NotFound),
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

  onAddComment(userName: string, post: Post): void {
    const commentDraft: CommentDraft = {
      author: userName,
      text: this.comment,
      location: post.id,
      date: new Date(),
    };

    this.postService.updatePost(post.id, { commentsAmount: post.commentsAmount + 1 });
    this.commentsService.createComment(commentDraft).pipe(
      first(),
      map((commentId) => {
        this.userService.getUserByName(userName).pipe(
          first(),
          switchMap((user) =>
            this.userService.updateUser(user.id, { commentsId: [...user.commentsId, commentId] }),
          ),
        );
      }),
    );
  }

  onNonAuthorized(): void {
    this.modalService.open(Modals.LogIn);
  }

  onEdit(): void {
    this.modalService.open(Modals.EditPost);
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
}
