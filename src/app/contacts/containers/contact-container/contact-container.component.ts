import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { AppState } from 'src/app/app-state/app.state';
import { ShowLoading } from 'src/app/loading/store/loading.action';
import { Contact } from '../../models/contact';
import { DeleteContact, GetContacts } from '../../services/store/actions/contact.actions';
import { getContacts } from '../../services/store/selectors/contact.selectors';

@Component({
  selector: 'app-contact-container',
  templateUrl: './contact-container.component.html',
  styleUrls: ['./contact-container.component.scss']
})
export class ContactContainerComponent implements OnInit, OnDestroy {

  contacts$: Observable<Contact[]> = this.store.select(getContacts);
  subscription$: Subscription;

  constructor(public store: Store<AppState>) {

  }

  // To keep our components pure and prevent mutating state, I use ngrx to dispatch actions
  // and create a unidirectional data flow to call the service and return the data and set the data on the store. 
  // The selectors can be used to get the data from the store 
  ngOnInit() {
    this.subscription$ = this.contacts$.subscribe((contacts) => {
      if (contacts.length === 0) {
        this.store.dispatch(new ShowLoading());
        this.store.dispatch(new GetContacts());
      }
    });
  }

  deleteContact(contact: Contact): void {
    this.store.dispatch(new DeleteContact(contact));
  }

  ngOnDestroy() {
    if (this.subscription$) {this.subscription$.unsubscribe();}
  }

}
