import { ActionReducerMap } from '@ngrx/store';
import * as fromAlert from './../alerts/store/alert.reducers';
import * as fromLoading from './../loading/store/loading.reducers';
import { AppState } from './app.state';

export const appReducers: ActionReducerMap<AppState> = {
    loading: fromLoading.loadingReducer,
    alerts: fromAlert.alertReducer
}