import React, { useRef, useState } from 'react';
import MonthCalendar from './month';
import styles from './styles.module.css';
import WeeklyCalendar from './weekly';
import { FiChevronRight, FiChevronLeft } from 'react-icons/fi';
import {
  getNextMonth,
  getNextWeek,
  getPreviousMonth,
  getPreviousWeek,
} from '../../redux/calendarSlice';
import { RootState, useAppDispatch } from '../../redux/index';
import { useSelector } from 'react-redux';
import dayjs from 'dayjs';
import 'dayjs/locale/es';

function Calendar() {
  /* ---------------------------------- state --------------------------------- */

  const [view, setView] = useState<'week' | 'month'>('week');

  const dispatch = useAppDispatch();
  const { currentYear, currentMonth, week } = useSelector(
    (state: RootState) => state.calendar
  );

  const currentDate = dayjs()
    .clone()
    .set('year', currentYear)
    .set('month', currentMonth)
    .locale('es')
    .format('MMMM YYYY');

  const indexWeek = week.weekIndex;

  const startWeek = dayjs()
    .year(currentYear)
    .week(indexWeek)
    .startOf('week')
    .format('DD/MM/YYYY');
  const endWeek = dayjs()
    .year(currentYear)
    .week(indexWeek)
    .endOf('week')
    .format('DD/MM/YYYY');

  const date =
    view === 'week' ? `Semana ${indexWeek} - ${currentDate}` : currentDate;

  const title = `${startWeek} al ${endWeek}`;

  /* --------------------------------- handler -------------------------------- */

  const handlePreviousTimer = () => {
    if (view === 'week') dispatch(getPreviousWeek());
    if (view === 'month') dispatch(getPreviousMonth());
  };
  const handleNextTimer = () => {
    if (view === 'week') dispatch(getNextWeek());
    if (view === 'month') dispatch(getNextMonth());
  };

  /* -------------------------- handler Modal Records ------------------------- */
  const modalRef = useRef<HTMLElement | null>(null);

  const openModal = () => {
    if (modalRef?.current) modalRef.current.style.display = 'flex';
  };
  const closeModal = (event: any) => {
    event.preventDefault();
    if (modalRef?.current) modalRef.current.style.display = 'none';
  };

  /* ----------------------------------- jsx ---------------------------------- */

  return (
    <div className={styles.container}>
      <div className={styles.navigation}>
        <button className={styles.reminder} onClick={() => openModal()}>
          +
        </button>
        <div className={styles.period}>
          <span onClick={() => setView('week')}>Semana</span>
          <span onClick={() => setView('month')}>Mes</span>
        </div>
      </div>
      <div>
        <div className={styles.timer}>
          <h2 title={title}>{date}</h2>
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
      {view === 'week' && <WeeklyCalendar onModal={openModal} />}
      {view === 'month' && <MonthCalendar onModal={openModal} />}
    </div>
  );
}

export default Calendar;
