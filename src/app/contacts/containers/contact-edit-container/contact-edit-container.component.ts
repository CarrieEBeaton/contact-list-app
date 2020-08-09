import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/app-state/app.state';
import { ShowLoading } from 'src/app/loading/store/loading.action';
import { Contact } from '../../models/contact';
import { CreateContact, UpdateContact } from '../../services/store/actions/contact.actions';
import { getSelectedContact } from '../../services/store/selectors/contact.selectors';

@Component({
  selector: 'app-contact-edit-container',
  templateUrl: './contact-edit-container.component.html',
  styleUrls: ['./contact-edit-container.component.scss']
})
export class ContactEditContainerComponent implements OnInit {

  selectedContact$: Observable<Contact> = this.store.select(getSelectedContact);

  constructor(public store: Store<AppState>) {
  }

  ngOnInit() {
  }

  newContact(contact): void {
    this.store.dispatch(new ShowLoading());
    this.store.dispatch(new CreateContact(contact));
  }

  updateContact(contact): void {    
    this.store.dispatch(new ShowLoading());
    this.store.dispatch(new UpdateContact(contact));
  }

}
