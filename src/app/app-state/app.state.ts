import { ContactState, intialContactState } from '../contacts/services/store/state/contact.state';
import { AlertState, initialAlertState } from '../alerts/store/alert.reducers';
import { LoadingState, initialLoadingState } from '../loading/store/loading.reducers';

// Global application state for alerts and loading
// Features will use the feature selectors to be appended onto the state when lazy loaded to the page
export interface AppState {
    loading: LoadingState;
    alerts: AlertState;
}

export const initialAppState: AppState = {
    loading: initialLoadingState,
    alerts: initialAlertState
}

export function getInitialState(): AppState {
    return initialAppState;
}