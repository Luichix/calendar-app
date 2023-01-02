import React, { useState } from 'react';
import MonthCalendar from './month';
import styles from './styles.module.css';
import WeeklyCalendar from './weekly';
import { FiChevronRight, FiChevronLeft } from 'react-icons/fi';
import { getNextMonth, getPreviousMonth } from '../redux/calendarSlice';
import { RootState, useAppDispatch } from '../redux';
import { useSelector } from 'react-redux';
import dayjs from 'dayjs';
import 'dayjs/locale/es';

function Calendar() {
  /* ---------------------------------- state --------------------------------- */

  const [view, setView] = useState<'week' | 'month'>('week');
  const [week, setWeek] = useState(0);

  const dispatch = useAppDispatch();
  const { currentYear, currentMonth } = useSelector(
    (state: RootState) => state.calendar
  );

  const currentDate = dayjs()
    .clone()
    .set('year', currentYear)
    .set('month', currentMonth)
    .locale('es')
    .format('MMMM YYYY');

  /* --------------------------------- handler -------------------------------- */

  const handlePreviousTimer = () => {
    if (view === 'week') setWeek(week - 1);
    if (view === 'month') dispatch(getPreviousMonth());
  };
  const handleNextTimer = () => {
    if (view === 'week') setWeek(week + 1);
    if (view === 'month') dispatch(getNextMonth());
  };

  /* ----------------------------------- jsx ---------------------------------- */

  return (
    <div className={styles.container}>
      <div className={styles.navigation}>
        <div className={styles.period}>
          <span onClick={() => setView('week')}>Semana</span>
          <span onClick={() => setView('month')}>Mes</span>
        </div>
      </div>
      <div>
        <div className={styles.timer}>
          <h2>{currentDate}</h2>
          <div>
            <button onClick={handlePreviousTimer}>
              <FiChevronLeft />
            </button>
            <span>Hoy</span>
            <button onClick={handleNextTimer}>
              <FiChevronRight />
            </button>
          </div>
        </div>
      </div>
      {view === 'week' && <WeeklyCalendar week={week} />}
      {view === 'month' && <MonthCalendar />}
    </div>
  );
}

export default Calendar;
