import { FormField } from '../../shared/dynamic-form-field/form-field.model';

export const signUpFields: FormField[] = [
  {
    placeholder: 'Name',
    type: 'text',
    name: 'name',
    model: 'name',
    required: true,
    minLength: 3,
    validationMessages: {
      required: 'Name is required.',
      minlength: 'Name must be at least 3 characters long.',
    },
  },
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
  {
    placeholder: 'Date of Birth',
    type: 'date',
    name: 'dob',
    model: 'dob',
    required: true,
    minLength: null,
    validationMessages: { required: 'Date of Birth is required.' },
  },
  {
    placeholder: 'Email subscribe',
    type: 'checkbox',
    name: 'subscribe',
    model: 'subscribed',
    required: false,
    minLength: null,
  },
];
