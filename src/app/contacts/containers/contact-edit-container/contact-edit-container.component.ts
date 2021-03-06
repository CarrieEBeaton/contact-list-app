import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/app-state/app.state';
import { ShowLoading } from 'src/app/loading/store/loading.action';
import { Contact } from '../../models/contact';
import { CreateContact, UpdateContact, GetSelectedContact, GetContacts } from '../../services/store/actions/contact.actions';
import { getSelectedContact } from '../../services/store/selectors/contact.selectors';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-contact-edit-container',
  templateUrl: './contact-edit-container.component.html',
  styleUrls: ['./contact-edit-container.component.scss']
})
export class ContactEditContainerComponent implements OnInit {


  selectedContact$: Observable<Contact> = this.store.select(getSelectedContact);

  constructor(public store: Store<AppState>, private activedRoute: ActivatedRoute) {
  }

  //	Here the activated routed is subscribed to in order to grab parameters passed in and get an existing contact for editing
  ngOnInit() {
    this.activedRoute.params.subscribe((params) => {
      if (params.id !== 0) {
        this.getContact(params.id);
      }
    });
  }

  getContact(id: string) {
    this.store.dispatch(new GetSelectedContact(id));
  }

  newContact(contact): void {
    // A global loading state was create and is set when actions are that call a service are dispatched
    this.store.dispatch(new ShowLoading());
    this.store.dispatch(new CreateContact(contact));
  }

  updateContact(contact): void {
    // A global loading state was create and is set when actions are that call a service are dispatched
    this.store.dispatch(new ShowLoading());
    this.store.dispatch(new UpdateContact(contact));
  }

}
