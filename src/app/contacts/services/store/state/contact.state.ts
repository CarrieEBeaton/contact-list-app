import { Contact } from 'src/app/contacts/models/contact';

// State for the Contract Feature
// Stores provide a place to put temporary UI state, such as when forms are filled in or 
// for storing search criteria when navigating between router views.
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