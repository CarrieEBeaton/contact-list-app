import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../app-state/app.state';
import { getIsLoading } from './store/loading.selectors';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit {

  // A loading screen helps the user know that the app is waiting for a response from a server
  isLoading: Observable<boolean> = this.store.select(getIsLoading);

  constructor(public store: Store<AppState>) { }

  ngOnInit() {
  }

}
