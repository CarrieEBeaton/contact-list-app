import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Actions } from '@ngrx/effects';
import { provideMockActions } from '@ngrx/effects/testing';
import { cold, hot } from 'jasmine-marbles';
import { Observable, of, observable, throwError } from "rxjs";
import { ContactService } from '../../contact.service';
import { ContactMock } from '../../../../shared/testing/contact-mock';
import { ContactActions } from '../actions/contact.actions';
import * as ContactAction from './../actions/contact.actions';
import { ContactEffects } from './contact.effects';
import { RouterTestingModule } from '@angular/router/testing';
import * as  AlertAction from './../../../../alerts/store/alert.actions';
import { ALERT, ALERTERROR } from 'src/app/shared/testing/alert-mock';
import * as LoadingAction from './../../../../loading/store/loading.action';
import { HttpErrorResponse } from '@angular/common/http';

describe('ContactEffects', () => {
    let actions: Observable<ContactActions>;
    let effects: ContactEffects;
    let service: ContactService;
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule, RouterTestingModule],
            providers: [ContactEffects,
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

        actions = hot('-a--', { a: action});
        const expected = cold('-(bc)', { b: result, c: hideLoadingResult});
        //Assert
        expect(effects.getContacts$).toBeObservable(expected);
    });

    it('should add alert, get contact faliure and hide loading on get contact error', () => {

        const mockErrorResponse = {status: 404, statusText: 'Bad Request', message: 'Invalid Input Params'}
        const error= throwError(mockErrorResponse);
        //Arrange
        spyOn(service, 'getContacts').and.returnValue(
            error
        );

        //Act
        const action = new ContactAction.GetContacts();
        const alertResult = new AlertAction.AddAlert(ALERTERROR);
        const contactResult = new ContactAction.GetContactsFailure('Bad Request');
        const hideLoadingResult = new LoadingAction.HideLoading();


        actions = hot('-a----', { a: action});
        const expected = cold('-(bcd)', { b: alertResult, c: contactResult, d: hideLoadingResult});
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


        actions = hot('-a----', { a: action});
        const expected = cold('-(bcde)', { b: hideLoadingResult, c: alertResult, d: contactResult, e: redirectResult });
        //Assert
        expect(effects.createContact$).toBeObservable(expected);
    });

    it('should add alert, create contact faliure and hide loading on create contact error', () => {

        const mockErrorResponse = {status: 404, statusText: 'Bad Request', message: 'Invalid Input Params'}
        const error= throwError(mockErrorResponse);
        //Arrange
        spyOn(service, 'createContact').and.returnValue(
            error
        );

        //Act
        const action = new ContactAction.CreateContact(ContactMock.CONTACTS[0]);
        const alertResult = new AlertAction.AddAlert(ALERTERROR);
        const contactResult = new ContactAction.CreateContactFailure('Bad Request');
        const hideLoadingResult = new LoadingAction.HideLoading();


        actions = hot('-a----', { a: action});
        const expected = cold('-(bcd)', { b: alertResult, c: contactResult, d: hideLoadingResult});
        //Assert
        expect(effects.createContact$).toBeObservable(expected);
    });

});