import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app-state/app.state';
import { GetContacts } from '../../services/store/actions/contact.actions';
import { getContacts } from '../../services/store/selectors/contact.selectors';

@Component({
  selector: 'app-contact-container',
  templateUrl: './contact-container.component.html',
  styleUrls: ['./contact-container.component.scss']
})
export class ContactContainerComponent implements OnInit {

  contacts$ = this.store.select(getContacts);
  constructor(public store: Store<AppState>) { }

  ngOnInit() {
    this.store.dispatch(new GetContacts());
  }

}
