import { Injectable } from "@angular/core";
import { ContactService } from '../../contact.service';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { GetContact, ContactActionTypes, GetContactSuccess } from '../actions/contact.actions';
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
        ofType<GetContact>(ContactActionTypes.GetContact),
        switchMap(() =>
            this.contactService.getContacts().pipe(
                switchMap((contact: Contact[]) => of(new GetContactSuccess(contact))),
                catchError((error: any) => {

                    console.log(error.statusText);
                    return Observable.throw(error.statusText);
                })
            )));
}