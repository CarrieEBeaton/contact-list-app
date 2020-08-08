import { LoadingAction, LoadingActionTypes } from './loading.action';

export interface LoadingState {
    loading: boolean;
}
export const initialLoadingState: LoadingState = {
    loading: false
}

export function loadingReducer(state: LoadingState = initialLoadingState, action: LoadingAction): LoadingState {
    switch (action.type) {
        case LoadingActionTypes.ShowLoading: {
            return {
                ...state,
                loading: true
            }
        }
        case LoadingActionTypes.HideLoading: {
            return {
                ...state,
                loading: false
            }
        }
        default: {
            return state;
        }
    }
}