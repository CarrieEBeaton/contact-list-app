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
        case AlertActionTypes.AddAlert: {
            return {
                ...state,
                alerts:  [...state.alerts, action.payload]
            }
        }
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