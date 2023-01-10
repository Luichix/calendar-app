import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import reminder from './reminderSlice';
import calendar from './calendarSlice';

export type RootState = {
  calendar: ReturnType<typeof calendar>;
  reminder: ReturnType<typeof reminder>;
};

export const rootStore = configureStore({
  reducer: combineReducers({
    calendar,
    reminder,
  }),
});

export const useAppDispatch = () => useDispatch<AppDispatch>();
export type AppDispatch = typeof rootStore.dispatch;
