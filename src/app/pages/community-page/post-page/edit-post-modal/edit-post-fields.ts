import { FormField } from '../../../../shared/components/dynamic-form-field/form-field.model';

export const editPostFields: FormField[] = [
  {
    placeholder: 'Title',
    type: 'text',
    name: 'title',
    model: 'title',
    required: true,
    minLength: 3,
    validationMessages: {
      required: 'Title is required.',
      minlength: 'Title must be at least 2 characters long.',
    },
  },
  {
    placeholder: 'Description',
    type: 'text',
    name: 'description',
    model: 'description',
    required: true,
    minLength: 3,
    validationMessages: {
      required: 'Description is required.',
      minlength: 'Description must be at least 10 characters long.',
    },
  },
];
