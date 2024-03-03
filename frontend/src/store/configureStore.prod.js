import { configureStore } from '@reduxjs/toolkit';
import rootReducer from '../reducers/rootReducer';
import thunk from 'redux-thunk';

export default function configureStore(initialState) {
  return configureStore({
    reducer: rootReducer,
    middleware: [thunk],
    preloadedState: initialState,
    // Optionally, you can enable additional Redux Toolkit features here,
    // such as devTools, immutableCheck, serializableCheck, etc.
  });
}
