import { configureStore } from '@reduxjs/toolkit'
import themeReducer from './ui';


const store = configureStore({
    reducer: {
      theme: themeReducer,
    },
  });
  export default store;