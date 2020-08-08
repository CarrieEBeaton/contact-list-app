import { AbstractControl } from '@angular/forms';

export function phoneNumberValidator(control: AbstractControl): { [key: string]: any } | null {
    var phoneRegex = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/;
    const valid = phoneRegex.test(control.value);
    return valid ? null : { invalidNumber: { valid: false, value: control.value } };
}