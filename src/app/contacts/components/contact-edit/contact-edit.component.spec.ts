import { async, ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';

import { ContactEditComponent } from './contact-edit.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('ContactEditComponent', () => {
  let component: ContactEditComponent;
  let fixture: ComponentFixture<ContactEditComponent>;
  let debugElement: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [ContactEditComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactEditComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  fit('should emit create on save click', fakeAsync(() => {
    //Arrange
    const createContact = spyOn(component, 'saveContact');
    let createBtn = debugElement.nativeElement.querySelector('#createBtn');
    component.contactForm.controls['firstName'].setValue('firstName');
    component.contactForm.controls['lastName'].setValue('lastName');
    component.contactForm.controls['company'].setValue('company');
    component.contactForm.controls['email'].setValue('email@email.com');
    component.contactForm.controls['phone'].setValue('458-123-1234');
    component.contactForm.controls['address'].setValue('address');
    fixture.detectChanges();

    createBtn.click();

    //Assert
    expect(component.contactForm.controls['firstName'].valid).toBeTruthy();
    expect(component.contactForm.controls['lastName'].valid).toBeTruthy();
    expect(component.contactForm.controls['company'].valid).toBeTruthy();
    expect(component.contactForm.controls['email'].valid).toBeTruthy();
    expect(component.contactForm.controls['phone'].valid).toBeTruthy();
    expect(component.contactForm.controls['address'].valid).toBeTruthy();
    expect(component.contactForm.valid).toBeTruthy();
    expect(createBtn.disabled).toBeFalsy();
    expect(createContact).toHaveBeenCalled()
  }));
});
