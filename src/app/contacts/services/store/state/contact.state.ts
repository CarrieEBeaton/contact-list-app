import { Contact } from 'src/app/contacts/models/contact';

export interface ContactState {
    selectedContact: Contact;
    contacts: Contact[];
    error: string | null;
}

export const intialContactState: ContactState = {
    selectedContact: null,
    contacts: [],
    error: null
}