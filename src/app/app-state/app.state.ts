import { ContactState, intialContactState } from '../contacts/services/store/state/contact.state';
import { AlertState, initialAlertState } from '../alerts/store/alert.reducers';
import { LoadingState, initialLoadingState } from '../loading/store/loading.reducers';

export interface AppState {
    loading: LoadingState;
    alerts: AlertState;
    contacts: ContactState
}

export const initialAppState: AppState = {
    loading: initialLoadingState,
    alerts: initialAlertState,
    contacts: intialContactState
}

export function getInitialState(): AppState {
    return initialAppState;
}