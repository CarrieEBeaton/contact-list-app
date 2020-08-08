import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';
import { AppState } from 'src/app/app-state/app.state';
import { ShowLoading } from 'src/app/loading/store/loading.action';
import { Contact } from '../../models/contact';
import { GetContacts } from '../../services/store/actions/contact.actions';
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

  ngOnInit() {
    this.subscription$ = this.contacts$.subscribe((contacts) => {
      if (contacts.length === 0) {
        this.store.dispatch(new ShowLoading());
        this.store.dispatch(new GetContacts());
      }
    });
  }

  ngOnDestroy() {
    if (this.subscription$) {this.subscription$.unsubscribe();}
  }

}
