import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, switchMap, tap } from 'rxjs/operators';
import { Contact } from 'src/app/contacts/models/contact';
import { ContactService } from '../../contact.service';
import { ContactActionTypes, CreateContact, GetContacts, GetContactsFailure, GetContactsSuccess, CreateContactSuccess, ContactListRedirect, CreateContactFailure } from '../actions/contact.actions';
import { AddAlert } from 'src/app/alerts/store/alert.actions';
import { Alert } from 'src/app/alerts/models/alert';
import { Router } from '@angular/router';
import { HideLoading } from 'src/app/loading/store/loading.action';
import { HttpErrorResponse } from '@angular/common/http';

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
                        message: `Error ${error.status} ${error.statusText}: ${error.message}` 
                    };
                    return [
                        new AddAlert(alert),
                        new GetContactsFailure(error.statusText),
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
                    return [
                        new HideLoading(),
                        new AddAlert(alert),
                        new CreateContactSuccess(newContact),
                        new ContactListRedirect(),
                    ]
                }),
                catchError((error: HttpErrorResponse) => {

                    const alert: Alert = {
                        type: 'danger',
                        message: `Error ${error.status} ${error.statusText}: ${error.message}` 
                    };
                    return [
                        new AddAlert(alert),
                        new CreateContactFailure(error.statusText),
                        new HideLoading()
                    ]
                })
            )
        ));

    @Effect({ dispatch: false })
    redirectToContactList$ = this.actions.pipe(
        ofType(ContactActionTypes.ContactListRedirect),
        tap(() => {
            this.router.navigate(['/home']);
        })
    )

}