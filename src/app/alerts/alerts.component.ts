import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../app-state/app.state';
import { RemoveAlert } from './store/alert.actions';
import { Alert } from './models/alert';
import { getAlerts } from './store/alert.selectors';
import { Observable, BehaviorSubject, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.scss']
})
export class AlertsComponent implements OnInit {

  alerts: Observable<Alert[]> = this.store.select(getAlerts);
  subscription$: Subscription;

  constructor(public store: Store<AppState>) { }

  ngOnInit() {
    this.subscription$ = this.alerts.subscribe((alerts: Alert[]) => {
      this.setSelfClosingAlert(alerts);
    })
  }

  closeAlert(alert: Alert) {
    this.store.dispatch(new RemoveAlert(alert));
  }

  setSelfClosingAlert(alerts: Alert[]) {
    alerts.forEach((alert) => {
      if (alert.type === 'success') {
        const success = new BehaviorSubject<string>(alert.message);
        success.pipe(
          debounceTime(3000)
        ).subscribe(() => {
          this.store.dispatch(new RemoveAlert(alert));
        });
      }
    });
  }

}
