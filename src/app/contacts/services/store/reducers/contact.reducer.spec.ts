import { ContactState } from "../state/contact.state";
import { GetContactsSuccess, GetContactsFailure, GetSelectedContact, CreateContactSuccess, CreateContactFailure, UpdateContactSuccess, UpdateContactFailure, DeleteContactSuccess, DeleteContactFailure } from '../actions/contact.actions';
import { ContactMock } from '../../../testing/contact-mock';
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

    it('should return selected contact set state when contact get selected contact is called', () => {
        const action = new GetSelectedContact(ContactMock.CONTACTS[0]._id);
        const initialState : ContactState = {
            selectedContact: null,
            contacts: ContactMock.CONTACTS,
            error: null
        };
        const newState = fromContacts.contactReducers(initialState, action) ;

        expect(newState.selectedContact).toBe(ContactMock.CONTACTS[0]);
    });

    it('should return a new contact and set state when create contact is successful', () => {
        const initialState: ContactState = {
            selectedContact: null,
            contacts: ContactMock.CONTACTS,
            error: ''
        };
        const action = new CreateContactSuccess(ContactMock.CONTACTS[0]);
        const newState = fromContacts.contactReducers(initialState, action) ;

        expect(newState.selectedContact).toBe(ContactMock.CONTACTS[0]);
    });

    it('should return error message and set state when create contact fails', () => {
        const errMsg = 'ERROR';
        const initialState: ContactState = {
            selectedContact: null,
            contacts: null,
            error: errMsg
        };
        const action = new CreateContactFailure(errMsg);
        const newState = fromContacts.contactReducers(initialState, action) ;

        expect(newState.error).toBe(errMsg);
    });

    it('should return a updated contact and set state when update contact is successful', () => {
        const initialState: ContactState = {
            selectedContact: null,
            contacts: ContactMock.CONTACTS,
            error: ''
        };
        const updatedContact = ContactMock.CONTACTS[0];
        updatedContact.firstName = 'John';
        const action = new UpdateContactSuccess(updatedContact);
        const newState = fromContacts.contactReducers(initialState, action) ;

        expect(newState.contacts).not.toBe(ContactMock.CONTACTS);
    });

    it('should return error message and set state when update contact fails', () => {
        const errMsg = 'ERROR';
        const initialState: ContactState = {
            selectedContact: null,
            contacts: null,
            error: errMsg
        };
        const action = new UpdateContactFailure(errMsg);
        const newState = fromContacts.contactReducers(initialState, action) ;

        expect(newState.error).toBe(errMsg);
    });

    it('should remove a contact and set state when delete contact is successful', () => {
        const initialState: ContactState = {
            selectedContact: null,
            contacts: ContactMock.CONTACTS,
            error: ''
        };

        const updatedContacts = ContactMock.CONTACTS.filter(contact => contact !== ContactMock.CONTACTS[0]);
        const action = new DeleteContactSuccess(ContactMock.CONTACTS[0]);
        const newState = fromContacts.contactReducers(initialState, action) ;

        expect(newState.contacts).not.toBe(ContactMock.CONTACTS);
        expect(newState.contacts.length).toBe(updatedContacts.length);
    });

    it('should return error message and set state when delete contact fails', () => {
        const errMsg = 'ERROR';
        const initialState: ContactState = {
            selectedContact: null,
            contacts: null,
            error: errMsg
        };
        const action = new DeleteContactFailure(errMsg);
        const newState = fromContacts.contactReducers(initialState, action) ;

        expect(newState.error).toBe(errMsg);
    });

});