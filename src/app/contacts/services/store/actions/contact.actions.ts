import { Action } from '@ngrx/store';
import { Contact } from 'src/app/contacts/models/contact';

export enum ContactActionTypes {
    GetContacts = '[Contact] Get Contacts',
    GetContactSuccess = '[Contact] Get Contacts Success',
    GetContactFailure = '[Contact] Get Contacts Failure'
}

export class GetContacts implements Action {
    readonly type = ContactActionTypes.GetContacts;
}

export class GetContactsSuccess implements Action {
    readonly type = ContactActionTypes.GetContactSuccess;

    constructor(public payload: Contact[]) { }
}

export class GetContactsFailure implements Action {
    readonly type = ContactActionTypes.GetContactFailure;

    constructor(public payload: string) { }
}

export type ContactActions =
    | GetContacts
    | GetContactsSuccess
    | GetContactsFailure;