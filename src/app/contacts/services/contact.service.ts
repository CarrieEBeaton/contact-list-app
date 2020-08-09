import { Injectable } from '@angular/core';
import { Observable, throwError, of } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Contact } from '../models/contact';
import { tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private contactUrl: string;
  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });

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
