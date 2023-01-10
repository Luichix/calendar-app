import React from 'react';
import dayjs from 'dayjs';
import { RootState, useAppDispatch } from '../../../redux';
import { useSelector } from 'react-redux';
import styles from './styles.module.css';
import { daysTextWeek } from '../../../utils/constant';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import isToday from 'dayjs/plugin/isToday';
import classNames from 'classnames';
import { IDays, IWeek } from '../../../utils/createCalendar';
import { updateSelectedDate } from '../../../redux/calendarSlice';
import { DayProps, LabelReminder } from '../../../interfaces/type';
import { useDrag, useDrop } from 'react-dnd';
import { ItemTypes } from '../../../constants/index';
dayjs.extend(isSameOrBefore);
dayjs.extend(isToday);

/**
 *
 * component Month
 * this is principal component to render month calendar
 */
function Month({ onModal }: { onModal: () => void }) {
  const { month } = useSelector((state: RootState) => state.calendar);

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
              onModal={onModal}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

export default Month;

/* ------------------------------ Component Day ----------------------------- */

const Days = ({ weekday, day, ISO, onModal }: DayProps) => {
  const dispatch = useAppDispatch();
  const today = dayjs(ISO).isToday();
  const weekend = weekday === 0 || weekday === 6;

  const handleModal = (ISO: string) => {
    dispatch(updateSelectedDate(ISO));
    onModal();
  };

  return (
    <div
      className={classNames(styles.weekday, {
        [styles.today]: today,
        [styles.weekend]: weekend,
      })}
      onClick={() => handleModal(ISO)}
    >
      <div>
        <span
          className={classNames(styles.day, {
            [styles.indicator]: today,
          })}
        >
          {day}
        </span>
      </div>
      <ReminderList ISO={ISO} />
    </div>
  );
};

/* ------------------------------ Reminder List ----------------------------- */

const ReminderList = ({ ISO }: { ISO: string }) => {
  const reminders = useSelector((state: RootState) => state.reminder);

  const filteredReminders = reminders.filter((item) => {
    return dayjs(item.date).isSame(dayjs(ISO), 'day');
  });

  const moveReminder = () => {
    console.log('Update Reminder');
  };

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

  return (
    <ul ref={drop} className={styles.list}>
      {filteredReminders.map((reminder) =>
        renderReminderLabel({
          id: reminder.id,
          category: reminder.category,
          startDate: reminder.startDate,
        })
      )}
      {isOver && <Overlay color="#def" />}
    </ul>
  );
};

/* ----------------------------- Reminder Label ----------------------------- */

function renderReminderLabel({ id, category, startDate }: LabelReminder) {
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
      key={id}
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
