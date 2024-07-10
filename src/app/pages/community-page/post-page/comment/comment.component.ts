import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Comment } from '../../../../shared/models/comment.model';
import { CommentsService } from '../../../../shared/services/comments.service';
import { PostsService } from '../../../../shared/services/posts.service';

@Component({
  selector: 'app-comment[comment][canDeleteComment]',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss'],
})
export class CommentComponent {
  @Input() comment!: Comment;

  @Input() canDeleteComment!: boolean;

  @Output() delete = new EventEmitter<string>();

  commentsService = inject(CommentsService);

  postsService = inject(PostsService);

  onDelete(): void {
    // eslint-disable-next-line no-restricted-globals
    const isConfirmed = confirm('Are you sure?');
    if (isConfirmed) {
      this.delete.emit(this.comment.id);
    }
  }
}
