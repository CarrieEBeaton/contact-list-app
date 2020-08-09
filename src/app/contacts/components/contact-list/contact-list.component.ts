import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Contact } from '../../models/contact';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss']
})
export class ContactListComponent implements OnInit {

  @Input() contacts: Contact[];
  @Output() deleteContact = new EventEmitter<Contact>();
  @Output() selectedContact = new EventEmitter<Contact>();

  filter = new FormControl('');

  ngOnInit() {
  }

  delete(contact: Contact) {
    this.deleteContact.emit(contact);
  }

  setSelectedContact(contact: Contact) {
    this.selectedContact.emit(contact);
  }

}
