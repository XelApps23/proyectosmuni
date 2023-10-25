import { db } from '@/services/Firebase'
import { collection, getDocs } from 'firebase/firestore'
import { convertDate } from './convertDataFirebase'

const table = 'tasks'

export default async function client () {
  try {
    const tasks = []
    const taskDurations = []

    const querySnapshot = await getDocs(collection(db, table))
    querySnapshot.forEach((doc) => {
      const datos = doc.data()
      datos.initialDate = convertDate(datos.initialDate)
      datos.endDate = convertDate(datos.endDate)

      // Agregar datos de la tarea
      tasks.push({
        id: doc.id,
        name: datos.description
      })

      // Agregar datos de la duración de la tarea
      taskDurations.push({
        id: doc.id,
        start: datos.initialDate,
        end: datos.endDate,
        task: doc.id
      })
    })

    // Crear el objeto JSON final
    const jsonResponse = {
      tasks,
      taskDurations
    }

    // Convertir el objeto a JSON y mostrarlo en la consola
    return JSON.stringify(jsonResponse, null, 2)
  } catch (error) {
    console.error('Error al obtener los documentos:', error)
    return JSON.stringify({ tasks: [], taskDurations: [] })
  }
}
