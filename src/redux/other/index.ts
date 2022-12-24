import * as types from './action-types';

export const prevMonth = () => ({
  type: types.CALENDAR_PREV_MONTH,
});

export const nextMonth = () => ({
  type: types.CALENDAR_NEXT_MONTH,
});

export const addReminder = (weekIndex: any, weekdayIndex: any) => ({
  type: types.ADD_REMINDER,
  payload: { weekIndex, weekdayIndex },
});

export const editReminder = (
  weekIndex: any,
  weekdayIndex: any,
  reminder: any
) => ({
  type: types.EDIT_REMINDER,
  payload: { weekIndex, weekdayIndex, reminder },
});

export const deleteReminder = (
  weekIndex: any,
  weekdayIndex: any,
  reminder: any
) => ({
  type: types.DELETE_REMINDER,
  payload: { weekIndex, weekdayIndex, reminder },
});
