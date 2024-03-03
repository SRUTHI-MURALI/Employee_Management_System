// if (process.env.NODE_ENV === 'production') {
//   module.exports = require('./configureStore.prod');
// } else {
//   module.exports = require('./configureStore.dev');
// }


import { configureStore } from '@reduxjs/toolkit';
import rootReducer from '../reducers/rootReducer';

const store = configureStore({
  reducer: rootReducer,
  // You don't need to manually add redux-thunk here
});

export default store;

