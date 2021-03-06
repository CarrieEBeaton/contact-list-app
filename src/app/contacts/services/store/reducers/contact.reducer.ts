import { ContactActions, ContactActionTypes } from '../actions/contact.actions';
import { ContactState, intialContactState } from '../state/contact.state';

export function contactReducers(state: ContactState = intialContactState, action: ContactActions): ContactState {
    switch(action.type){
        case ContactActionTypes.GetContactsSuccess: {
            return {
                ...state,
                contacts: action.payload
            }
        }
        case ContactActionTypes.GetContactsFailure: {
            return {
                ...state,
                error: action.payload
            }
        }
        case ContactActionTypes.GetSelectedContact: {
            return {
                ...state,
                selectedContact: state.contacts.find(contact => contact._id === action.payload)
            }
        }
        case ContactActionTypes.CreateContactSuccess: {
            return {
                ...state,
                selectedContact: action.payload,
                contacts: [...state.contacts, action.payload]
            }
        }
        case ContactActionTypes.CreateContactFailure: {
            return {
                ...state,
                error: action.payload
            }
        }
        case ContactActionTypes.UpdateContactSuccess: {
            const updatedContacts = state.contacts.map(contact => action.payload._id === contact._id ? action.payload : contact);
            return {
                ...state,
                contacts: updatedContacts,
                selectedContact: null
            }
        }
        case ContactActionTypes.UpdateContactFailure: {
            return {
                ...state,
                error: action.payload
            }
        }
        case ContactActionTypes.DeleteContactSuccess: {
            return {
                ...state,
                contacts: state.contacts.filter(contact => contact._id !== action.payload._id)
            }
        }
        case ContactActionTypes.DeleteContactFailure: {
            return {
                ...state,
                error: action.payload
            }
        }
        default: {
            return state
        }
    }
}

