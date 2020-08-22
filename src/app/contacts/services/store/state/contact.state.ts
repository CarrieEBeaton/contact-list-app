import { Contact } from 'src/app/contacts/models/contact';

// State for the Contract Feature
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