import React from 'react';
import { hoursArrayNumber, hoursArrayString } from '../../utils/constant';
import { useWeekdays } from '../../utils/useWeekDay';
import classNames from 'classnames';
import styles from './styles.module.css';
import dayjs from 'dayjs';

const Weekly = ({ week }: { week: number }) => {
  const { today, days } = useWeekdays(week);

  const currentDate = dayjs().clone().format('DD/MM/YYYY');
  const currentHour = today.getHours();

  /* --------------------------------- handler -------------------------------- */

  const onHourClick = (day: any, hour: any, index: any) => {
    console.log(`Seleccionaste la hora ${hour} del día ${day}`, index);
  };

  return (
    <div className={styles.container}>
      <table className={styles.table}>
        <thead>
          <tr className={styles.column}>
            <th />
            {days.map((day, index) => (
              <th
                key={index}
                className={classNames(styles.days, {
                  [styles.weekend]: [0, 6].includes(day.index),
                  [styles.today]: day.date === currentDate,
                })}
              >
                <span>{day.day}</span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {hoursArrayNumber.map((hour) => (
            <tr key={hour} className={styles.row}>
              <td className={styles.hour}>
                <span>{hoursArrayString[hour]}</span>
              </td>
              {days.map((day, index) => (
                <td
                  key={index}
                  className={classNames(styles.fragment, {
                    [styles.weekend]: [0, 6].includes(day.index),
                    [styles.today]:
                      day.date === currentDate && hour === currentHour,
                  })}
                  onClick={() => onHourClick(day.day, hour, day.index)}
                />
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default Weekly;
