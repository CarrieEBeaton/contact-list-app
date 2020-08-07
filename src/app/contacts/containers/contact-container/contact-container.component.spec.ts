import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { of } from 'rxjs';
import { AppState } from 'src/app/app-state/app.state';
import { ContactListComponent } from '../../contact-list/contact-list.component';
import { SearchPipe } from '../../pipes/search.pipe';
import { ContactState } from '../../services/store/state/contact.state';
import { ContactMock } from '../../services/testing/contact-mock';
import { ContactContainerComponent } from './contact-container.component';


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
      imports: [NgbModule, 
        FormsModule, 
        ReactiveFormsModule, 
        StoreModule.forRoot([]), 
        EffectsModule.forRoot([])],
      declarations: [ContactContainerComponent, ContactListComponent, SearchPipe],
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
