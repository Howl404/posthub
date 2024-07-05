import { Component, inject, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { first, switchMap } from 'rxjs';
import { ModalService } from '../../../shared/modal/modal.service';
import { Modals } from '../../../shared/modal/modals.enum';
import { UserService } from '../../../shared/user.service';
import { createCommunityFields } from './create-community-fields';
import { CommunityDraft } from '../../../community.model';
import { User } from '../../../user.model';
import { CommunitiesService } from '../../../shared/communities.service';

export const DEFAULT_COMMUNITY_STATE = {
  name: '',
  backgroundColor: '',
};

@Component({
  selector: 'app-create-community-modal',
  templateUrl: './create-community-modal.component.html',
  styleUrls: ['./create-community-modal.component.scss'],
})
export class CreateCommunityModalComponent {
  @Input() user!: User;

  community = { ...DEFAULT_COMMUNITY_STATE };

  readonly fields = createCommunityFields;

  private readonly modalService = inject(ModalService);

  private readonly userService = inject(UserService);

  private readonly communitiesService = inject(CommunitiesService);

  readonly modalId = Modals.CreateCommunity;

  onFieldChange(field: string, value: string): void {
    this.community[field] = value;
  }

  onSubmit(form: NgForm): void {
    if (form.valid) {
      const communityDraft: CommunityDraft = {
        ...this.community,
        joinedAmount: 1,
        ownerId: this.user.id,
        moderatorsNames: [this.user.name],
      };

      this.communitiesService
        .createCommunity(communityDraft)
        .pipe(
          first(),
          switchMap((communityId) => {
            return this.userService.getUserByName(this.user.name).pipe(
              first(),
              switchMap((user) =>
                this.userService.updateUser(user.id, {
                  moderatingCommunitiesId: [...this.user.moderatingCommunitiesId, communityId],
                }),
              ),
            );
          }),
        )
        .subscribe(() => {
          this.onClose(form);
          this.modalService.close(Modals.CreateCommunity);
        });
    } else {
      form.control.markAllAsTouched();
    }
  }

  onClose(form: NgForm): void {
    form.resetForm();
    this.community = { ...DEFAULT_COMMUNITY_STATE };
  }
}
