import { FormField } from '../../../shared/components/dynamic-form-field/form-field.model';

export const createCommunityFields: FormField[] = [
  {
    placeholder: 'Community Name',
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
    placeholder: 'Color',
    type: 'color',
    name: 'backgroundColor',
    model: 'backgroundColor',
    required: true,
    validationMessages: {
      required: 'Color is required.',
    },
    minLength: 1,
  },
];
