import { FormField } from '../../../../shared/dynamic-form-field/form-field.model';

export const editCommunityFields: FormField[] = [
  {
    placeholder: 'Community Name',
    type: 'text',
    name: 'name',
    model: 'name',
    required: true,
    minLength: 3,
    validationMessages: {
      required: 'Community Name is required.',
      minlength: 'Community Name must be at least 3 characters long.',
    },
  },
];
