import { createSlice } from '@reduxjs/toolkit';
import { updatePreviousMonth, updateNextMonth } from '../utils/updateTime';
import createCalendar, { IWeek } from '../utils/createCalendar';
import { useCalendar } from '../utils/useCalendar';
import dayjs from 'dayjs';

/* ---------------------------------- types --------------------------------- */

type Year = Record<number, IWeek[]>;

interface Calendar {
  currentMonthIndex: number;
  month: IWeek[];
  year: Year;
  currentYear: number;
  currentMonth: number;
}

/* ------------------------------ initial state ----------------------------- */

const currentYear = dayjs().year();
const currentMonth = dayjs().month();
const monthInitialState = useCalendar(currentYear, currentMonth);

const monthCalendar = createCalendar(
  monthInitialState.startWeekOfMonth,
  monthInitialState.endWeekOfMonth,
  monthInitialState.numberOfWeeks,
  currentYear
);

const initialState: Calendar = {
  currentMonthIndex: 0,
  month: monthCalendar,
  year: { 0: monthCalendar },
  currentMonth: currentMonth,
  currentYear: currentYear,
};

/* ---------------------------------- slice --------------------------------- */

export const calendarSlice = createSlice({
  name: 'calendar',
  initialState: initialState,
  reducers: {
    getPreviousMonth: (state) => {
      const prevMonthIndex = state.currentMonthIndex - 1;

      const { updateMonth, updateYear } = updatePreviousMonth({
        year: state.currentYear,
        month: state.currentMonth,
      });
      const { startWeekOfMonth, endWeekOfMonth, numberOfWeeks } = useCalendar(
        updateYear,
        updateMonth
      );

      const updatedYearCalendar = {
        ...state.year,
        [state.currentMonthIndex]: state.month, // Save the current month
        [prevMonthIndex]: state.year[prevMonthIndex]
          ? state.year[prevMonthIndex]
          : createCalendar(
              startWeekOfMonth,
              endWeekOfMonth,
              numberOfWeeks,
              updateYear
            ),
      };

      return {
        ...state,
        currentMonthIndex: prevMonthIndex,
        month: updatedYearCalendar[prevMonthIndex],
        year: updatedYearCalendar,
        currentYear: updateYear,
        currentMonth: updateMonth,
      };
    },
    getNextMonth: (state) => {
      const nextMonthIndex = state.currentMonthIndex + 1;

      const { updateMonth, updateYear } = updateNextMonth({
        year: state.currentYear,
        month: state.currentMonth,
      });

      const { startWeekOfMonth, endWeekOfMonth, numberOfWeeks } = useCalendar(
        updateYear,
        updateMonth
      );

      const updatedYearCalendar = {
        ...state.year,
        [state.currentMonthIndex]: state.month, // Save the current month
        [nextMonthIndex]: state.year[nextMonthIndex]
          ? state.year[nextMonthIndex]
          : createCalendar(
              startWeekOfMonth,
              endWeekOfMonth,
              numberOfWeeks,
              updateYear
            ),
      };

      return {
        ...state,
        currentMonthIndex: nextMonthIndex,
        month: updatedYearCalendar[nextMonthIndex],
        year: updatedYearCalendar,
        currentYear: updateYear,
        currentMonth: updateMonth,
      };
    },
    getCurrentMonth: () => initialState,
  },
});

export const { getPreviousMonth, getNextMonth, getCurrentMonth } =
  calendarSlice.actions;

export default calendarSlice.reducer;
