import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Actions } from '@ngrx/effects';
import { provideMockActions } from '@ngrx/effects/testing';
import { cold, hot } from 'jasmine-marbles';
import { Observable, of } from "rxjs";
import { ContactService } from '../../contact.service';
import { ContactMock } from '../../testing/contact-mock';
import { ContactActions } from '../actions/contact.actions';
import * as ContactAction from './../actions/contact.actions';
import { ContactEffects } from './contact.effects';

describe('ContactEffects', () => {
    let actions: Observable<ContactActions>;
    let effects: ContactEffects;
    let service: ContactService;
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
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
        const action = new ContactAction.GetContact();
        const result = new ContactAction.GetContactSuccess(ContactMock.CONTACTS);

        actions = hot('-a--', { a: action});
        const expected = cold('-(b)', { b: result});
        //Assert
        expect(effects.getContacts$).toBeObservable(expected);
    })

});