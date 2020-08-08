import { AppState } from 'src/app/app-state/app.state';
import { createSelector } from '@ngrx/store';
import { LoadingState } from './loading.reducers';

export const isLoading = (state: AppState) => state.loading;
 
export const getIsLoading = createSelector(
    isLoading,
  (state: LoadingState) => state.loading
);