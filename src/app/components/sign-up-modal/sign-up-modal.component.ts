import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component, inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AuthService } from '../../shared/auth.service';
import { UserDraft } from '../../user.model';
import { ModalService } from '../../shared/modal/modal.service';
import { signUpFields } from './sign-up-fields';
import { Modals } from '../../shared/modal/modals.enum';

export const DEFAULT_SIGNUP_USER_STATE = {
  name: '',
  email: '',
  password: '',
  gender: '',
  dob: '',
  subscribed: false,
};

@Component({
  selector: 'app-sign-up-modal',
  templateUrl: './sign-up-modal.component.html',
  styleUrls: ['./sign-up-modal.component.scss'],
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
export class SignUpModalComponent {
  user = { ...DEFAULT_SIGNUP_USER_STATE };

  fields = signUpFields;

  private readonly modalService = inject(ModalService);

  private readonly authService = inject(AuthService);

  readonly modalId = Modals.SignUp;

  switchToLogIn(form: NgForm): void {
    this.modalService.close(Modals.SignUp);
    this.modalService.open(Modals.LogIn);
    this.onClose(form);
  }

  onFieldChange(field: string, value: string | boolean): void {
    this.user[field] = value;
  }

  onSubmit(form: NgForm): void {
    if (form.valid) {
      const { password, ...userDraftWithoutPassword } = this.user;
      const userDraft: UserDraft = {
        ...userDraftWithoutPassword,
        commentsId: [],
        postsId: [],
        joinedCommunitiesId: [],
        moderatingCommunitiesId: [],
      };

      this.authService
        .signUpWithPassword(userDraft, password)
        .pipe(first())
        .subscribe(() => {
          this.modalService.close(Modals.SignUp);
          this.onClose(form);
        });
    } else {
      form.control.markAllAsTouched();
    }
  }

  onContinueWithGoogle(form: NgForm): void {
    this.authService
      .signUpWithGoogle()
      .pipe(first())
      .subscribe(() => {
        this.modalService.close(Modals.SignUp);
        this.onClose(form);
      });
  }

  onClose(form: NgForm): void {
    form.resetForm();
    this.user = { ...DEFAULT_SIGNUP_USER_STATE };
  }
}
