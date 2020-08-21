import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ContactState } from '../state/contact.state';

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