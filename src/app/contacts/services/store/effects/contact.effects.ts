import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import { Contact } from 'src/app/contacts/models/contact';
import { ContactService } from '../../contact.service';
import { ContactActionTypes, CreateContact, GetContacts, GetContactsFailure, GetContactsSuccess, CreateContactSuccess } from '../actions/contact.actions';
import * as createContact from './../actions/contact.actions';
import { AddAlert } from 'src/app/alerts/store/alert.actions';
import { Alert } from 'src/app/alerts/models/alert';

@Injectable()
export class ContactEffects {
    constructor(
        private contactService: ContactService,
        private actions: Actions
    ) { }


    @Effect()
    getContacts$ = this.actions.pipe(
        ofType<GetContacts>(ContactActionTypes.GetContacts),
        mergeMap(() =>
            this.contactService.getContacts().pipe(
                mergeMap((contact: Contact[]) => of(new GetContactsSuccess(contact))),
                catchError((error: any) => {
                    console.log(error.statusText);
                    return of(new GetContactsFailure(error.statusText))
                })
            )));

    @Effect()
    createContact$ = this.actions.pipe(
        ofType<CreateContact>(ContactActionTypes.CreateContact),
        map((action: createContact.CreateContact) => action.payload),
        mergeMap((contact: Contact) =>
            this.contactService.createContact(contact).pipe(
                switchMap((newContact: Contact) => {
                    const alert: Alert = {
                        type: 'success',
                        message: 'Successfully created contact!'
                    };
                    return [
                        new AddAlert(alert),
                        new CreateContactSuccess(newContact)]
                }),
                catchError((error: any) => {
                    console.log(error.statusText);
                    return of(new GetContactsFailure(error.statusText))
                })
            )
        ));

}