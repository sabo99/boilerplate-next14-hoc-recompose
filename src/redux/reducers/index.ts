import { combineReducers } from '@reduxjs/toolkit';

import { loadingOverlayReducer } from '@/redux/reducers/LoadingOverlay';

const rootReducers = combineReducers({
  loadingOverlay: loadingOverlayReducer
});

export default rootReducers;