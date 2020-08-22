import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Contact } from '../../models/contact';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss']
})
export class ContactListComponent implements OnInit {

  // Presentation components display data on a form template to present it to the UI and emit changes to the data back to the parent
  // This pattern improves testability b/c each section will serve a single function
  @Input() contacts: Contact[];
  @Output() deleteContact = new EventEmitter<Contact>();

  filter = new FormControl('');

  ngOnInit() {
  }

  delete(contact: Contact) {
    this.deleteContact.emit(contact);
  }

}
