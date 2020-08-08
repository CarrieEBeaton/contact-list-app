import { Action } from '@ngrx/store';
import { Alert } from '../models/alert';

export enum AlertActionTypes {
    AddAlert = '[App] Add Alert',
    RemoveAlert = '[App] Remove Alert'
}

export class AddAlert implements Action {
    readonly type = AlertActionTypes.AddAlert;

    constructor(public payload: Alert) {  }
}

export class RemoveAlert implements Action {
    readonly type = AlertActionTypes.RemoveAlert;
    constructor(public index: number, public alerts: Alert[]) {}
}

export type AlertAction =
    | AddAlert
    | RemoveAlert;