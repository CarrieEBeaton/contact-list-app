import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Contact } from '../../models/contact';

export type SortDirection = 'asc' | 'desc' | '';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss']
})
export class ContactListComponent implements OnInit {


  sortDirection: SortDirection = 'asc';
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

  onSort() {

    const input = [...this.contacts];
    this.updateSortDirection();
    const updatedArray = this.sort(input);
    this.contacts = updatedArray;
  }

  sort(contacts) {
    if (this.sortDirection === 'asc') {
      return contacts.sort();
    } else {
      return contacts.reverse();
    }
  }

  updateSortDirection() {
    if (this.sortDirection === 'asc') {
      this.sortDirection = 'desc'
    } else {
      this.sortDirection = 'asc';
    }
  }

}
