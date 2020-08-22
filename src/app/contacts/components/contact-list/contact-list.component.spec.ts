import { Location } from '@angular/common';
import { DebugElement } from '@angular/core';
import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from 'src/app/shared/shared.module';
import { ContactMock } from '../../../shared/testing/contact-mock';
import { routes } from '../../contact-routing.module';
import { ContactContainerComponent } from '../../containers/contact-container/contact-container.component';
import { ContactEditContainerComponent } from '../../containers/contact-edit-container/contact-edit-container.component';
import { SearchPipe } from '../../pipes/search.pipe';
import { ContactEditComponent } from '../contact-edit/contact-edit.component';
import { ContactListComponent } from './contact-list.component';

describe('ContactListComponent', () => {
  let component: ContactListComponent;
  let fixture: ComponentFixture<ContactListComponent>;
  let debugElement: DebugElement;
  let location: Location;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        NgbModule,
        ReactiveFormsModule,
        FormsModule,
        RouterTestingModule.withRoutes(routes),
        SharedModule
      ],
      declarations: [
        ContactListComponent,
        ContactContainerComponent,
        ContactEditContainerComponent,
        ContactEditComponent,
        SearchPipe]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactListComponent);
    location = TestBed.get(Location);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    component.contacts = ContactMock.CONTACTS;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should populate table with correct data for firstName', () => {
    let tableRows = debugElement.queryAll(By.css('tr'));
    let row1 = tableRows[1];
    let tdFirstName = row1.query(By.css('#first-name')).nativeElement.innerHTML;
    expect(tdFirstName).toContain(ContactMock.CONTACTS[0].firstName);
  });

  it('should populate table with correct data for lastName', () => {
    let tableRows = debugElement.queryAll(By.css('tr'));
    let row1 = tableRows[1];
    let tdLastName = row1.query(By.css('#last-name')).nativeElement.innerHTML;
    expect(tdLastName).toContain(ContactMock.CONTACTS[0].lastName);
  });

  it('should populate table with correct data for company', () => {
    let tableRows = debugElement.queryAll(By.css('tr'));
    let row1 = tableRows[1];
    let tdCompany = row1.query(By.css('#company')).nativeElement.innerHTML;
    expect(tdCompany).toContain(ContactMock.CONTACTS[0].company);
  });

  it('should populate table with correct data for email', () => {
    let tableRows = debugElement.queryAll(By.css('tr'));
    let row1 = tableRows[1];
    let tdEmail = row1.query(By.css('#email')).nativeElement.innerHTML;
    expect(tdEmail).toContain(ContactMock.CONTACTS[0].email);
  });

  it('should populate table with correct data for phone', () => {
    let tableRows = debugElement.queryAll(By.css('tr'));
    let row1 = tableRows[1];
    let tdPhone = row1.query(By.css('#phone')).nativeElement.innerHTML;
    expect(tdPhone).toContain(ContactMock.CONTACTS[0].phone);
  });

  it('should populate table with correct data for address', () => {
    let tableRows = debugElement.queryAll(By.css('tr'));
    let row1 = tableRows[1];
    let tdAddress = row1.query(By.css('#address')).nativeElement.innerHTML;
    expect(tdAddress).toContain(ContactMock.CONTACTS[0].address);
  });

  it('should emit deleteContact on delete', () => {
    const deleteContact = spyOn(component.deleteContact, 'emit');
    component.delete(ContactMock.CONTACTS[0]);
    expect(deleteContact).toHaveBeenCalledWith(ContactMock.CONTACTS[0]);
  });

  it('should  call create router path with 0 for the id when the create button is clicked', fakeAsync(() => {
    let createBtn = debugElement.query(By.css('#createBtn')).nativeElement;
    const expectedPath = '/create/' + 0;
    createBtn.click();
    fixture.detectChanges();
    tick();
    expect(location.path()).toBe(expectedPath);
  }));

  it('should  call create router path with contact id when the editLink is clicked', fakeAsync(() => {
    let editLink = debugElement.query(By.css('#editLink')).nativeElement;
    const expectedPath = '/create/' + ContactMock.CONTACTS[0]._id;
    editLink.click();
    fixture.detectChanges();
    tick();
    expect(location.path()).toBe(expectedPath);
  }));
});
