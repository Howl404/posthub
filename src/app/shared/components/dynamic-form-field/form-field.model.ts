export interface FormField {
  placeholder: string;
  type: string;
  name: string;
  model: string;
  required: boolean;
  minLength: number | null;
  validationMessages?: {
    [key: string]: string;
  };
}
