import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Alert } from '../models/alert';
import { getAlerts } from '../store/alert.selectors';
import { AppState } from 'src/app/app-state/app.state';
import { Store } from '@ngrx/store';
import { RemoveAlert } from '../store/alert.actions';

@Component({
  selector: 'app-alert-success',
  templateUrl: './alert-success.component.html',
  styleUrls: ['./alert-success.component.scss']
})
export class AlertSuccessComponent implements OnInit {

  // A toast is used to let the user know they successfully added, deleted or editing a contact.  
  // It is self-closing and is a user-friendly way to let the user know the action was successful
  alerts: Observable<Alert[]> = this.store.select(getAlerts);

  constructor(public store: Store<AppState>) { }

  ngOnInit() {
  }

  closeAlert(alert: Alert) {
    this.store.dispatch(new RemoveAlert(alert));
  }

}
