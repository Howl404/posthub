import { Component, Input, OnChanges, SimpleChanges, inject } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { Observable, first } from 'rxjs';
import { Router } from '@angular/router';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Community } from '../../../community.model';
import { ModalService } from '../../../shared/modal/modal.service';
import { Modals } from '../../../shared/modal/modals.enum';
import { CommunitiesService } from '../../../shared/communities.service';
import { editCommunityFields } from './edit-community-fields';
import { UserService } from '../../../shared/user.service';
import { User } from '../../../user.model';

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
  // eslint-disable-next-line @typescript-eslint/prefer-readonly
  @Input() private community!: Community | undefined;

  communityEdit: Community | undefined;

  moderatorName = '';

  readonly fields = editCommunityFields;

  readonly modalId = Modals.EditCommunity;

  private readonly userService = inject(UserService);

  readonly user$: Observable<User | null> = this.userService.user$;

  private readonly modalService = inject(ModalService);

  private readonly communitiesService = inject(CommunitiesService);

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

  onSubmit(event: SubmitEvent, form: NgForm): void {
    if (form.valid) {
      const oldName = this.community.name.toString();
      this.communitiesService
        .updateCommunity(this.community.id, this.communityEdit)
        .pipe(first())
        .subscribe(() => {
          if (oldName !== this.communityEdit.name) {
            // TODO: Firebase instantly refreshes observable and page handle error, nagivate doesn't occur
            this.router.navigate(['r', this.communityEdit.name]);
          }
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
      // this.communitiesService.deleteCommunity(this.community.id);
      // TODO: Delete community from everyone + delete posts inside community
    }
  }

  onClose(form: NgForm): void {
    form.resetForm();
    this.communityEdit = structuredClone(this.community);
  }
}
