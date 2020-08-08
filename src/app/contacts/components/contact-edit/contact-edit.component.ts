import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app-state/app.state';
import { GenericValidator } from 'src/app/shared/validators/generic.validator';
import { phoneNumberValidator } from 'src/app/shared/validators/phone-number.validator';
import { Contact } from '../../models/contact';

@Component({
  selector: 'app-contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.scss']
})
export class ContactEditComponent implements OnInit {


  @Output() create = new EventEmitter<Contact>();
  contactForm: FormGroup;

  displayMessage: { [key: string]: string } = {};
  private validationMessages: { [key: string]: { [key: string]: string } };
  private genericValidator: GenericValidator;

  constructor(private formBuilder: FormBuilder) {
    this.createValiationMessages();

  }

  ngOnInit() {
    this.setUpForm();
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
        invalidNumber: 'Phone Number valid formats: '+
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
    if (this.contactForm.dirty && this.contactForm.valid) {
      const contact: Contact = Object.assign({}, this.contactForm.value);

      if (!contact._id) {
        this.create.emit(contact);
      }
    }
  }
}
