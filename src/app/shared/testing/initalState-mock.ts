import { AppState } from 'src/app/app-state/app.state';
// Global testing mocks stored in shared for reuse
export const initialState: AppState = {
    loading: {
        loading: false
    }, 
    alerts: {
      alerts: []
    }
  }