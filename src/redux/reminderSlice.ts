import { createSlice } from '@reduxjs/toolkit';

interface Reminder {
  id: number | string;
  title: string;
  date: string;
  description: string;
  patient: string;
  patientID: string;
  category: 'cita' | 'consulta' | 'examen' | 'diagnostico';
  startDate: string;
  endDate: string;
  done: boolean;
}

const initialState: Reminder[] = [
  {
    id: 1,
    title: 'Consulta',
    patientID: '1',
    patient: 'Luichix',
    category: 'cita',
    description: 'Comprar leche',
    date: '2023-01-12T06:00:00.000Z',
    startDate: '2023-01-12T18:00:00.000Z',
    endDate: '2023-01-12T19:00:00.000Z',
    done: false,
  },
  {
    id: 2,
    title: 'Consulta',
    patientID: '1',
    patient: 'Luichix',
    category: 'consulta',
    description: 'Hacer ejercicio',
    date: '2023-01-03T06:00:00.000Z',
    startDate: '2023-01-03T18:00:00.000Z',
    endDate: '2023-01-03T19:00:00.000Z',
    done: true,
  },
  {
    id: 3,
    title: 'Consulta',
    patientID: '1',
    patient: 'Luichix',
    category: 'examen',
    description: 'Pagar la renta',
    date: '2023-01-04T06:00:00.000Z',
    startDate: '2023-01-04T18:30:00.000Z',
    endDate: '2023-01-04T19:00:00.000Z',
    done: false,
  },
  {
    id: 4,
    title: 'Consulta',
    patientID: '1',
    patient: 'Luichix',
    category: 'diagnostico',
    description: 'Pagar la renta',
    date: '2023-01-15T06:00:00.000Z',
    startDate: '2023-01-12T18:00:00.000Z',
    endDate: '2023-01-12T19:00:00.000Z',
    done: false,
  },
  {
    id: 5,
    title: 'Consulta',
    patientID: '1',
    patient: 'Luichix',
    category: 'cita',
    description: 'Pagar la renta',
    date: '2023-01-15T06:00:00.000Z',
    startDate: '2023-01-15T21:00:00.000Z',
    endDate: '2023-01-15T22:00:00.000Z',
    done: false,
  },
  {
    id: 6,
    title: 'Consulta',
    patientID: '1',
    patient: 'Luichix',
    category: 'examen',
    description: 'Pagar la renta',
    date: '2023-01-04T06:00:00.000Z',
    startDate: '2023-01-04T18:30:00.000Z',
    endDate: '2023-01-04T19:00:00.000Z',
    done: false,
  },
  {
    id: 7,
    title: 'Consulta',
    patientID: '1',
    patient: 'Luichix',
    category: 'examen',
    description: 'Pagar la renta',
    date: '2023-01-04T06:00:00.000Z',
    startDate: '2023-01-04T18:30:00.000Z',
    endDate: '2023-01-04T19:00:00.000Z',
    done: false,
  },
  {
    id: 8,
    title: 'Consulta',
    patientID: '1',
    patient: 'Luichix',
    category: 'examen',
    description: 'Pagar la renta',
    date: '2023-01-04T06:00:00.000Z',
    startDate: '2023-01-04T18:30:00.000Z',
    endDate: '2023-01-04T19:00:00.000Z',
    done: false,
  },
];

const remindersSlice = createSlice({
  name: 'reminders',
  initialState,
  reducers: {
    addReminder(state, action) {
      const {
        id,
        title,
        patientID,
        patient,
        category,
        description,
        date,
        startDate,
        endDate,
        done,
      } = action.payload;
      state.push({
        id,
        title,
        patientID,
        patient,
        category,
        description,
        date,
        startDate,
        endDate,
        done,
      });
    },
    deleteReminder(state, action) {
      const index = state.findIndex((r) => r.id === action.payload);
      state.splice(index, 1);
    },
  },
});

export const { addReminder, deleteReminder } = remindersSlice.actions;

export default remindersSlice.reducer;

/**

export const addReminder = (weekIndex: any, weekdayIndex: any) => {}

export const editReminder = (
  weekIndex: any,
  weekdayIndex: any,
  reminder: any
) => {}

export const deleteReminder = (
  weekIndex: any,
  weekdayIndex: any,
  reminder: any
) => {}

*/

/* 
  
    addReminder: (state, action) => {
      const updatedMonth = state.month.map((week: any, index: any) => {
        if (action.payload.weekIndex === index) {
          const dayToUpdate = week.days[action.payload.weekdayIndex]

          dayToUpdate.reminders.push({
            text: '',
            date: dayjs(),
            category: 'home',
            open: true,
            newReminder: true,
            uuid: guid(),
            parentDayUuid: week.days[action.payload.weekdayIndex].uuid,
            grandparentUuid: week.uuid,
          })
        }

        return week
      })

      return {
        ...state,
        month: updatedMonth,
      }
    },
    deleteReminder: (state, action) => {
      const updatedMonth = state.month.map((week: any, index: any) => {
        if (action.payload.weekIndex === index) {
          const dayToUpdate = week.days[action.payload.weekdayIndex]
          dayToUpdate.reminders = dayToUpdate.reminders.filter(
            (reminder: any) => reminder.uuid !== action.payload.reminder.uuid
          )
        }

        return week
      })

      return {
        ...state,
        month: updatedMonth,
      }
    },
    editReminder: (state, action) => {
      const updatedMonth = state.month.map((week: any, index: any) => {
        if (action.payload.weekIndex !== index) {
          return week
        }

        const dayToUpdate = week.days[action.payload.weekdayIndex]
        dayToUpdate.reminders = dayToUpdate.reminders.map((reminder: any) => {
          if (reminder.uuid !== action.payload.reminder.uuid) {
            return reminder
          }

          return {
            ...reminder,
            ...action.payload.reminder,
            updateTime: dayjs(),
          }
        })

        return week
      })

      return {
        ...state,
        month: updatedMonth,
      }
    },
 */
