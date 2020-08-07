import { ContactState } from '../contacts/services/store/state/contact.state';

export interface AppState {
    loading: boolean;
    contacts: ContactState
}

export const initialAppState: AppState = {
    loading: false,
    contacts: null
}

export function getInitialState(): AppState {
    return initialAppState;
}