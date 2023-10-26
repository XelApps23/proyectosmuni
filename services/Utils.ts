import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import { Timestamp } from 'firebase/firestore'

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

export const formatDate = (date: Timestamp | null, mode: 'PPPP' | 'dd-MM-yyyy' | 'PPPPp') => {
  if (date) {
    return format(date.toDate(), mode, { locale: es })
  } else {
    return ''
  }
}
