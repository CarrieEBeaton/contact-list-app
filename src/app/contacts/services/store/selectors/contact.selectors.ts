import { createSelector } from '@ngrx/store';
import { AppState } from 'src/app/app-state/app.state';
import { ContactState } from '../state/contact.state';

export const selectedContacts = (state: AppState) => state.contacts;
 
export const getContacts = createSelector(
    selectedContacts,
  (state: ContactState) => state.contacts
);

export const getContactErrorMsg = createSelector(
    selectedContacts,
  (state: ContactState) => state.error
);