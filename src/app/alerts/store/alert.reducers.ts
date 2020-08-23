import { Alert } from '../models/alert';
import { AlertAction, AlertActionTypes } from './alert.actions';

export interface AlertState {
    alerts: Alert[];
}
export const initialAlertState: AlertState = {
    alerts: []
}

export function alertReducer(state: AlertState = initialAlertState, action: AlertAction): AlertState {
    switch (action.type) {
        // Append an alert to the collection
        case AlertActionTypes.AddAlert: {
            return {
                ...state,
                alerts:  [...state.alerts, action.payload]
            }
        }
        // Remove an alert from the collection
        case AlertActionTypes.RemoveAlert: {
            return {
                ...state,
                alerts: [...state.alerts.filter((item) => item !== action.payload)]
            }
        }
        default: {
            return state;
        }
    }
}