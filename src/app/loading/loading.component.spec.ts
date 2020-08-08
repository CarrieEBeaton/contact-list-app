import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingComponent } from './loading.component';
import { DebugElement } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { StoreModule } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { initialState } from './../shared/testing/initalState-mock';
import { iif, of } from 'rxjs';
import { By } from '@angular/platform-browser';

describe('LoadingComponent', () => {
  let component: LoadingComponent;
  let fixture: ComponentFixture<LoadingComponent>;
  let debugElement: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NgbModule, StoreModule.forRoot([])],
      declarations: [ LoadingComponent ],
      providers: [
        provideMockStore({ initialState })
    ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadingComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not show spinner if loading is false', () => {
    component.isLoading = of(false);
    fixture.detectChanges();
    const spinner = debugElement.query(By.css('#spinner'));
    expect(spinner).toBeNull();
  });
  
  it('should show spinner if loading is true', () => {
    component.isLoading = of(false);
    fixture.detectChanges();
    const spinner = debugElement.query(By.css('#spinner'));
    expect(spinner).toBeDefined();
  });
});
