import { Component, inject, Input } from '@angular/core';
import { ModalService } from '../../../../shared/components/modal/modal.service';
import { Modals } from '../../../../shared/components/modal/modals.enum';
import { Post } from '../../../../shared/models/post.model';
import { PostsService } from '../../../../shared/services/posts.service';
import { UserService } from '../../../../shared/services/user.service';
import { User } from '../../../../shared/models/user.model';

@Component({
  selector: 'app-upvote[post]',
  templateUrl: './upvote.component.html',
  styleUrls: ['./upvote.component.scss'],
})
export class UpvoteComponent {
  @Input() post!: Post;

  private readonly postService = inject(PostsService);

  private readonly modalService = inject(ModalService);

  private readonly userService = inject(UserService);

  readonly user$ = this.userService.user$;

  onNonAuthorized(): void {
    this.modalService.open(Modals.LogIn);
  }

  onUpvote(user: User, post: Post): void {
    this.postService.upvotePost(post);
    this.postService.addUpvotedPost(user.id, post.id);
  }

  onDownvote(user: User, post: Post): void {
    this.postService.downvotePost(post);
    this.postService.removeUpvotedPost(user.id, post.id);
  }
}
