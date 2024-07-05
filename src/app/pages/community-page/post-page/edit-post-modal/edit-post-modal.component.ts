import { Component, inject, Input, OnChanges, SimpleChanges } from '@angular/core';
import { NgForm } from '@angular/forms';
import { first, Observable } from 'rxjs';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { ModalService } from '../../../../shared/components/modal/modal.service';
import { Modals } from '../../../../shared/components/modal/modals.enum';
import { Post } from '../../../../shared/models/post.model';
import { PostsService } from '../../../../shared/services/posts.service';
import { UserService } from '../../../../shared/services/user.service';
import { editPostFields } from './edit-post-fields';
import { User } from '../../../../shared/models/user.model';

@Component({
  selector: 'app-edit-post-modal[post]',
  templateUrl: './edit-post-modal.component.html',
  styleUrls: ['./edit-post-modal.component.scss'],
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
export class EditPostModalComponent implements OnChanges {
  @Input() post!: Post | undefined;

  postEdit: Post | undefined;

  readonly fields = editPostFields;

  readonly modalId = Modals.EditPost;

  private readonly userService = inject(UserService);

  readonly user$: Observable<User | null> = this.userService.user$;

  private readonly modalService = inject(ModalService);

  private readonly postsService = inject(PostsService);

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['post']) {
      const { currentValue } = changes['post'];

      if (currentValue) {
        this.postEdit = structuredClone(this.post);
      }
    }
  }

  onFieldChange(field: string, value: string): void {
    this.postEdit[field] = value;
  }

  onSubmit(form: NgForm): void {
    if (form.valid) {
      this.postsService
        .updatePost(this.post.id, {
          title: this.postEdit.title,
          description: this.postEdit.description,
        })
        .pipe(first())
        .subscribe(() => {
          this.onClose(form);
          this.modalService.close(Modals.EditPost);
        });
    } else {
      form.control.markAllAsTouched();
    }
  }

  onClose(form: NgForm): void {
    form.resetForm();
    this.postEdit = structuredClone(this.post);
  }
}
