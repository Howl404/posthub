import { Component, Input, inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { first } from 'rxjs';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Modals } from '../../../../shared/components/modal/modals.enum';
import { ModalService } from '../../../../shared/components/modal/modal.service';
import { PostsService } from '../../../../shared/services/posts.service';
import { PostDraft } from '../../../../shared/models/post.model';
import { UserService } from '../../../../shared/services/user.service';
import { createPostFields } from './create-post-fields';

export const DEFAULT_POST_STATE = {
  title: '',
  description: '',
};

@Component({
  selector: 'app-create-post-modal[locationId]',
  templateUrl: './create-post-modal.component.html',
  styleUrls: ['./create-post-modal.component.scss'],
  animations: [
    trigger('errorState', [
      state(
        'hidden',
        style({
          opacity: 0,
          display: 'none',
        }),
      ),
      state(
        'visible',
        style({
          opacity: 1,
          display: 'block',
        }),
      ),
      transition('hidden <=> visible', [animate('0.5s ease-in-out')]),
    ]),
  ],
})
export class CreatePostModalComponent {
  @Input() locationId!: string;

  post = { ...DEFAULT_POST_STATE };

  readonly fields = createPostFields;

  private readonly modalService = inject(ModalService);

  private readonly postsService = inject(PostsService);

  private readonly userService = inject(UserService);

  readonly modalId = Modals.CreatePost;

  onFieldChange(field: string, value: string): void {
    this.post[field] = value;
  }

  onSubmit(form: NgForm): void {
    if (form.valid) {
      const postDraft: PostDraft = {
        ...this.post,
        location: this.locationId,
        upvotes: 0,
        date: new Date(),
        authorName: this.userService.getCurrentUser().name,
        commentsAmount: 0,
        upvotesByDay: [],
      };

      this.postsService
        .createPost(postDraft)
        .pipe(first())
        .subscribe(() => {
          this.onClose(form);
          this.modalService.close(Modals.CreatePost);
        });
    } else {
      form.control.markAllAsTouched();
    }
  }

  onClose(form: NgForm): void {
    form.resetForm();
    this.post = { ...DEFAULT_POST_STATE };
  }
}
