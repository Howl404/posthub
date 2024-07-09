import { Component, inject, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { first } from 'rxjs';
import { trigger, state, style, transition, animate } from '@angular/animations';

import { ModalService } from '../../../shared/components/modal/modal.service';
import { Modals } from '../../../shared/components/modal/modals.enum';
import { CommunityDraft } from '../../../shared/models/community.model';
import { CommunitiesService } from '../../../shared/services/communities.service';
import { createCommunityFields } from './create-community-fields';
import { User } from '../../../shared/models/user.model';

export const DEFAULT_COMMUNITY_STATE = {
  name: '',
  backgroundColor: '',
};

@Component({
  selector: 'app-create-community-modal',
  templateUrl: './create-community-modal.component.html',
  styleUrls: ['./create-community-modal.component.scss'],
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
export class CreateCommunityModalComponent {
  @Input() user!: User;

  community = { ...DEFAULT_COMMUNITY_STATE };

  readonly fields = createCommunityFields;

  private readonly modalService = inject(ModalService);

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
        moderatorsNames: [],
      };

      this.communitiesService
        .createCommunity(communityDraft)
        .pipe(first())
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
