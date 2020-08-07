import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { GetContacts } from '../../services/store/actions/contact.actions';
import { getContacts } from '../../services/store/selectors/contact.selectors';
import { ContactState } from '../../services/store/state/contact.state';
import { AppState } from 'src/app/app-state/app.state';

@Component({
  selector: 'app-contact-container',
  templateUrl: './contact-container.component.html',
  styleUrls: ['./contact-container.component.scss']
})
export class ContactContainerComponent implements OnInit {

  contacts$ = this.store.select(getContacts);
  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.store.dispatch(new GetContacts());
  }

}
