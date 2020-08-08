import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { of } from 'rxjs';
import { initialState } from './../shared/testing/initalState-mock';
import { AlertsComponent } from './alerts.component';
import { Alert } from './models/alert';

describe('AlertsComponent', () => {

    let component: AlertsComponent;
    let fixture: ComponentFixture<AlertsComponent>;
    let debugElement: DebugElement;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                NgbModule,
                StoreModule.forRoot([]),
                EffectsModule.forRoot([])
            ],
            declarations: [
                AlertsComponent
            ],
            providers: [
                provideMockStore({ initialState })
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AlertsComponent);
        component = fixture.componentInstance;
        debugElement = fixture.debugElement;
        fixture.detectChanges();
      });

    it('should create the app', () => {
        const fixture = TestBed.createComponent(AlertsComponent);
        const app = fixture.debugElement.componentInstance;
        expect(app).toBeTruthy();
    });

    it('should show success alert', () => {
        const alert: Alert[] = [{
            type: 'success',
            message: 'Contact successfully created'
        }];
        component.alerts = of(alert);
        fixture.detectChanges();
        const ngbAlert = debugElement.query(By.css('#alert'));
        expect(ngbAlert).toBeDefined();
        expect(ngbAlert.attributes['ng-reflect-type']).toBe('success');
    }); 

});
