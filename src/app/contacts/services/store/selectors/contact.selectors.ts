import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ContactState } from '../state/contact.state';

// Create a feature selector for contracts and it will be appended to app state when 
// lazy loaded to this module
// Selectors send data back data to the view
const getContactFeatureState = createFeatureSelector<ContactState>('contacts');

export const getContacts = createSelector(
  getContactFeatureState,
  (state: ContactState) => state.contacts
);

export const getSelectedContact = createSelector(
  getContactFeatureState,
  (state: ContactState) => state.selectedContact
);


export const getContactErrorMsg = createSelector(
  getContactFeatureState,
  (state: ContactState) => state.error
);