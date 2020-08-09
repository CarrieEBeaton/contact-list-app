import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { of } from 'rxjs';
import { initialState } from './../../shared/testing/initalState-mock';
import { AlertOtherComponent } from './alert-other.component';
import { getAlertMock } from 'src/app/shared/testing/alert-mock';

describe('AlertOtherComponent', () => {

    let component: AlertOtherComponent;
    let fixture: ComponentFixture<AlertOtherComponent>;
    let debugElement: DebugElement;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                NgbModule,
                StoreModule.forRoot([]),
                EffectsModule.forRoot([])
            ],
            declarations: [
              AlertOtherComponent
            ],
            providers: [
                provideMockStore({ initialState })
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AlertOtherComponent);
        component = fixture.componentInstance;
        debugElement = fixture.debugElement;
        fixture.detectChanges();
      });

    it('should create the app', () => {
        const fixture = TestBed.createComponent(AlertOtherComponent);
        const app = fixture.debugElement.componentInstance;
        expect(app).toBeTruthy();
    });

    it('should show danger alert', () => {
        component.alerts = of([getAlertMock('Server error code 404 Bad Request: Invalid Input Param', 'danger')]);
        fixture.detectChanges();
        const ngbAlert = debugElement.query(By.css('#alert'));
        expect(ngbAlert).toBeDefined();
        expect(ngbAlert.attributes['ng-reflect-type']).toBe('danger');
    }); 

});
