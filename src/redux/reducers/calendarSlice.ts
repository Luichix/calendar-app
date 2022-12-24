import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import dayjs from 'dayjs';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import guid from '../../utils/guid';
import createCalendarMonth from './createCalendar';
dayjs.extend(weekOfYear);

// Gets the current month start week index based on 52 weeks in a year
const initialStartWeek = dayjs().startOf('month').add(0, 'month').week(); //moment().startOf('month').add(0, 'month').week();
// Gets the current month end week index based on 52 weeks in a year
const initialEndWeek = dayjs().endOf('month').add(0, 'month').week();
const currentMonth = createCalendarMonth(initialStartWeek, initialEndWeek);

console.log(currentMonth);

interface Calendar {
  currentMonthIndex: number;
  month: any;
  year: any;
}

// Initial State
const initialState: Calendar = {
  currentMonthIndex: 0,
  month: currentMonth,
  year: { 0: currentMonth }, // keep a track of the months in the year
};

export const calendarSlice = createSlice({
  name: 'calendar',
  initialState: initialState,
  reducers: {
    getPreviousMonth: (state) => {
      const prevMonthIndex = state.currentMonthIndex - 1;
      const updatedStartWeek = dayjs()
        .startOf('month')
        .add(prevMonthIndex, 'month')
        .week();
      const updatedEndWeek = dayjs()
        .endOf('month')
        .add(prevMonthIndex, 'month')
        .week();

      const updatedYearCalendar = {
        ...state.year,
        [state.currentMonthIndex]: state.month, // Save the current month
        [prevMonthIndex]: state.year[prevMonthIndex]
          ? state.year[prevMonthIndex]
          : createCalendarMonth(updatedStartWeek, updatedEndWeek),
      };

      return {
        ...state,
        currentMonthIndex: prevMonthIndex,
        month: updatedYearCalendar[prevMonthIndex],
        year: updatedYearCalendar,
      };
    },
    getNextMonth: (state) => {
      const nextMonthIndex = state.currentMonthIndex + 1;
      const updatedStartWeek = dayjs()
        .startOf('month')
        .add(nextMonthIndex, 'month')
        .week();
      const updatedEndWeek = dayjs()
        .endOf('month')
        .add(nextMonthIndex, 'month')
        .week();

      const updatedYearCalendar = {
        ...state.year,
        [state.currentMonthIndex]: state.month, // Save the current month
        [nextMonthIndex]: state.year[nextMonthIndex]
          ? state.year[nextMonthIndex]
          : createCalendarMonth(updatedStartWeek, updatedEndWeek),
      };

      return {
        ...state,
        currentMonthIndex: nextMonthIndex,
        month: updatedYearCalendar[nextMonthIndex],
        year: updatedYearCalendar,
      };
    },
    getCurrentMonth: () => initialState,

    addReminder: (state, action) => {
      const updatedMonth = state.month.map((week: any, index: any) => {
        if (action.payload.weekIndex === index) {
          const dayToUpdate = week.days[action.payload.weekdayIndex];

          dayToUpdate.reminders.push({
            text: '',
            date: dayjs(),
            category: 'home',
            open: true,
            newReminder: true,
            uuid: guid(),
            parentDayUuid: week.days[action.payload.weekdayIndex].uuid,
            grandparentUuid: week.uuid,
          });
        }

        return week;
      });

      return {
        ...state,
        month: updatedMonth,
      };
    },
    deleteReminder: (state, action) => {
      const updatedMonth = state.month.map((week: any, index: any) => {
        if (action.payload.weekIndex === index) {
          const dayToUpdate = week.days[action.payload.weekdayIndex];
          dayToUpdate.reminders = dayToUpdate.reminders.filter(
            (reminder: any) => reminder.uuid !== action.payload.reminder.uuid
          );
        }

        return week;
      });

      return {
        ...state,
        month: updatedMonth,
      };
    },
    editReminder: (state, action) => {
      const updatedMonth = state.month.map((week: any, index: any) => {
        if (action.payload.weekIndex !== index) {
          return week;
        }

        const dayToUpdate = week.days[action.payload.weekdayIndex];
        dayToUpdate.reminders = dayToUpdate.reminders.map((reminder: any) => {
          if (reminder.uuid !== action.payload.reminder.uuid) {
            return reminder;
          }

          return {
            ...reminder,
            ...action.payload.reminder,
            updateTime: dayjs(),
          };
        });

        return week;
      });

      return {
        ...state,
        month: updatedMonth,
      };
    },
  },
});

export const {
  getPreviousMonth,
  getNextMonth,
  getCurrentMonth,
  addReminder,
  editReminder,
  deleteReminder,
} = calendarSlice.actions;

export default calendarSlice.reducer;
