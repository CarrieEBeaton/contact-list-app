import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../app-state/app.state';
import { RemoveAlert } from './store/alert.actions';
import { Alert } from './models/alert';
import { getAlerts } from './store/alert.selectors';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.scss']
})
export class AlertsComponent implements OnInit {

  alerts: Observable<Alert[]> = this.store.select(getAlerts);

  constructor(public store: Store<AppState>) { }

  ngOnInit() {
  }

  closeAlert(index: number, alerts: Alert[]) {
    this.store.dispatch(new RemoveAlert(index, alerts));
  }

}
