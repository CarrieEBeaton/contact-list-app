import { Injectable } from '@angular/core';
import { Observable, throwError, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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
    return this.http.get<Contact[]>(this.contactUrl);
  }

  createContact(contact: Contact): Observable<Contact> {
    console.log('Create Contact: ' + JSON.stringify(contact));
    return of(contact);
  }

}
