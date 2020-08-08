import { FormControl } from "@angular/forms";
import { phoneNumberValidator } from './phone-number.validator';

describe('PhoneNumberValidator', () => {
    let formControl: FormControl;

    it('should set valid to false if phone number is not valid', () => {
        formControl = new FormControl('2', phoneNumberValidator);
        expect(formControl.valid).toBe(false);
    });

    it('should set valid to true if phone number is not valid', () => {
        formControl = new FormControl('+1 (922) 456-2177', phoneNumberValidator);
        expect(formControl.valid).toBe(true);
    });
});