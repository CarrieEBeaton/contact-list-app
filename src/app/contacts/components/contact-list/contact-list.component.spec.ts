import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactListComponent } from './contact-list.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchPipe } from '../../pipes/search.pipe';
import { ContactMock } from '../../../shared/testing/contact-mock';
import { RouterTestingModule } from '@angular/router/testing';
import { SharedModule } from 'src/app/shared/shared.module';

describe('ContactListComponent', () => {
  let component: ContactListComponent;
  let fixture: ComponentFixture<ContactListComponent>;
  let debugElement: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        NgbModule, 
        ReactiveFormsModule, 
        FormsModule, 
        RouterTestingModule,
        SharedModule
      ],
      declarations: [ ContactListComponent, SearchPipe ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactListComponent);
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
    let tdAddress= row1.query(By.css('#address')).nativeElement.innerHTML;
    expect(tdAddress).toContain(ContactMock.CONTACTS[0].address);
  });

  it('should emit deleteContact on delete', () => {
    const deleteContact = spyOn(component.deleteContact, 'emit');
    component.delete(ContactMock.CONTACTS[0]);
    expect(deleteContact).toHaveBeenCalledWith(ContactMock.CONTACTS[0]);
  });
});
