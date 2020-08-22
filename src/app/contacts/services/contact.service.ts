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
      errorMessage = `An error occured: ${err.error.message}`;
    } else {
      errorMessage = `Server error code  ${err.status} ${err.statusText}: ${err.message}`;
    }
    console.log(err);
    return throwError(errorMessage);
  }
}
