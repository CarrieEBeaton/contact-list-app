import { Action } from '@ngrx/store';
import { Contact } from 'src/app/contacts/models/contact';

export enum ContactActionTypes {
    GetContacts = '[Contact] Get Contacts',
    GetContactsSuccess = '[Contact] Get Contacts Success',
    GetContactsFailure = '[Contact] Get Contacts Failure',
    CreateContact = '[Contact] Create Contacts',
    CreateContactSuccess = '[Contact] Create Contacts Success',
    CreateContactFailure = '[Contact] Create Contacts Failure',
    DeleteContact = '[Contact] Delete Contacts',
    DeleteContactSuccess = '[Contact] Delete Contacts Success',
    DeleteContactFailure = '[Contact] Delete Contacts Failure',
    ContactListRedirect = '[Contact] Redirect'
}

export class GetContacts implements Action {
    readonly type = ContactActionTypes.GetContacts;
}

export class GetContactsSuccess implements Action {
    readonly type = ContactActionTypes.GetContactsSuccess;

    constructor(public payload: Contact[]) { }
}

export class GetContactsFailure implements Action {
    readonly type = ContactActionTypes.GetContactsFailure;

    constructor(public payload: string) { }
}

export class CreateContact implements Action {
    readonly type = ContactActionTypes.CreateContact;
    constructor(public payload: Contact) { }
}

export class CreateContactSuccess implements Action {
    readonly type = ContactActionTypes.CreateContactSuccess;

    constructor(public payload: Contact) { }
}

export class CreateContactFailure implements Action {
    readonly type = ContactActionTypes.CreateContactFailure;

    constructor(public payload: string) { }
}

export class DeleteContact implements Action {
    readonly type = ContactActionTypes.DeleteContact;
    constructor(public payload: Contact) { }
}

export class DeleteContactSuccess implements Action {
    readonly type = ContactActionTypes.DeleteContactSuccess;

    constructor(public payload: Contact) { }
}

export class DeleteContactFailure implements Action {
    readonly type = ContactActionTypes.DeleteContactFailure;

    constructor(public payload: string) { }
}

export class ContactListRedirect implements Action {
    readonly type = ContactActionTypes.ContactListRedirect
}

export type ContactActions =
    | GetContacts
    | GetContactsSuccess
    | GetContactsFailure
    | CreateContact
    | CreateContactSuccess
    | CreateContactFailure
    | DeleteContact
    | DeleteContactSuccess
    | DeleteContactFailure
    | ContactListRedirect;