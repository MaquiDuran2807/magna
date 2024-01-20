// store.ts
import { configureStore } from '@reduxjs/toolkit';

import authReducer from './redux/reducers/authSlice';
import serviciosIdSlice from './redux/reducers/serviciosIdSlice'; 
import equiposSlice from './redux/reducers/equipSlice';
import projectsSlice from './redux/reducers/projectsSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    serviciosId: serviciosIdSlice,
    equipos: equiposSlice,
    projects: projectsSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;