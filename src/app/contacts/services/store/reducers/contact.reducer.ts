import { Contact } from 'src/app/contacts/models/contact';
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
        case ContactActionTypes.DeleteContactSuccess: {
            return {
                ...state,
                contacts: state.contacts.filter(contact => contact !== action.payload)
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