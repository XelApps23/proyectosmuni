import { Timestamp } from 'firebase/firestore'

export function convertDate (firebaseDate: Timestamp | null) {
  if (!firebaseDate) {
    return '' // Manejo de casos inválidos
  }

  const date = firebaseDate.toDate() // Convierte el Timestamp de Firebase a un objeto Date

  // Obtener los componentes de la fecha (año, mes y día)
  const year = date.getFullYear()
  const month = (date.getMonth() + 1).toString().padStart(2, '0') // Sumamos 1 al mes, ya que los meses en Date van de 0 a 11
  const day = date.getDate().toString().padStart(2, '0')

  // Formatear la fecha como "aaaa-mm-dd"
  const formattedDate = `${year}-${month}-${day}`

  return formattedDate
}
