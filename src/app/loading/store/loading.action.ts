import { Action } from '@ngrx/store';

export enum LoadingActionTypes {
    ShowLoading = '[App] Show Loading',
    HideLoading = '[App] Hide Loading'
}

export class ShowLoading implements Action {
    readonly type = LoadingActionTypes.ShowLoading;
}

export class HideLoading implements Action {
    readonly type = LoadingActionTypes.HideLoading;
}

export type LoadingAction = 
    | ShowLoading
    | HideLoading;