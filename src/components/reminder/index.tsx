import React from 'react'

const index = () => {
  return <div>index</div>
}

export default index

// import React, { useState } from 'react'
// import { useAppDispatch } from '@Redux/store'
// import { editReminder, deleteReminder } from '../../redux/calendarSlice'
// import dayjs from 'dayjs'

// type ReminderProps = {
//   key: string
//   reminder: any
//   weekIndex: string
//   weekdayIndex: string
// }

// const START_TIME = `${dayjs().format('HH')}:${dayjs().minute()}`
// const END_TIME = `${dayjs().add(1, 'hours').format('HH')}:${dayjs().minute()}`

// function Reminder({ reminder, weekIndex, weekdayIndex }: ReminderProps) {
//   /* ---------------------------------- state --------------------------------- */

//   const [text, setText] = useState('')
//   const [category, setCategory] = useState('home')
//   const [active, setActive] = useState(false)
//   const [startTime, setStartTime] = useState(START_TIME)
//   const [endTime, setEndTime] = useState(END_TIME)
//   const [editing, setEditing] = useState(false)

//   /* ---------------------------------- redux --------------------------------- */
//   const dispatch = useAppDispatch()

//   const updateReminder = (
//     weekIndex: any,
//     weekdayIndex: any,
//     updatedReminder: any
//   ) => dispatch(editReminder({ weekIndex, weekdayIndex, updatedReminder }))

//   const removeReminder = (weekIndex: any, weekdayIndex: any, reminder: any) =>
//     dispatch(deleteReminder({ weekIndex, weekdayIndex, reminder }))

//   /* -------------------------------- handles -------------------------------- */
//   const handleClick = () => {
//     setActive(active)
//     setEditing(true)
//   }

//   const handleStartTime = (event: any) => {
//     if (event.target.value < dayjs().format('HH:mm')) {
//       return
//     }

//     let timeArray = event.target.value.split(':')
//     const hours = timeArray[0]
//     const minutes = timeArray[1]

//     setStartTime(event.target.value)
//     setEndTime(`${parseInt(hours, 10) + 1}:${minutes}`)
//   }
//   const handleEndTime = (e: any) => {
//     if (e.target.value < dayjs().format('HH:mm')) {
//       return
//     }

//     let timeArray = e.target.value.split(':')
//     const hours = timeArray[0]
//     const minutes = timeArray[1]

//     setEndTime(`${parseInt(hours, 10) - 1}:${minutes}`)
//   }

//   const handleSubmit = (event: any) => {
//     event.preventDefault()

//     const updatedReminder = {
//       category,
//       updateTime: dayjs(),
//       newReminder: false,
//       open: false,
//     }
//     updateReminder(weekIndex, weekdayIndex, updatedReminder)
//     setEditing(false)
//   }

//   const onDelete = () => {
//     removeReminder(weekIndex, weekdayIndex, reminder)
//   }

//   /* ----------------------------------- jsx ---------------------------------- */

//   if (editing === false) {
//     return null
//   }
//   return (
//     <div>
//       <label onClick={handleClick}>{text}</label>
//       <form className="reminder" onSubmit={handleSubmit}>
//         <input
//           type="type"
//           maxLength={30}
//           placeholder="New reminder..."
//           autoFocus={true}
//           value={text}
//           onChange={({ target }) => setText(target.value)}
//         />
//         <select
//           onChange={({ target }) => setCategory(target.value)}
//           value={category}
//         >
//           <option value="home">Home</option>
//           <option value="work">Work</option>
//           <option value="calendar">Calendar</option>
//         </select>

//         <input type="time" value={startTime} onChange={handleStartTime} />

//         <input type="time" value={endTime} onChange={handleEndTime} />

//         <button type="button" onClick={onDelete}>
//           X
//         </button>
//         <button type="submit">Save</button>
//       </form>
//     </div>
//   )
// }

// export default Reminder

/**
 * 
 * 
 * 
/***!SECTION

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
