import { Component, Input, OnChanges, SimpleChanges, inject } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { Observable, first } from 'rxjs';
import { Router } from '@angular/router';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Community } from '../../../../shared/models/community.model';
import { ModalService } from '../../../../shared/components/modal/modal.service';
import { Modals } from '../../../../shared/components/modal/modals.enum';
import { CommunitiesService } from '../../../../shared/services/communities.service';
import { editCommunityFields } from './edit-community-fields';
import { UserService } from '../../../../shared/services/user.service';
import { User } from '../../../../shared/models/user.model';
import { PostsService } from '../../../../shared/services/posts.service';
import { CommentsService } from '../../../../shared/services/comments.service';

@Component({
  selector: 'app-edit-community-modal[community]',
  templateUrl: './edit-community-modal.component.html',
  styleUrls: ['./edit-community-modal.component.scss'],
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
export class EditCommunityModalComponent implements OnChanges {
  @Input() community!: Community | undefined;

  communityEdit: Community | undefined;

  moderatorName = '';

  readonly fields = editCommunityFields;

  readonly modalId = Modals.EditCommunity;

  private readonly userService = inject(UserService);

  readonly user$: Observable<User | null> = this.userService.user$;

  private readonly modalService = inject(ModalService);

  private readonly communitiesService = inject(CommunitiesService);

  private readonly postsService = inject(PostsService);

  private readonly commentsService = inject(CommentsService);

  private readonly router = inject(Router);

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['community']) {
      const { currentValue } = changes['community'];

      if (currentValue) {
        this.communityEdit = structuredClone(this.community);
      }
    }
  }

  addModerator(inputField: NgModel): void {
    this.communityEdit.moderatorsNames.push(this.moderatorName);
    inputField.reset();
  }

  onFieldChange(field: string, value: string): void {
    this.communityEdit[field] = value;
  }

  onSubmit(form: NgForm): void {
    if (form.valid) {
      const oldName = this.community.name.toString();
      if (oldName !== this.communityEdit.name) {
        this.router.navigate(['r', this.communityEdit.name]);
      }
      this.communitiesService
        .updateCommunity(this.community.id, this.communityEdit)
        .pipe(first())
        .subscribe(() => {
          this.onClose(form);
          this.modalService.close(Modals.EditCommunity);
        });
    } else {
      form.control.markAllAsTouched();
    }
  }

  deleteModerator(moderator: string): void {
    this.communityEdit.moderatorsNames = this.communityEdit.moderatorsNames.filter(
      (item) => item !== moderator,
    );
  }

  onDelete(): void {
    // eslint-disable-next-line no-restricted-globals
    const isConfirmed = confirm('Are you sure?');
    if (isConfirmed) {
      this.router.navigateByUrl('/');
      this.postsService
        .deletePostsByLocationId(this.community.id)
        .pipe(first())
        .subscribe((postsId) => {
          postsId.forEach((postId) => this.commentsService.deleteCommentsByLocationId(postId));
        });
      this.communitiesService.deleteCommunity(this.community.id);
      const users$ = this.userService.getCommunityMembers(this.community.id);
      users$.pipe(first()).subscribe((users) => {
        users.forEach((user) => this.userService.leaveCommunity(this.community.id, user.id, user));
      });
    }
  }

  onClose(form: NgForm): void {
    form.resetForm();
    this.communityEdit = structuredClone(this.community);
  }
}
