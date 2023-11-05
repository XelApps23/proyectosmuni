import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import { Timestamp } from 'firebase/firestore'
import { GanttLocale } from 'rc-gantt/dist/types/Gantt'

export const getPhase = (phase: number) => {
  switch (phase) {
    case 1:
      return 'Formulación del proyecto'
    case 2:
      return 'Creación de bases'
    case 3:
      return 'Adjudicación del proyecto'
    case 4:
      return 'Contratación del proyecto'
    case 5:
      return 'Ejecución del proyecto anticipo'
    case 6:
      return 'Ejecución del proyecto estimaciones'
    case 7:
      return 'Ejecución del proyecto documento de cambio'
    case 8:
      return 'Liquidación del proyecto'
    default:
      return 'No definido'
  }
}

export const formatDate = (
  date: Timestamp | null | Date | undefined,
  mode: 'PPPP' | 'dd-MM-yyyy' | 'PPPPp'
) => {
  if (date instanceof Timestamp) {
    return format(date.toDate(), mode, { locale: es })
  } else if (date instanceof Date) {
    return format(date, mode, { locale: es })
  } else {
    return 'Sin definir'
  }
}

export const ganttLocaleEs: GanttLocale = {
  day: 'Día',
  dayUnit: ' día',
  week: 'Semana',
  halfYear: 'Semestre',
  majorFormat: {
    day: 'MMMM YYYY',
    week: 'MMMM YYYY',
    halfYear: 'YYYY',
    month: 'YYYY',
    quarter: 'YYYY'
  },
  minorFormat: {
    day: 'D',
    week: 'wo [semana]',
    halfYear: 'YYYY-',
    month: 'MMMM',
    quarter: '[Trimestre] Q'
  },
  quarter: 'Trimestre',
  secondHalf: '',
  today: 'Hoy',
  month: 'Mes',
  firstHalf: ''
}
