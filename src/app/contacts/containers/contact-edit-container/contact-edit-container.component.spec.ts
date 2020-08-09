import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactEditContainerComponent } from './contact-edit-container.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { RouterTestingModule } from '@angular/router/testing';
import { ContactEditComponent } from '../../components/contact-edit/contact-edit.component';
import { ContactMock } from '../../../shared/testing/contact-mock';
import { provideMockStore } from '@ngrx/store/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('ContactEditContainerComponent', () => {
  let component: ContactEditContainerComponent;
  let fixture: ComponentFixture<ContactEditContainerComponent>;
  let storeDispatch;
  const initialState = ContactMock.CONTACTS;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        NgbModule, 
        FormsModule, 
        ReactiveFormsModule, 
        StoreModule.forRoot([]), 
        EffectsModule.forRoot([]),
        RouterTestingModule
      ],
      declarations: [ ContactEditContainerComponent, ContactEditComponent],
      providers: [
        provideMockStore({ initialState }),
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({id: 0})
          }
        }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactEditContainerComponent);
    component = fixture.componentInstance;
    component.selectedContact$ = of(ContactMock.CONTACTS[0]);
    storeDispatch = spyOn(component.store, 'dispatch').and.callThrough();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call store dispatch on new contact ', () => {
    component.newContact(ContactMock.CONTACTS[0]);
    expect(storeDispatch).toHaveBeenCalled();
  });
});
