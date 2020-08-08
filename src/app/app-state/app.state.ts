import { ContactState, intialContactState } from '../contacts/services/store/state/contact.state';
import { AlertState, initialAlertState } from '../alerts/store/alert.reducers';

export interface AppState {
    loading: boolean;
    alerts: AlertState;
    contacts: ContactState
}

export const initialAppState: AppState = {
    loading: false,
    alerts: initialAlertState,
    contacts: intialContactState
}

export function getInitialState(): AppState {
    return initialAppState;
}