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
  @Output() results = new EventEmitter<any>();
  filter = new FormControl('');

  ngOnInit() {
  }



  delete() {
    // this.open();
    console.log('emit delete');
  }
}
