import { Component, Input } from '@angular/core';
import { Comment } from '../../../../shared/models/comment.model';

@Component({
  selector: 'app-comment[comment]',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss'],
})
export class CommentComponent {
  @Input() comment!: Comment;
}
