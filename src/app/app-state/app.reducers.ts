import { ActionReducerMap } from '@ngrx/store';
import { AppState } from './app.state';
import * as fromAlert from './../alerts/store/alert.reducers';
import * as fromContact from './../contacts/services/store/reducers/contact.reducer';
import * as fromLoading from './../loading/store/loading.reducers';

export const appReducers: ActionReducerMap<AppState> = {
    loading: fromLoading.loadingReducer,
    alerts: fromAlert.alertReducer,
    contacts: fromContact.contactReducers
}