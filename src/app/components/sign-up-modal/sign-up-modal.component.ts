import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component, inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { first } from 'rxjs/internal/operators/first';
import { AuthService } from '../../shared/auth.service';
import { UserDraft } from '../../user.model';
import { ModalService } from '../../shared/modal/modal.service';
import { signUpFields } from './sign-up-fields';

export const defaultSignUpUserState = {
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
  user = { ...defaultSignUpUserState };

  fields = signUpFields;

  private modalService = inject(ModalService);

  private authService = inject(AuthService);

  switchToLogIn(form: NgForm): void {
    this.modalService.close('sign-up-modal');
    this.modalService.open('login-modal');
    this.onClose(form);
  }

  onFieldChange(field: string, value: string | boolean): void {
    this.user[field] = value;
  }

  onSubmit(form: NgForm): void {
    if (form.valid) {
      const userDraft: UserDraft = {
        ...this.user,
        commentsId: [],
        postsId: [],
        joinedCommunitiesId: [],
      };

      this.authService
        .signUpWithPassword(userDraft)
        .pipe(first())
        .subscribe(() => {
          this.modalService.close('sign-up-modal');
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
        this.modalService.close('sign-up-modal');
        this.onClose(form);
      });
  }

  onClose(form: NgForm): void {
    form.resetForm();
    this.user = { ...defaultSignUpUserState };
  }
}
