import React from 'react';
import dayjs from 'dayjs';
import Reminder from './Reminder';
import { RootState, useAppDispatch } from '../redux/reducers';
import { useSelector } from 'react-redux';
import {
  addReminder,
  editReminder,
  deleteReminder,
} from '../redux/reducers/calendarSlice';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
dayjs.extend(isSameOrBefore);

function CalendarMonth() {
  const { month } = useSelector((state: RootState) => state.calendar);
  const dispatch = useAppDispatch();

  // const handleDoubleClick = (weekIndex, weekdayIndex, weekdayDate) => {
  // if(dayjs() > weekdayDate){
  //   return
  // }
  //    this.props.actions.addReminder(weekIndex, weekdayIndex);
  //   console.log('Hello');
  // };

  const getDayClass = (day: number, date: string, ISO: string) => {
    const today = dayjs();
    const classes = ['week__day'];

    // if (today.isSameOrBefore(ISO, 'dates')) {
    //   classes.push('week__day--today');
    // }

    // if ((date = dayjs().format('D'))) {
    //   classes.push('week__day--today');
    // }

    // if (today.day() > day) {
    //   classes.push('week__day--past');
    // }

    if (day === 0 || day === 6) {
      classes.push('week__day--weekend');
    }

    return classes.join(' ');
  };

  const Weeks = () => {
    // TODO: Clean this up and pop in to a list component
    return month.map((week: any, index: any) => (
      <div key={week.uuid} className="week">
        {week.days.map((weekday: any, index: any) => (
          <div
            key={weekday.uuid}
            className={getDayClass(weekday.weekday, weekday.date, weekday.ISO)}
            // onDoubleClick={() =>
            //   handleDoubleClick(week.index, weekday.index, weekday.date)
            // }
          >
            {weekday.date}
            {weekday.reminders.map((reminder: any) => (
              <Reminder
                key={reminder.uuid}
                reminder={reminder}
                weekIndex={week.index}
                weekdayIndex={weekday.index}
              />
            ))}
          </div>
        ))}
      </div>
    ));
  };

  return (
    <div className="calendar__month">
      <Weeks />
    </div>
  );
}

export default CalendarMonth;
