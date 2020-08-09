import { ContactState } from "../state/contact.state";
import { ContactMock } from '../../../../shared/testing/contact-mock';
import * as contactReducers from './contact.selectors';

const ERROR = 'ERROR';
const contactState: ContactState = {
    selectedContact: ContactMock.CONTACTS[0],
    contacts: ContactMock.CONTACTS,
    error: ERROR
};

describe('Contact Selectors', () => {
    it('should select contacts', () => {
        expect(contactReducers.getContacts.projector(contactState)).toEqual(ContactMock.CONTACTS);
    });

    it('should select Selected Contact', () => {
        expect(contactReducers.getSelectedContact.projector(contactState)).toEqual(ContactMock.CONTACTS[0]);
    });

    it('should select error Message', () => {
        expect(contactReducers.getContactErrorMsg.projector(contactState)).toEqual(ERROR);
    });
});