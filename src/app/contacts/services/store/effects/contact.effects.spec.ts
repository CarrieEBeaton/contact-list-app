import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Actions } from '@ngrx/effects';
import { provideMockActions } from '@ngrx/effects/testing';
import { cold, hot } from 'jasmine-marbles';
import { Observable, of, throwError } from "rxjs";
import { ALERT, getAlertMock } from 'src/app/shared/testing/alert-mock';
import { ContactMock } from '../../../testing/contact-mock';
import { ContactService } from '../../contact.service';
import { ContactActions } from '../actions/contact.actions';
import * as AlertAction from './../../../../alerts/store/alert.actions';
import * as LoadingAction from './../../../../loading/store/loading.action';
import * as ContactAction from './../actions/contact.actions';
import { ContactEffects } from './contact.effects';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';

describe('ContactEffects', () => {
    let actions: Observable<ContactActions>;
    let effects: ContactEffects;
    let service: ContactService;

    let router = {
        navigate: jasmine.createSpy('navigate')
    };
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule, RouterTestingModule],
            providers: [ContactEffects,
                { provide: Router, useValue: router },
                provideMockActions(() => actions)]
        })
        effects = TestBed.get(ContactEffects);
        service = TestBed.get(ContactService);
        actions = TestBed.get(Actions);
    });

    it('should initialize effects', () => {
        expect(effects).toBeTruthy();
    });

    it('should get contact success on get contact action call', () => {
        //Arrange
        spyOn(service, 'getContacts').and.returnValue(
            of(ContactMock.CONTACTS)
        );

        //Act
        const action = new ContactAction.GetContacts();
        const result = new ContactAction.GetContactsSuccess(ContactMock.CONTACTS);
        const hideLoadingResult = new LoadingAction.HideLoading();

        actions = hot('-a--', { a: action });
        const expected = cold('-(bc)', { b: result, c: hideLoadingResult });
        //Assert
        expect(effects.getContacts$).toBeObservable(expected);
    });

    it('should add alert, get contact faliure and hide loading on get contact error', () => {

        const mockErrorResponse = `Server error code 404 Bad Request: Invalid Input Param`;
        const error = throwError(mockErrorResponse);
        //Arrange
        spyOn(service, 'getContacts').and.returnValue(
            error
        );

        //Act
        const action = new ContactAction.GetContacts();
        const alertResult = new AlertAction.AddAlert(getAlertMock('Server error code 404 Bad Request: Invalid Input Param', 'danger'));
        const contactResult = new ContactAction.GetContactsFailure(mockErrorResponse);
        const hideLoadingResult = new LoadingAction.HideLoading();


        actions = hot('-a----', { a: action });
        const expected = cold('-(bcd)', { b: alertResult, c: contactResult, d: hideLoadingResult });
        //Assert
        expect(effects.getContacts$).toBeObservable(expected);
    });

    it('should add alert, create contact success and redirection on create contact action call', () => {
        //Arrange
        spyOn(service, 'createContact').and.returnValue(
            of(ContactMock.CONTACTS[0])
        );

        //Act
        const action = new ContactAction.CreateContact(ContactMock.CONTACTS[0]);
        const alertResult = new AlertAction.AddAlert(ALERT[0]);
        const contactResult = new ContactAction.CreateContactSuccess(ContactMock.CONTACTS[0]);
        const redirectResult = new ContactAction.ContactListRedirect();
        const hideLoadingResult = new LoadingAction.HideLoading();


        actions = hot('-a----', { a: action });
        const expected = cold('-(bcde)', { b: hideLoadingResult, c: alertResult, d: contactResult, e: redirectResult });
        //Assert
        expect(effects.createContact$).toBeObservable(expected);
    });

    it('should add alert, create contact faliure and hide loading on create contact error', () => {

        const mockErrorResponse = `Server error code 404 Bad Request: Invalid Input Param`;
        const error = throwError(mockErrorResponse);
        //Arrange
        spyOn(service, 'createContact').and.returnValue(
            error
        );

        //Act
        const action = new ContactAction.CreateContact(ContactMock.CONTACTS[0]);
        const alertResult = new AlertAction.AddAlert(getAlertMock('Server error code 404 Bad Request: Invalid Input Param', 'danger'));
        const contactResult = new ContactAction.CreateContactFailure(mockErrorResponse);
        const hideLoadingResult = new LoadingAction.HideLoading();


        actions = hot('-a----', { a: action });
        const expected = cold('-(bcd)', { b: alertResult, c: contactResult, d: hideLoadingResult });
        //Assert
        expect(effects.createContact$).toBeObservable(expected);
    });

    it('should add alert, hide loading, update contact success and redirection on update contact action call', () => {
        //Arrange
        spyOn(service, 'updateContact').and.returnValue(
            of(ContactMock.CONTACTS[0])
        );

        //Act
        const action = new ContactAction.UpdateContact(ContactMock.CONTACTS[0]);
        const alertResult = new AlertAction.AddAlert(getAlertMock('Successfully updated contact!'));
        const contactResult = new ContactAction.UpdateContactSuccess(ContactMock.CONTACTS[0]);
        const redirectResult = new ContactAction.ContactListRedirect();
        const hideLoadingResult = new LoadingAction.HideLoading();


        actions = hot('-a----', { a: action });
        const expected = cold('-(bcde)', { b: hideLoadingResult, c: alertResult, d: contactResult, e: redirectResult });
        //Assert
        expect(effects.updateContact$).toBeObservable(expected);
    });

    it('should add alert, update contact faliure and hide loading on update contact error', () => {

        const mockErrorResponse = `Server error code 404 Bad Request: Invalid Input Param`;
        const error = throwError(mockErrorResponse);
        //Arrange
        spyOn(service, 'updateContact').and.returnValue(
            error
        );

        //Act
        const action = new ContactAction.UpdateContact(ContactMock.CONTACTS[0]);
        const alertResult = new AlertAction.AddAlert(getAlertMock('Server error code 404 Bad Request: Invalid Input Param', 'danger'));
        const contactResult = new ContactAction.UpdateContactFailure(mockErrorResponse);
        const hideLoadingResult = new LoadingAction.HideLoading();


        actions = hot('-a----', { a: action });
        const expected = cold('-(bcd)', { b: alertResult, c: contactResult, d: hideLoadingResult });
        //Assert
        expect(effects.updateContact$).toBeObservable(expected);
    });

    it('should add alert, hide loading, delete contact success on delete contact action call', () => {
        //Arrange
        spyOn(service, 'deleteContact').and.returnValue(
            of(ContactMock.CONTACTS[0])
        );

        //Act
        const action = new ContactAction.DeleteContact(ContactMock.CONTACTS[0]);
        const alertResult = new AlertAction.AddAlert(getAlertMock('Successfully deleted contact!'));
        const contactResult = new ContactAction.DeleteContactSuccess(ContactMock.CONTACTS[0]);
        const hideLoadingResult = new LoadingAction.HideLoading();


        actions = hot('-a----', { a: action });
        const expected = cold('-(bcd)', { b: hideLoadingResult, c: alertResult, d: contactResult });
        //Assert
        expect(effects.deleteContact$).toBeObservable(expected);
    });

    it('should add alert, delete contact faliure and hide loading on update contact error', () => {

        const mockErrorResponse = `Server error code 404 Bad Request: Invalid Input Param`;
        const error = throwError(mockErrorResponse);
        //Arrange
        spyOn(service, 'deleteContact').and.returnValue(
            error
        );

        //Act
        const action = new ContactAction.DeleteContact(ContactMock.CONTACTS[0]);
        const alertResult = new AlertAction.AddAlert(getAlertMock('Server error code 404 Bad Request: Invalid Input Param', 'danger'));
        const contactResult = new ContactAction.DeleteContactFailure(mockErrorResponse);
        const hideLoadingResult = new LoadingAction.HideLoading();


        actions = hot('-a----', { a: action });
        const expected = cold('-(bcd)', { b: alertResult, c: contactResult, d: hideLoadingResult });
        //Assert
        expect(effects.deleteContact$).toBeObservable(expected);
    });

    it('should navigate to the Contact List page', () => {
        //Arrange
        const action = new ContactAction.ContactListRedirect();
        //Act
        actions = cold('-a----', { a: action });
        //Assert
        effects.deleteContact$.pipe(
            take(1)
        ).subscribe(() => {
            expect(router.navigate).toHaveBeenCalled();
        });
    });
});