import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../app-state/app.state';
import { RemoveAlert } from './store/alert.actions';
import { Alert } from './models/alert';
import { getAlerts } from './store/alert.selectors';

@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.scss']
})
export class AlertsComponent implements OnInit {

  alerts = this.store.select(getAlerts);

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.alerts.subscribe(alert => console.log(alert));
  }

  closeAlert(index: number, alerts: Alert[]) {
    this.store.dispatch(new RemoveAlert(index, alerts));
  }

}
