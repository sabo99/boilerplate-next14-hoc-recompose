import { combineReducers } from '@reduxjs/toolkit';

import { authReducer } from '@/redux/reducers/Auth';
import { idleOverlayReducer } from '@/redux/reducers/IdleOverlay';
import { loadingOverlayReducer } from '@/redux/reducers/LoadingOverlay';

const rootReducers = combineReducers({
  auth: authReducer,
  loadingOverlay: loadingOverlayReducer,
  idleOverlay: idleOverlayReducer
});

export default rootReducers;