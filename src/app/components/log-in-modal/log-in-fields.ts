import { FormField } from '../../shared/form-field.model';

export const logInFields: FormField[] = [
  {
    placeholder: 'Email',
    type: 'email',
    name: 'email',
    model: 'email',
    required: true,
    minLength: 6,
    validationMessages: {
      required: 'Email is required.',
      email: 'Email must be a valid email address.',
      minlength: 'Email must be at least 6 characters long.',
    },
  },
  {
    placeholder: 'Password',
    type: 'password',
    name: 'password',
    model: 'password',
    required: true,
    minLength: 6,
    validationMessages: {
      required: 'Password is required.',
      minlength: 'Password must be at least 6 characters long.',
    },
  },
];
