import { Injectable } from "@angular/core";
import { ContactService } from '../../contact.service';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { GetContacts, ContactActionTypes, GetContactsSuccess, GetContactsFailure } from '../actions/contact.actions';
import { catchError, switchMap } from 'rxjs/operators';
import { Contact } from 'src/app/contacts/models/contact';
import { of, Observable } from 'rxjs';

@Injectable()
export class ContactEffects {
    constructor(
        private contactService: ContactService,
        private actions: Actions
    ) { }

    @Effect()
    getContacts$ = this.actions.pipe(
        ofType<GetContacts>(ContactActionTypes.GetContacts),
        switchMap(() =>
            this.contactService.getContacts().pipe(
                switchMap((contact: Contact[]) => of(new GetContactsSuccess(contact))),
                catchError((error: any) => {
                    console.log(error.statusText);
                    return of(new GetContactsFailure(error.statusText))
                })
            )));
}