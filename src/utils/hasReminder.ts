import { RootState } from '../redux/index';
import { useSelector } from 'react-redux';
import dayjs from 'dayjs';

export function hasReminders(date: string) {
  const reminders = useSelector((state: RootState) => state.reminder);
  return reminders.some((r) => {
    return dayjs(r.date).isSame(date, 'day');
  });
}
