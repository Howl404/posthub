import { Component, Input, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { FormField } from '../../form-field.model';

@Component({
  selector: 'app-dynamic-form-field[field][name]',
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

  @Input() value!: string | boolean;

  @Input() field!: FormField;

  writeValue(value: string | boolean): void {
    if (value !== null) {
      this.value = value;
    }
  }

  registerOnChange(fn: (value: any) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  onValueChange(value: string | boolean): void {
    this.value = value;
    this.onChange(value);
    this.onTouched();
  }

  private onChange: (value: any) => void = () => {};

  private onTouched: () => void = () => {};
}
