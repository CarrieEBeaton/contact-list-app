import { Alert } from 'src/app/alerts/models/alert';
import { getAlerts } from 'src/app/alerts/store/alert.selectors';

export const ALERT: Alert[] = [{
    type: 'success',
    message: 'Successfully created contact!'
}];

export function getAlertMock(message: string, type?: string): Alert {
    if (!type) { type = 'success'; }
    return {
        type: type,
        message: message
    };
}