import { intialContactState, ContactState } from '../state/contact.state';
import { ContactActions, ContactActionTypes } from '../actions/contact.actions';


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
                selectedContact: action.payload
            }
        }
        case ContactActionTypes.CreateContactFailure: {
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