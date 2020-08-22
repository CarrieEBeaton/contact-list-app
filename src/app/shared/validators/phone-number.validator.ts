import { AbstractControl } from '@angular/forms';

// Done to demonstrate understanding of implementing a custom validator
// If the regex expression is valid it returns null, else it returns invalid object
export function phoneNumberValidator(control: AbstractControl): { [key: string]: any } | null {
    var phoneRegex = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/;
    const valid = phoneRegex.test(control.value);
    return valid ? null : { invalid: { valid: false, value: control.value } };
}