import { CommonModule } from '@angular/common';
import { async, TestBed } from '@angular/core/testing';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ContactMock } from '../contacts/services/testing/contact-mock';
import { GenericValidator } from './generic.validator';

describe('GenericValidator', () => {

    let form: FormGroup = new FormGroup({});
    let formBuilder: FormBuilder = new FormBuilder();
    let validationMessages: { [key: string]: { [key: string]: string } };
    let displayMessage: { [key: string]: string } = {};

    validationMessages = {
        firstName: {
            required: 'Name is required.',
        },

    };

    const genericValidator = new GenericValidator(validationMessages);
    const customer = ContactMock.CONTACTS;

    beforeEach(async(() => {

        TestBed.configureTestingModule({
            imports: [CommonModule, FormsModule, ReactiveFormsModule],
            providers: [{ provide: FormBuilder, useValue: formBuilder }, 
                { provide: FormGroup, useValue: form }]
        }).compileComponents();

    }));

    beforeEach(() => {
        form = formBuilder.group({
            firstName: ['', Validators.required]
        })
        form.valueChanges.subscribe(() => {
            displayMessage = genericValidator.processMessages(form);
        });

    });

    it('should set error if first name is empty', () => {
        form.controls['firstName'].setValue('');
        expect(form.controls['firstName'].errors).toBeDefined();
        expect(form.controls['firstName'].errors).toEqual({ required: true });
    });


    it('should not set display message when not dirty or touched', () => {
        form.controls['firstName'].setValue('');
        expect(displayMessage.firstName).toEqual('');

    });

    it('should set display message to validation message when form is dirty and required true', () => {
        form.controls['firstName'].markAsDirty();
        form.controls['firstName'].setValue('');
        expect(displayMessage.firstName.trim()).toEqual(validationMessages.firstName.required);

    });

    it('should set display message to validation message when form is touched and required true', () => {
        form.controls['firstName'].markAsTouched();
        form.controls['firstName'].setValue('');
        expect(displayMessage.firstName.trim()).toEqual(validationMessages.firstName.required);
    });
});