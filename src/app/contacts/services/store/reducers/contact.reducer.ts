import { intialContactState, ContactState } from '../state/contact.state';
import { ContactActions, ContactActionTypes } from '../actions/contact.actions';


export function contactReducers(state: ContactState = intialContactState, action: ContactActions): ContactState {
    switch(action.type){
        case ContactActionTypes.GetContactSuccess: {
            return {
                ...state,
                contacts: action.payload
            }
        }
        case ContactActionTypes.GetContactFailure: {
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