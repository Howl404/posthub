import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component, inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { EMPTY, catchError, first } from 'rxjs';
import { AuthService } from '../../shared/auth.service';
import { ModalService } from '../../shared/modal/modal.service';
import { logInFields } from './log-in-fields';
import { Modals } from '../../shared/modal/modals.enum';

export const DEFAULT_LOGIN_USER_STATE = {
  email: '',
  password: '',
};

@Component({
  selector: 'app-log-in-modal',
  templateUrl: './log-in-modal.component.html',
  styleUrls: ['./log-in-modal.component.scss'],
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
export class LogInModalComponent {
  user = { ...DEFAULT_LOGIN_USER_STATE };

  fields = logInFields;

  private readonly modalService = inject(ModalService);

  private readonly authService = inject(AuthService);

  readonly modalId = Modals.LogIn;

  error: string | null = null;

  switchToSignUp(form: NgForm): void {
    this.modalService.close(Modals.LogIn);
    this.modalService.open(Modals.SignUp);
    this.onClose(form);
  }

  onFieldChange(field: string, value: string | boolean): void {
    this.user[field] = value;
  }

  onSubmit(form: NgForm): void {
    if (form.valid) {
      this.authService
        .logInWithEmailAndPassword(this.user.email, this.user.password)
        .pipe(
          first(),
          catchError((error: unknown) => {
            if (typeof error === 'string') {
              this.error = error;
            }

            return EMPTY;
          }),
        )
        .subscribe(() => {
          this.modalService.close(Modals.LogIn);
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
        this.modalService.close(Modals.LogIn);
        this.onClose(form);
      });
  }

  onClose(form: NgForm): void {
    form.resetForm();
    this.error = null;
    this.user = { ...DEFAULT_LOGIN_USER_STATE };
  }
}
