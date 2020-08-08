import { Alert } from 'src/app/alerts/models/alert';

export const ALERT: Alert[] = [{
    type: 'success',
    message: 'Successfully created contact!'
}];

export const ALERTERROR: Alert = {
    type: 'danger',
    message: 'Error 404 Bad Request: Invalid Input Params'
};