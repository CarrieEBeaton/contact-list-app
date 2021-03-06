import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Injector } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ContactService } from './contact.service';
import { ContactMock } from '../testing/contact-mock';

describe('ContactService', () => {

  let injector: Injector;
  let contactService: ContactService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    injector = TestBed.configureTestingModule({
      imports:
        [HttpClientTestingModule],
      providers:
        [ContactService]
    });
    contactService = injector.get(ContactService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    const service: ContactService = TestBed.get(ContactService);
    expect(service).toBeTruthy();
  });

  it('should return expected contacts', () => {
    contactService.getContacts().subscribe(contacts => {
      expect(contacts).toBe(ContactMock.CONTACTS);
    });

    const req = httpMock.expectOne('http://demo5838836.mockable.io/contact');
    expect(req.request.method).toEqual('GET');
    req.flush(ContactMock.CONTACTS);
  });
});
