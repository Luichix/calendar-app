import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import calendar from './calendarSlice';

export type RootState = {
  calendar: ReturnType<typeof calendar>;
};

export const rootStore = configureStore({
  reducer: combineReducers({
    calendar,
  }),
});

export const useAppDispatch = () => useDispatch<AppDispatch>();
export type AppDispatch = typeof rootStore.dispatch;
