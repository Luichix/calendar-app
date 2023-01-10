import React from 'react';
import {
  daysTextWeek,
  hoursArrayNumber,
  hoursArrayString,
} from '../../../utils/constant';
import classNames from 'classnames';
import styles from './styles.module.css';
import dayjs from 'dayjs';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../../../redux';
import { IDays } from '../../../utils/createCalendar';
import { updateSelectedDate } from '../../../redux/calendarSlice';
import { hasReminders } from '../../../utils/hasReminder';
import { IWeek, LabelReminder, Reminder } from '../../../interfaces/type';
import { useDrag, useDrop } from 'react-dnd';
import { ItemTypes } from '../../../constants';

/**
 *
 * component Weekly
 * This is the principal component to render weekly calendar
 *
 */
const Weekly = ({ onModal }: { onModal: () => void }) => {
  const { week } = useSelector((state: RootState) => state.calendar);
  return (
    <div className={styles.container}>
      <table className={styles.table}>
        <thead>
          <tr className={styles.column}>
            <th />
            {week.days.map((day, index) => (
              <Days key={index} day={day} index={index} />
            ))}
          </tr>
        </thead>
        <tbody>
          {hoursArrayNumber.map((hour) => (
            <tr key={hour} className={styles.row}>
              <td className={styles.hour}>
                <span>{hoursArrayString[hour]}</span>
              </td>
              <HourCell week={week} onModal={onModal} hour={hour} />
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default Weekly;

/* ------------------------------- Weekly Head ------------------------------ */

const Days = ({ day, index }: { day: IDays; index: number }) => {
  return (
    <th
      key={index}
      className={classNames(styles.days, {
        [styles.weekend]: [0, 6].includes(day.index),
        [styles.today]: dayjs().isSame(day.ISO, 'day'),
      })}
    >
      <span className={styles.day}>
        {daysTextWeek[index]} &nbsp;
        {day.day}
        {hasReminders(day.ISO) && <span className={styles.indicator} />}
      </span>
    </th>
  );
};

/* ----------------------------- Component Hours ---------------------------- */

const HourCell = ({
  week,
  hour,
  onModal,
}: {
  week: IWeek;
  hour: number;
  onModal: () => void;
}) => {
  const dispatch = useAppDispatch();

  const reminders = useSelector((state: RootState) => state.reminder);

  function getHour(date: Date) {
    return date.getHours() + date.getMinutes() / 60;
  }

  const handleModal = (day: IDays) => {
    dispatch(updateSelectedDate(day.ISO));
    onModal();
  };

  return (
    <>
      {week.days.map((day, index) => {
        const dayReminders = reminders.filter((reminder) => {
          const isSameDay = dayjs(reminder.date).isSame(day.ISO, 'day');
          const startHour = getHour(dayjs(reminder.startDate).toDate());
          const endHour = getHour(dayjs(reminder.endDate).toDate());
          const isBetweenHours = startHour >= hour && hour + 1 >= endHour;
          return isSameDay && isBetweenHours;
        });

        return (
          <ReminderDay
            key={index}
            dayReminders={dayReminders}
            day={day}
            handleModal={handleModal}
          />
        );
      })}
    </>
  );
};

const ReminderDay = ({
  dayReminders,
  handleModal,
  day,
}: {
  dayReminders: Reminder[];
  handleModal: (day: IDays) => void;
  day: IDays;
}) => {
  // hook useDrop to collocate reminder label into list
  const [{ isOver }, drop] = useDrop(
    () => ({
      accept: ItemTypes.REMINDER_LABEL,
      drop: () => moveReminder(),
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
      }),
    }),
    []
  );
  const moveReminder = () => {
    console.log('Update Reminder');
  };

  return (
    <td
      // key={index}
      ref={drop}
      className={classNames(styles.cell, {
        [styles.weekend]: [0, 6].includes(day.index),
      })}
      onClick={() => handleModal(day)}
    >
      <ReminderList reminders={dayReminders} />
      {isOver && <Overlay color="#dceefb" />}
    </td>
  );
};

/* ------------------------------ Reminder List ----------------------------- */

const ReminderList = ({ reminders }: { reminders: Reminder[] }) => {
  return (
    <ul className={styles.list}>
      {reminders &&
        reminders.map((reminder) => (
          <ReminderLabel
            key={reminder.id}
            category={reminder.category}
            startDate={reminder.startDate}
          />
        ))}
    </ul>
  );
};

/* ----------------------------- Reminder Label ----------------------------- */

function ReminderLabel({ category, startDate }: LabelReminder) {
  const startHour = dayjs(startDate).format('HH:mm');

  // hook useDrag to move reminder label
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.REMINDER_LABEL,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <li
      ref={drag}
      className={styles.reminder}
      style={{ opacity: isDragging ? 0.5 : 1, cursor: 'move' }}
    >
      <span>{category}</span>
      <span>{startHour}</span>
    </li>
  );
}

/* --------------------------------- Overlay -------------------------------- */

const Overlay = ({ color }: { color: string }) => {
  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        height: '100%',
        width: '100%',
        zIndex: 1,
        opacity: 0.5,
        backgroundColor: color,
      }}
    />
  );
};
