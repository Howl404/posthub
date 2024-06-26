import { Component, Input, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { FormField } from 'src/app/components/sign-up-modal/form-field.model';

@Component({
  selector: 'app-dynamic-form-field',
  templateUrl: './dynamic-form-field.component.html',
  styleUrls: ['./dynamic-form-field.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DynamicFormFieldComponent),
      multi: true,
    },
  ],
})
export class DynamicFormFieldComponent implements ControlValueAccessor {
  @Input() name!: string;

  @Input() value!: string;

  @Input() field!: FormField;

  private onChange: any = () => {};

  private onTouched: any = () => {};

  writeValue(value: string): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  onValueChange(value: string): void {
    console.log('change');
    this.value = value;
    this.onChange(value);
    this.onTouched();
  }
}
