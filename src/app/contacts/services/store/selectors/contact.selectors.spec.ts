import { ContactState } from "../state/contact.state";
import { ContactMock } from '../../testing/contact-mock';
import * as contactReducers from './contact.selectors';

const ERROR = 'ERROR';
const contactState: ContactState = {
    selectedContact: null,
    contacts: ContactMock.CONTACTS,
    error: ERROR
};

describe('Contact Selectors', () => {
    it('should select contacts', () => {
        expect(contactReducers.getContacts.projector(contactState)).toEqual(ContactMock.CONTACTS);
    });

    it('should select error Message', () => {
        expect(contactReducers.getContactErrorMsg.projector(contactState)).toEqual(ERROR);
    });
});