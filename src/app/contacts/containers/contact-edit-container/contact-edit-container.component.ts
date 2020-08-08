import { Component, OnInit } from '@angular/core';
import { AppState } from 'src/app/app-state/app.state';
import { Store } from '@ngrx/store';
import { CreateContact } from '../../services/store/actions/contact.actions';

@Component({
  selector: 'app-contact-edit-container',
  templateUrl: './contact-edit-container.component.html',
  styleUrls: ['./contact-edit-container.component.scss']
})
export class ContactEditContainerComponent implements OnInit {

 
  constructor(public store: Store<AppState>) {
  }

  ngOnInit() {
  }

  newContact(contact): void {
    this.store.dispatch(new CreateContact(contact));
  }

}
