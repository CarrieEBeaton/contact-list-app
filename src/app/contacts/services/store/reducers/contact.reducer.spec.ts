import { ContactState } from "../state/contact.state";
import { GetContactsSuccess, GetContactsFailure } from '../actions/contact.actions';
import { ContactMock } from '../../testing/contact-mock';
import * as fromContacts from './contact.reducer';

describe('Contact Reducer', () => {
    it('should return contacts and set state when contact is successful', () => {
        const initialState: ContactState = {
            selectedContact: null,
            contacts: null,
            error: ''
        };
        const action = new GetContactsSuccess(ContactMock.CONTACTS);
        const newState = fromContacts.contactReducers(initialState, action) ;

        expect(newState.contacts).toBe(ContactMock.CONTACTS);
    });

    it('should return error message and set state when contact fails', () => {
        const errMsg = 'ERROR';
        const initialState: ContactState = {
            selectedContact: null,
            contacts: null,
            error: errMsg
        };
        const action = new GetContactsFailure(errMsg);
        const newState = fromContacts.contactReducers(initialState, action) ;

        expect(newState.error).toBe(errMsg);
    });
});