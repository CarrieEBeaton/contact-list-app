import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { of } from 'rxjs';
import { ContactMock } from '../../../shared/testing/contact-mock';
import { ContactListComponent } from '../../components/contact-list/contact-list.component';
import { SearchPipe } from '../../pipes/search.pipe';
import { ContactContainerComponent } from './contact-container.component';

describe('ContactContainerComponent', () => {
  let component: ContactContainerComponent;
  let fixture: ComponentFixture<ContactContainerComponent>;
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
