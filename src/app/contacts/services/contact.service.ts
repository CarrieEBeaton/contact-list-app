import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Contact } from '../models/contact';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private contactUrl: string;

  constructor(private http: HttpClient) {
    this.contactUrl = "http://demo5838836.mockable.io/contact";
  }

  getContacts(): Observable<Contact[]> {
    // The catch error could call a server to log errors but here it just logs to a console 
    return this.http.get<Contact[]>(this.contactUrl).pipe(
      catchError(this.handleError)
    );
  }

  createContact(contact: Contact): Observable<Contact> {
    console.log('Create Contact: ' + JSON.stringify(contact));
    return of(contact);
  }

  deleteContact(contact: Contact): Observable<Contact> {
    console.log('Delete Contact: ' + JSON.stringify(contact));
    return of(contact);
  }

  updateContact(contact: Contact): Observable<Contact> {
    console.log('Update Contact: ' + JSON.stringify(contact));
    return of(contact);
  }

  handleError(err: HttpErrorResponse) {
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      // Log client-side or network error
      errorMessage = `An error occured: ${err.error.message}`;
    } else {
      // Log server error with message to help us understand what went wrong
      errorMessage = `Server error code  ${err.status} ${err.statusText}: ${err.message}`;
    }
    console.log(err);
    // Throw the error message up to be added to an alert message to alert the user
    return throwError(errorMessage);
  }
}
