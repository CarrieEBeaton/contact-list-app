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
    this.contactForm.valueChanges.subscribe(() => {
        this.displayMessage = this.genericValidator.processMessages(this.contactForm);
        this.errorMessage = this.genericValidator.getWarningMessages(this.contactForm);
    });
  }

  setUpForm() {
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
    this.displayMessage = this.genericValidator.processMessages(this.contactForm);
  }

  saveContact() {
    if (this.contactForm.valid) {
      const contact: Contact = {...this.selectedContact, ...this.contactForm.value}

      if (!contact._id) {
        contact._id = uuid.v4();
        this.create.emit(contact);
      } else {
        this.update.emit(contact);
      }

      this.contactForm.reset();
    }
  }
}
