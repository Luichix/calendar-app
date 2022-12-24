import React from 'react';
import {
  getNextMonth,
  getPreviousMonth,
  getCurrentMonth,
} from '../redux/reducers/calendarSlice';
import { RootState, useAppDispatch } from '../redux/reducers';
import { useSelector } from 'react-redux';
import dayjs from 'dayjs';

function CalendarNav() {
  const { currentMonthIndex } = useSelector(
    (state: RootState) => state.calendar
  );
  const dispatch = useAppDispatch();
  const currentMonth = dayjs()
    .startOf('month')
    .add(currentMonthIndex, 'month')
    .format('MMMM YYYY');

  const nextMonth = () => dispatch(getNextMonth());
  const previousMonth = () => dispatch(getPreviousMonth());

  return (
    <div className="calendar__nav">
      <button onClick={previousMonth}>◀</button>
      <h2>{currentMonth}</h2>
      <button onClick={nextMonth}>▶</button>
    </div>
  );
}

export default CalendarNav;
