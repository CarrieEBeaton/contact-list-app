import { HttpClientModule } from '@angular/common/http';
import { async, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { AlertsComponent } from './alerts/alerts.component';
import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import { HeaderComponent } from './navigation/header/header.component';
import { initialState } from './shared/testing/initalState-mock';
import { LoadingComponent } from './loading/loading.component';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientModule,
        NgbModule,
        StoreModule.forRoot([]),
        EffectsModule.forRoot([])
      ],
      declarations: [
        AppComponent,
        HeaderComponent,
        HomePageComponent,
        AlertsComponent,
        LoadingComponent
      ],
      providers: [
        provideMockStore({initialState})
      ]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });
  
});
