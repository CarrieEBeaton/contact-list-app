import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GenericValidator } from 'src/app/shared/validators/generic.validator';
import { phoneNumberValidator } from 'src/app/shared/validators/phone-number.validator';
import * as uuid from "uuid";
import { Contact } from '../../models/contact';

@Component({
  selector: 'app-contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.scss']
})
export class ContactEditComponent implements OnInit {

  // Communication from the child to the parent component is through inputs/outputs.
  @Input() selectedContact: Contact;
  @Output() create = new EventEmitter<Contact>();
  @Output() update = new EventEmitter<Contact>();
  contactForm: FormGroup;
  pageTitle: string;
  btnText: string;
  errorMessage: string;
  displayMessage: { [key: string]: string } = {};
  private validationMessages: { [key: string]: { [key: string]: string } };
  private genericValidator: GenericValidator;

  constructor(private formBuilder: FormBuilder) {
    this.createValiationMessages();
  }

  ngOnInit() {
    this.setUpForm();
    this.displayContact();
    // When the form value changes, the error and warning messages will be processed to alert the user
    this.contactForm.valueChanges.subscribe(() => {
      // The process messages adds display messages for the inputs
      this.displayMessage = this.genericValidator.processMessages(this.contactForm);
      // A global warning message is added to the form to help the user understand why the create/update button is still disabled if
      // They have not added a required field but have not touched the input control so there is no error displaying under the input
      this.errorMessage = this.genericValidator.getWarningMessages(this.contactForm);
    });
  }

  setUpForm() {
    // Reactive forms provide direct access to an underlying forms object model
    // Makes it easier to reuse forms, it is easier to scale and there is less setup for testing
    // In a reactive forms, the source of truth is the component class. Validator functions are added directly to the form control model in the component class. 
    // Angular then calls these functions whenever the value to the form control changes.
    // Validations were added per the requirements along with a phone number validator to demonstrate understanding of adding a custom validator
    this.contactForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      company: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern(new RegExp('[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}'))]],
      phone: ['', [Validators.required, phoneNumberValidator]],
      address: ['', Validators.required],
    })
  }

  displayContact() {
    // If there is an existing contact, the form values will be patched and the form name/button will be updated accordingly
    if (this.selectedContact) {
      this.pageTitle = 'Edit Contact';
      this.btnText = 'Update';
      this.contactForm.patchValue({
        firstName: this.selectedContact.firstName,
        lastName: this.selectedContact.lastName,
        company: this.selectedContact.company,
        email: this.selectedContact.email,
        phone: this.selectedContact.phone,
        address: this.selectedContact.address,
      });
    } else {
      this.pageTitle = 'Create Contact';
      this.btnText = 'Create';
    }
  }

  createValiationMessages() {
    // These validation message are set up for the user to understand what went wrong when entering in data
    this.validationMessages = {
      firstName: {
        required: 'First name is required.'
      },
      lastName: {
        required: 'Last name is required.'
      },
      company: {
        required: 'Company is required.'
      },
      email: {
        required: 'Email is required.',
        pattern: 'Email must be in correct format: xyz@email.com'
      },
      phone: {
        required: 'Phone Number is required.',
        invalid: 'Phone Number valid formats: ' +
          '123-456-7890, (123) 456-7890, 123 456 7890, 123.456.7890, +1 (123) 456-7890'
      },
      address: {
        required: 'Address is required.'
      },
    };
    this.genericValidator = new GenericValidator(this.validationMessages);
  }

  blur(): void {
    // When the user tabs out of the input, the validator will check for error messages to be displayed
    this.displayMessage = this.genericValidator.processMessages(this.contactForm);
  }

  saveContact() {
    // When the user clicks save, a copy of the form values is made to ensure all values, even ones not on the form
    // such as the id are retained
    if (this.contactForm.dirty && this.contactForm.valid) {
      const contact: Contact = { ...this.selectedContact, ...this.contactForm.value }

      if (!contact._id) {
        // This is just done for the purpose of this demo.  The server would handle this logic
        contact._id = uuid.v4();
        this.create.emit(contact);
      } else {
        this.update.emit(contact);
      }

      this.contactForm.reset();
    }
  }
}
