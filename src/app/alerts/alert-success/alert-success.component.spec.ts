import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertSuccessComponent } from './alert-success.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { provideMockStore } from '@ngrx/store/testing';
import { initialState } from './../../shared/testing/initalState-mock';
import { of } from 'rxjs';
import { getAlertMock } from 'src/app/shared/testing/alert-mock';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('AlertSuccessComponent', () => {
  let component: AlertSuccessComponent;
  let fixture: ComponentFixture<AlertSuccessComponent>;
  let debugElement: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        NgbModule,
        StoreModule.forRoot([]),
        EffectsModule.forRoot([])
      ],
      declarations: [AlertSuccessComponent],
      providers: [
        provideMockStore({ initialState })
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertSuccessComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show danger alert', () => {
    component.alerts = of([getAlertMock('Successfully created contact!')]);
    fixture.detectChanges();
    const ngbAlert = debugElement.query(By.css('#toast'));
    expect(ngbAlert).toBeDefined();
    expect(ngbAlert.nativeElement.textContent.trim()).toBe('Successfully created contact!');
  });
});
