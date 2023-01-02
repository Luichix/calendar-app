import React from 'react';
import dayjs from 'dayjs';
import { RootState } from '../../redux';
import { useSelector } from 'react-redux';
import styles from './styles.module.css';
import { daysTextWeek } from '../../utils/constant';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import isToday from 'dayjs/plugin/isToday';
import classNames from 'classnames';
import { IDays, IWeek } from '../../utils/createCalendar';
dayjs.extend(isSameOrBefore);
dayjs.extend(isToday);

function Month() {
  /* ---------------------------------- state --------------------------------- */
  const { month } = useSelector((state: RootState) => state.calendar);

  const Days = ({ weekday, day, ISO }: any) => {
    const today = dayjs(ISO).isToday();
    const weekend = weekday === 0 || weekday === 6;
    return (
      <div
        className={classNames(styles.weekday, {
          [styles.today]: today,
          [styles.weekend]: weekend,
        })}
      >
        {day}
      </div>
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        {daysTextWeek.map((item, index) => (
          <span key={index}>{item}</span>
        ))}
      </div>
      {month.map((week: IWeek) => (
        <div key={week.weekUuid} className={styles.week}>
          {week.days.map((weekday: IDays) => (
            <Days
              key={weekday.uuid}
              day={weekday.day}
              weekday={weekday.weekday}
              ISO={weekday.ISO}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

export default Month;
