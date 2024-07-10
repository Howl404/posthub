import { Component, Input, inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { first, map, switchMap } from 'rxjs';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Modals } from '../../../../shared/components/modal/modals.enum';
import { ModalService } from '../../../../shared/components/modal/modal.service';
import { PostsService } from '../../../../shared/services/posts.service';
import { PostDraft } from '../../../../shared/models/post.model';
import { UserService } from '../../../../shared/services/user.service';
import { createPostFields } from './create-post-fields';
import { User } from '../../../../shared/models/user.model';
import { NotificationsService } from '../../../../shared/services/notifications.service';
import { Notification, NotificationType } from '../../../../shared/models/notification';
import { CommunitiesService } from '../../../../shared/services/communities.service';

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

  private readonly notificationsService = inject(NotificationsService);

  private readonly communitiesService = inject(CommunitiesService);

  user$ = this.userService.user$;

  readonly modalId = Modals.CreatePost;

  onFieldChange(field: string, value: string): void {
    this.post[field] = value;
  }

  onSubmit(form: NgForm, user: User): void {
    if (form.valid) {
      const postDraft: PostDraft = {
        ...this.post,
        location: this.locationId,
        upvotes: 0,
        date: new Date(),
        authorName: user.name,
        commentsAmount: 0,
        upvotesByDay: [],
      };

      this.postsService
        .createPost(postDraft)
        .pipe(
          first(),
          switchMap((postId) => {
            this.onClose(form);
            this.modalService.close(Modals.CreatePost);

            return this.communitiesService.getCommunityById(postDraft.location).pipe(
              first(),
              switchMap((community) => {
                const notification: Notification = {
                  text: `New post in community "${community.name}"`,
                  type: NotificationType.Info,
                  date: new Date(),
                  link: `/r/${community.name}/${postId}`,
                };

                return this.userService.getCommunityMembers(community.id).pipe(
                  first(),
                  map((users) => ({
                    users: users.filter((user1) => user1.id !== user.id),
                    notification,
                  })),
                );
              }),
            );
          }),
        )
        .subscribe(({ users, notification }) => {
          users.forEach((user1) => {
            this.notificationsService.addNotification(user1.id, notification);
          });
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
