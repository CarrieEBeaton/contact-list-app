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
import { SharedModule } from 'src/app/shared/shared.module';

describe('ContactContainerComponent', () => {
  let component: ContactContainerComponent;
  let fixture: ComponentFixture<ContactContainerComponent>;
  let storeDispatch;
  const initialState = [ContactMock.CONTACTS];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        NgbModule, 
        FormsModule, 
        ReactiveFormsModule, 
        StoreModule.forRoot([]), 
        EffectsModule.forRoot([]),
        RouterTestingModule,
        SharedModule
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
    storeDispatch = spyOn(component.store, 'dispatch').and.callThrough();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not call store dispatch on ngOnInit if contacts are in the list', () => {
    component.ngOnInit();
    expect(storeDispatch).not.toHaveBeenCalled();
  });

  it('should call store dispatch on ngOnInit if no contacts are in the list', () => {
    component.contacts$ = of([]);
    component.ngOnInit();
    expect(storeDispatch).toHaveBeenCalled();
  });

  it('should call store dispatch on delete contact ', () => {
    component.deleteContact(ContactMock.CONTACTS[0]);
    expect(storeDispatch).toHaveBeenCalled();
  });
});
