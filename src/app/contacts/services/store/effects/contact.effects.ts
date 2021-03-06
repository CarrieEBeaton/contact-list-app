import { Injectable } from "@angular/core";
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, switchMap, tap } from 'rxjs/operators';
import { Alert } from 'src/app/alerts/models/alert';
import { AddAlert } from 'src/app/alerts/store/alert.actions';
import { Contact } from 'src/app/contacts/models/contact';
import { HideLoading } from 'src/app/loading/store/loading.action';
import { ContactService } from '../../contact.service';
import {
    ContactActionTypes,
    ContactListRedirect, CreateContact,
    CreateContactFailure, CreateContactSuccess, DeleteContact,
    DeleteContactFailure, DeleteContactSuccess, GetContacts, GetContactsFailure, GetContactsSuccess,

    UpdateContact, UpdateContactSuccess, UpdateContactFailure
} from '../actions/contact.actions';

// A state management layer handles the difficult problem of separating state management from the rest of the application.
// This will keep components pure and handle side-effects related to business logic.

@Injectable()
export class ContactEffects {
    constructor(
        private contactService: ContactService,
        private actions: Actions,
        private router: Router
    ) { }


    @Effect()
    getContacts$ = this.actions.pipe(
        ofType<GetContacts>(ContactActionTypes.GetContacts),
        mergeMap(() =>
            this.contactService.getContacts().pipe(
                mergeMap((contact: Contact[]) => [
                    new GetContactsSuccess(contact),
                    new HideLoading()
                ]),
                catchError((error: any) => {
                    const alert: Alert = {
                        type: 'danger',
                        message: error  
                    };
                    // An array of actions can be dispatched on sussess or error to turn off the loading and add alerts
                    return [
                        new AddAlert(alert),
                        new GetContactsFailure(error),
                        new HideLoading()
                    ]
                })
            )));

    @Effect()
    createContact$ = this.actions.pipe(
        ofType<CreateContact>(ContactActionTypes.CreateContact),
        map((action: CreateContact) => action.payload),
        mergeMap((contact: Contact) =>
            this.contactService.createContact(contact).pipe(
                switchMap((newContact: Contact) => {
                    const alert: Alert = {
                        type: 'success',
                        message: 'Successfully created contact!'
                    };
                    // An array of actions can be dispatched on sussess or error to turn off the loading and add alerts
                    return [
                        new HideLoading(),
                        new AddAlert(alert),
                        new CreateContactSuccess(newContact),
                        new ContactListRedirect(),
                    ]
                }),
                catchError((error: string) => {

                    const alert: Alert = {
                        type: 'danger',
                        message: error 
                    };
                    return [
                        new AddAlert(alert),
                        new CreateContactFailure(error),
                        new HideLoading()
                    ]
                })
            )
        ));

    @Effect({ dispatch: false })
    redirectToContactList$ = this.actions.pipe(
        ofType(ContactActionTypes.ContactListRedirect),
        tap(() => {
            this.router.navigate(['/contacts']);
        })
    )

 
    @Effect()
    deleteContact$ = this.actions.pipe(
        ofType<DeleteContact>(ContactActionTypes.DeleteContact),
        map((action: DeleteContact) => action.payload),
        mergeMap((contact: Contact) =>
            this.contactService.deleteContact(contact).pipe(
                switchMap((newContact: Contact) => {
                    const alert: Alert = {
                        type: 'success',
                        message: 'Successfully deleted contact!'
                    };
                    return [
                        new HideLoading(),
                        new AddAlert(alert),
                        new DeleteContactSuccess(newContact)
                    ]
                }),
                catchError((error: string) => {

                    const alert: Alert = {
                        type: 'danger',
                        message: error 
                    };
                    return [
                        new AddAlert(alert),
                        new DeleteContactFailure(error),
                        new HideLoading()
                    ]
                })
            )
        ));

        @Effect()
        updateContact$ = this.actions.pipe(
            ofType<UpdateContact>(ContactActionTypes.UpdateContact),
            map((action: UpdateContact) => action.payload),
            mergeMap((contact: Contact) =>
                this.contactService.updateContact(contact).pipe(
                    switchMap((newContact: Contact) => {
                        const alert: Alert = {
                            type: 'success',
                            message: 'Successfully updated contact!'
                        };
                        return [
                            new HideLoading(),
                            new AddAlert(alert),
                            new UpdateContactSuccess(newContact),
                            new ContactListRedirect(),
                        ]
                    }),
                    catchError((error: string) => {
    
                        const alert: Alert = {
                            type: 'danger',
                            message: error 
                        };
                        return [
                            new AddAlert(alert),
                            new UpdateContactFailure(error),
                            new HideLoading()
                        ]
                    })
                )
            ));
}