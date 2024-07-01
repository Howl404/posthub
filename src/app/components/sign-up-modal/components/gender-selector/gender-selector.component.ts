import { Component, Input, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

@Component({
  selector: 'app-gender-selector',
  templateUrl: './gender-selector.component.html',
  styleUrls: ['./gender-selector.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => GenderSelectorComponent),
      multi: true,
    },
  ],
})
export class GenderSelectorComponent implements ControlValueAccessor {
  @Input() gender!: string;

  writeValue(gender: string): void {
    this.gender = gender;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  onGenderChange(gender: string): void {
    this.gender = gender;
    this.onChange(gender);
    this.onTouched();
  }

  private onChange: any = () => {};

  private onTouched: any = () => {};
}
