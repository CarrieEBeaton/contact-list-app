import { Component, OnInit } from '@angular/core';
import { Alert } from '../../alerts/models/alert';
import { RemoveAlert } from '../../alerts/store/alert.actions';
import { Observable } from 'rxjs';
import { getAlerts } from '../store/alert.selectors';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app-state/app.state';

@Component({
  selector: 'app-alert-other',
  templateUrl: './alert-other.component.html',
  styleUrls: ['./alert-other.component.scss']
})
export class AlertOtherComponent implements OnInit {

  alerts: Observable<Alert[]> = this.store.select(getAlerts);

  constructor(public store: Store<AppState>) { }

  ngOnInit() {
  }

  closeAlert(alert: Alert) {
    this.store.dispatch(new RemoveAlert(alert));
  }

}
