import { combineReducers } from '@reduxjs/toolkit';

import { idleOverlayReducer } from '@/redux/reducers/IdleOverlay';
import { loadingOverlayReducer } from '@/redux/reducers/LoadingOverlay';

const rootReducers = combineReducers({
  loadingOverlay: loadingOverlayReducer,
  idleOverlay: idleOverlayReducer
});

export default rootReducers;