import { combineReducers } from '@reduxjs/toolkit';

import { authReducer } from '@/redux/reducers/Auth';
import { idleOverlayReducer } from '@/redux/reducers/IdleOverlay';
import { loadingOverlayReducer } from '@/redux/reducers/LoadingOverlay';
import { reloginReducer } from '@/redux/reducers/Relogin';

const rootReducers = combineReducers({
  auth: authReducer,
  relogin: reloginReducer,
  loadingOverlay: loadingOverlayReducer,
  idleOverlay: idleOverlayReducer
});

export default rootReducers;