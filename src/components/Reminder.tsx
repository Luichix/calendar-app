import React, { useState } from 'react';
import classNames from 'classnames';
import styles from './styles.module.css';
import { useAppDispatch } from '../redux/reducers';
import {
  addReminder,
  editReminder,
  deleteReminder,
} from '../redux/reducers/calendarSlice';
import dayjs from 'dayjs';

type ReminderProps = {
  key: string;
  reminder: any;
  weekIndex: string;
  weekdayIndex: string;
};

const START_TIME = `${dayjs().format('HH')}:${dayjs().minute()}`;
const END_TIME = `${dayjs().add(1, 'hours').format('HH')}:${dayjs().minute()}`;

function Reminder({ key, reminder, weekIndex, weekdayIndex }: ReminderProps) {
  /* ---------------------------------- state --------------------------------- */
  const [date, setDate] = useState({
    hour: '00',
    minute: '00',
  });
  const [text, setText] = useState('');
  const [category, setCategory] = useState('home');
  const [active, setActive] = useState(false);
  const [startTime, setStartTime] = useState(START_TIME);
  const [endTime, setEndTime] = useState(END_TIME);
  const [editing, setEditing] = useState(false);

  /* ---------------------------------- redux --------------------------------- */
  const dispatch = useAppDispatch();

  const updateReminder = (
    weekIndex: any,
    weekdayIndex: any,
    updatedReminder: any
  ) => dispatch(editReminder({ weekIndex, weekdayIndex, updatedReminder }));

  const removeReminder = (weekIndex: any, weekdayIndex: any, reminder: any) =>
    dispatch(deleteReminder({ weekIndex, weekdayIndex, reminder }));

  /* -------------------------------- handles -------------------------------- */
  const handleClick = () => {
    setActive(active);
    setEditing(true);
  };

  const handleStartTime = (event: any) => {
    if (event.target.value < dayjs().format('HH:mm')) {
      return;
    }

    let timeArray = event.target.value.split(':');
    const hours = timeArray[0];
    const minutes = timeArray[1];

    setDate({
      hour: hours,
      minute: minutes,
    });

    setStartTime(event.target.value);
    setEndTime(`${parseInt(hours, 10) + 1}:${minutes}`);
  };
  const handleEndTime = (e: any) => {
    if (e.target.value < dayjs().format('HH:mm')) {
      return;
    }

    let timeArray = e.target.value.split(':');
    const hours = timeArray[0];
    const minutes = timeArray[1];

    setDate({
      hour: hours,
      minute: minutes,
    });

    setEndTime(`${parseInt(hours, 10) - 1}:${minutes}`);
  };

  const toggleIsActive = () => {
    setActive(!active);
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();

    const updatedReminder = {
      category,
      updateTime: dayjs(),
      newReminder: false,
      open: false,
    };
    updateReminder(weekIndex, weekdayIndex, updatedReminder);
    setEditing(false);
  };

  const onDelete = () => {};

  const handleDoubleClick = () => {
    setEditing(true);
  };

  /* ----------------------------------- jsx ---------------------------------- */

  if (editing === false) {
    return null;
  }
  return (
    <div className={styles.reminder}>
      <label
        className={classNames(styles.label, styles[category])}
        onClick={handleClick}
      >
        {text}
      </label>
      <form className="reminder" onSubmit={handleSubmit}>
        <input
          type="type"
          maxLength={30}
          placeholder="New reminder..."
          autoFocus={true}
          value={text}
          onChange={({ target }) => setText(target.value)}
        />
        <select
          onChange={({ target }) => setCategory(target.value)}
          value={category}
        >
          <option value="home">Home</option>
          <option value="work">Work</option>
          <option value="calendar">Calendar</option>
        </select>

        <input type="time" value={startTime} onChange={handleStartTime} />

        <input type="time" value={endTime} onChange={handleEndTime} />

        <button type="button" onClick={onDelete}>
          X
        </button>
        <button type="submit">Save</button>
      </form>
    </div>
  );
}

export default Reminder;
