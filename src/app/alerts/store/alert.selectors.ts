import { AppState } from 'src/app/app-state/app.state';
import { createSelector } from '@ngrx/store';
import { AlertState } from './alert.reducers';

export const selectedAlerts = (state: AppState) => state.alerts;
 
export const getAlerts = createSelector(
    selectedAlerts,
  (state: AlertState) => state.alerts
);