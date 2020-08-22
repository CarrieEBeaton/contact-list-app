import { FormGroup } from '@angular/forms';

// Generic validator for reactive forms
// Implemented as a class, not a service so it can retain the state for multiple forms
export class GenericValidator {
    constructor(private validationMessages: { [key: string]: { [key: string]: string } }) { }

    processMessages(container: FormGroup): { [key: string]: string } {
        const messages = {};

        // loop through all the controls and get the form control name/key
        for (const controlKey in container.controls) {
            if (container.controls.hasOwnProperty(controlKey)) {

                const c = container.controls[controlKey];
                // If there is a validation message for the form control
                if (this.validationMessages[controlKey]) {
                    messages[controlKey] = '';
                    // and the form control is dirty and has errors
                    if ((c.dirty || c.touched) && c.errors) {
                        Object.keys(c.errors).map(messageKey => {
                            if (this.validationMessages[controlKey][messageKey]) {
                                // add the messages to the display messages on the form to be viewed by the user on the controls
                                messages[controlKey] += this.validationMessages[controlKey][messageKey] + ' ';
                            }
                        });
                    }
                }
            }
        }
        return messages;
    }

    getWarningMessages(container: FormGroup) {
        let errors: string = '';

        // loop through all the controls and get the form control name/key
        for (const controlKey in container.controls) {
            const c = container.controls[controlKey];
            if (c.errors !== null) {
                // If the control has errors, append warning messages with the control name and the error message to alert the user
                Object.keys(c.errors).map(messageKey => {
                    errors += controlKey.toUpperCase() + ': ' + messageKey + ' ';
                });
            }
        }
        return errors !== undefined ? errors : '';
    }
}