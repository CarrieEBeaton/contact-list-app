import { Alert } from '../models/alert';
import { AlertAction, AlertActionTypes } from './alert.actions';

export interface AlertState {
    alerts: Alert[];
}
export const initialAlertState: AlertState = {
    alerts: []
}

export function reducer(state: AlertState = initialAlertState, action: AlertAction): AlertState {
    switch (action.type) {
        case AlertActionTypes.AddAlert: {
            console.log('here');
            console.log(action.payload);
            return {
                ...state,
                alerts: [...state.alerts.concat(action.payload)]
            }
        }
        case AlertActionTypes.RemoveAlert: {
            return {
                ...state,
                alerts: [...state.alerts.filter((item, index) => index !== action.index)]
            }
        }
        default: {
            return state;
        }
    }
}