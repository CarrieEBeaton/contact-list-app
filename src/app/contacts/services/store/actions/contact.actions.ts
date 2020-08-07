import { Action } from '@ngrx/store';
import { Contact } from 'src/app/contacts/models/contact';
import { HttpErrorResponse } from '@angular/common/http';

export enum ContactActionTypes {
    GetContact = '[Contact] Get Contact',
    GetContactSuccess = '[Contact] Get Contact Success',
    GetContactFailure = '[Contact] Get Contact Failure'
}

export class GetContact implements Action {
    readonly type = ContactActionTypes.GetContact;
}

export class GetContactSuccess implements Action {
    readonly type = ContactActionTypes.GetContactSuccess;

    constructor(public payload: Contact[]) { }
}

export class GetContactFailure implements Action {
    readonly type = ContactActionTypes.GetContactFailure;

    constructor(public payload: HttpErrorResponse) { }
}

export type ContactActions =
    | GetContact
    | GetContactSuccess
    | GetContactFailure;