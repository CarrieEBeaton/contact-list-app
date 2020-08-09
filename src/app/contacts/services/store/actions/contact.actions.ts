import { Action } from '@ngrx/store';
import { Contact } from 'src/app/contacts/models/contact';

export enum ContactActionTypes {
    GetContacts = '[Contact] Get Contacts',
    GetContactsSuccess = '[Contact] Get Contacts Success',
    GetContactsFailure = '[Contact] Get Contacts Failure',
    GetSelectedContact = '[Contact] Selected Contact',
    CreateContact = '[Contact] Create Contact',
    CreateContactSuccess = '[Contact] Create Contact Success',
    CreateContactFailure = '[Contact] Create Contact Failure',
    UpdateContact = '[Contact] Update Contact',
    UpdateContactSuccess = '[Contact] Update Contact Success',
    UpdateContactFailure = '[Contact] Update Contact Failure',
    DeleteContact = '[Contact] Delete Contact',
    DeleteContactSuccess = '[Contact] Delete Contact Success',
    DeleteContactFailure = '[Contact] Delete Contact Failure',
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

export class GetSelectedContact implements Action {
    readonly type = ContactActionTypes.GetSelectedContact;
    constructor(public payload: string) { 
    }
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

export class UpdateContact implements Action {
    readonly type = ContactActionTypes.UpdateContact;
    constructor(public payload: Contact) { }
}

export class UpdateContactSuccess implements Action {
    readonly type = ContactActionTypes.UpdateContactSuccess;

    constructor(public payload: Contact) { }
}

export class UpdateContactFailure implements Action {
    readonly type = ContactActionTypes.UpdateContactFailure;

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
    | GetSelectedContact
    | CreateContact
    | CreateContactSuccess
    | CreateContactFailure
    | UpdateContact
    | UpdateContactSuccess
    | UpdateContactFailure
    | DeleteContact
    | DeleteContactSuccess
    | DeleteContactFailure
    | ContactListRedirect;