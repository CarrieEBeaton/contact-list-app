import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactContainerComponent } from './contact-container.component';
import { ContactListComponent } from '../../contact-list/contact-list.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { provideMockStore } from '@ngrx/store/testing';
import { ContactMock } from '../../services/testing/contact-mock';
import { AppState } from 'src/app/app-state/app.state';
import { ContactState } from '../../services/store/state/contact.state';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { of } from 'rxjs';

const mockContactState: ContactState = {
  selectedContact: null,
  contacts: ContactMock.CONTACTS,
  error: null
}
const mockState: AppState = {
  loading: false,
  contacts: mockContactState
}

describe('ContactContainerComponent', () => {
  let component: ContactContainerComponent;
  let fixture: ComponentFixture<ContactContainerComponent>;
  const initialState = ContactMock.CONTACTS;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NgbModule, StoreModule.forRoot([]), EffectsModule.forRoot([])],
      declarations: [ ContactContainerComponent, ContactListComponent ],
      providers: [
        provideMockStore({ initialState })
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactContainerComponent);
    component = fixture.componentInstance;
    component.contacts$ = of(ContactMock.CONTACTS);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call store dispatch on ngOnInit ', () => {
    const storeDispatch = spyOn(component.store, 'dispatch').and.callThrough();
    component.ngOnInit();
    expect(storeDispatch).toHaveBeenCalled();
  });
});
