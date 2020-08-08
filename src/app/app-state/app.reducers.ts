import { ActionReducerMap } from '@ngrx/store';
import { AppState } from './app.state';
import * as fromAlert from './../alerts/store/alert.reducers';
import * as fromContact from './../contacts/services/store/reducers/contact.reducer';

export const appReducers: ActionReducerMap<AppState> = {
    loading: null,
    alerts: fromAlert.reducer,
    contacts: fromContact.contactReducers
}