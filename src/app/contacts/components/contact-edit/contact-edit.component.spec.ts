import { DebugElement } from '@angular/core';
import { async, ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ContactEditComponent } from './contact-edit.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('ContactEditComponent', () => {
  let component: ContactEditComponent;
  let fixture: ComponentFixture<ContactEditComponent>;
  let debugElement: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, RouterTestingModule],
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

  it('should have valid forms with valid data', () => {
    //Arrange
    let createBtn = debugElement.nativeElement.querySelector('#createBtn');
    setForm();
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
  });

  it('should have invalid property with invalid data for required fields', () => {
    //Arrange
    component.contactForm.controls['firstName'].setValue('');
    fixture.detectChanges();
    //Assert
    expect(component.contactForm.controls['firstName'].valid).toBeFalsy();

  });

  it('should have invalid property with invalid data for email format', () => {
    //Arrange
    component.contactForm.controls['email'].setValue('e.com');
    fixture.detectChanges();
    //Assert
    expect(component.contactForm.controls['email'].valid).toBeFalsy();

  });

  it('should call save Contact on click of save', () => {
    //Arrange
    const createContact = spyOn(component, 'saveContact');
    let createBtn = debugElement.nativeElement.querySelector('#createBtn');
    setForm();
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
  });

  function setForm() {
    component.contactForm.controls['firstName'].setValue('firstName');
    component.contactForm.controls['lastName'].setValue('lastName');
    component.contactForm.controls['company'].setValue('company');
    component.contactForm.controls['email'].setValue('email@email.com');
    component.contactForm.controls['phone'].setValue('458-123-1234');
    component.contactForm.controls['address'].setValue('address');
  }

});
