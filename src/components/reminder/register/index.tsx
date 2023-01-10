import {
  InputForm,
  FormValues,
  useInputForm,
} from '../../../utils/useInputForm';
import dayjs from 'dayjs';
import { TfiPencilAlt } from 'react-icons/tfi';
import { IoIosTimer } from 'react-icons/io';
import { RxPerson } from 'react-icons/rx';
import { MdArrowForward, MdOutlineKeyboardArrowDown } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { addReminder } from '../../../redux/reminderSlice';
import styles from './styles.module.css';

const START_TIME = `${dayjs().format('HH')}:${dayjs().minute()}`;
const END_TIME = `${dayjs().add(1, 'hours').format('HH')}:${dayjs().minute()}`;

const initialState: InputForm[] = [
  {
    id: '0',
    name: 'title',
    label: '',
    value: '',
    placeholder: 'Añade un titulo',
    type: 'text',
  },
  {
    id: '1',
    name: 'client',
    label: '',
    value: '',
    placeholder: 'ID del cliente',
    type: 'text',
  },
  {
    id: '2',
    name: 'description',
    label: '',
    value: '',
    placeholder: 'Añade una descripción',
    type: 'textarea',
  },
  {
    id: '3',
    name: 'date',
    label: '',
    value: '',
    placeholder: '',
    type: 'date',
  },
  {
    id: '4',
    name: 'startHour',
    label: 'hora de inicio',
    value: START_TIME,
    placeholder: '',
    type: 'time',
  },
  {
    id: '5',
    name: 'endHour',
    label: 'hora de finalización',
    value: END_TIME,
    placeholder: '',
    type: 'time',
  },
];

function NewReminder() {
  const dispatch = useDispatch();

  const onSubmit = (values: FormValues) => {
    // obtener los datos del formulario
    const { id, date, title, description } = values;
    // crear el recordatorio y enviarlo a Redux
    dispatch(addReminder({ id, date, title, description }));
  };

  const { handleSubmit, handleChange, inputs } = useInputForm(
    onSubmit,
    initialState
  );

  const timeOptions: Record<string, string>[] = [];
  for (let i = 0; i < 24; i++) {
    for (let j = 0; j < 4; j++) {
      const hour = i.toString().padStart(2, '0');
      const minute = (j * 15).toString().padStart(2, '0');
      timeOptions.push({
        value: `${hour}:${minute}`,
        label: `${hour}:${minute}`,
      });
    }
  }

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        {inputs.map((input, index) => {
          switch (input.type) {
            case 'text':
              return (
                <input
                  key={input.id}
                  type={input.type}
                  name={input.name}
                  value={input.value}
                  onChange={(event) => handleChange(event, index)}
                  placeholder={input.placeholder}
                  className={styles.inputText}
                />
              );
            case 'date':
              return (
                <input
                  key={input.id}
                  type={input.type}
                  name={input.name}
                  value={input.value}
                  onChange={(event) => handleChange(event, index)}
                  placeholder={input.placeholder}
                  className={styles.inputDate}
                />
              );
            case 'textarea':
              return (
                <textarea
                  key={input.id}
                  name={input.name}
                  value={input.value}
                  onChange={(event) => handleChange(event, index)}
                  placeholder={input.placeholder}
                  className={styles.textarea}
                />
              );
            case 'time':
              return (
                <label key={input.id} className={styles.label}>
                  <input
                    type="time"
                    value={input.value}
                    title={input.label}
                    onChange={(event) => handleChange(event, index)}
                    placeholder={input.placeholder}
                    list={`${input.name}-datatime`}
                    className={styles.inputTime}
                  />
                  <div className={styles.listTime}>
                    <select
                      id={`${input.name}-datatime`}
                      className={styles.datalist}
                      onChange={(event) => handleChange(event, index)}
                      // value={}
                    >
                      {timeOptions.map((option) => (
                        <option value={option.value} key={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                    <MdOutlineKeyboardArrowDown className={styles.arrow} />
                  </div>
                </label>
              );
            default:
              return null;
          }
        })}
        <RxPerson className={styles.iconPerson} />
        <TfiPencilAlt className={styles.iconDescription} />
        <IoIosTimer className={styles.iconTime} />
        <div className={styles.actions}>
          <span className={styles.cancel}>Cancelar</span>
          <button className={styles.button} type="submit">
            <MdArrowForward />
          </button>
        </div>
      </form>
    </div>
  );
}

export default NewReminder;
