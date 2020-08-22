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

  // Application metadata is returned as observables from services
  // An observable is a data type that manages asynchronous data fetched from the service.
  // The parent component subscribes to changes in data that come from the service
  selectedContact$: Observable<Contact> = this.store.select(getSelectedContact);

  constructor(public store: Store<AppState>, private activedRoute: ActivatedRoute) {
  }

  // Again, for maintainability – it is recommended that you use state management
  // The store decouples component interaction because the component receiving the data does not know what caused the data to change, only that it has a new value
  // The component should only talk to the store which will subscribe to changes in the data that come from the service
  // The async pipe subscribes to an Observable returns the latest value it has emitted. 
  // When the component gets destroyed, the async pipe is automatically unsubscribing from that data to avoid potential memory leaks.
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
