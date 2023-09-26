import { useState } from 'react'
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  query,
  where
} from 'firebase/firestore'
import { db } from '@/services/Firebase'
import { TaskList, TaskUpdate } from './types/Task'

type TaskInput = {
  name: string
  description: string
  projectId: string
  phase: number
}

const table = 'tasks'

const useTasks = () => {
  const [tasks, setTasks] = useState<TaskList>({})
  const [loading, setLoading] = useState(false)

  const getTasks = async () => {
    setLoading(true)
    let datos = {}
    const querySnapshot = await getDocs(collection(db, table))
    querySnapshot.forEach((doc) => {
      datos = { ...datos, [doc.id]: { ...doc.data(), id: doc.id } }
    })
    setTasks(datos)
    setLoading(false)
  }

  const getTask = async (idRef: string) => {
    setLoading(true)
    let dato = {}
    const docRef = doc(db, table, idRef)
    console.log(docRef)
    const querySnapshot = await getDoc(docRef)
    dato = {
      [querySnapshot.id]: { ...querySnapshot.data(), id: querySnapshot.id }
    }
    setTasks(dato)
    setLoading(false)
  }

  const getTaskFiltered = async (projectId: string, phase: number) => {
    setLoading(true)
    let datos = {}
    const q = query(collection(db, 'tasks'), where('projectId', '==', projectId), where('phase', '==', Number(phase)))
    const querySnapshot = await getDocs(q)
    querySnapshot.forEach((doc) => {
      datos = { ...datos, [doc.id]: { ...doc.data(), id: doc.id } }
    })
    setTasks(datos)
    setLoading(false)
  }

  const deteleTask = async (id: string) => {
    setLoading(true)
    await getTask(id)
    await deleteDoc(doc(db, table, id))
    setLoading(false)
  }

  const createTask = async ({
    name,
    description,
    projectId,
    phase
  }: TaskInput) => {
    setLoading(true)
    const docRef = await addDoc(collection(db, table), {
      name: name || null,
      description: description || null,
      initialDate: null,
      endDate: null,
      expectedDate: null,
      idState: null,
      projectId,
      phase: Number(phase),
      done: false,
      createdAt: new Date(),
      updateAt: new Date()
    })
    console.log(docRef)
    setLoading(false)
  }

  const createDefaultProjectTasks = async (projectId: string) => {
    const taskList = {
      1.01: {
        phase: 1,
        description:
          'Solicitud esctrita del Presidente del COCODE requiriendo al COMUDE el proyecto priorizado'
      },
      1.02: {
        phase: 1,
        description:
          'Fotocopia del libro de Actas + Certificación de la priorización del COCODE de los proyectos u obra'
      },
      1.03: {
        phase: 1,
        description:
          'Fotocopia del libro de Actas + Certificación de la APROBACIÓN DE COFINANCIAMIENTO DEL COCODE (mano de obra no calificada)'
      },
      1.04: {
        phase: 1,
        description: 'Fotocopia del DPI presidente de COCODE'
      },
      1.05: {
        phase: 1,
        description:
          'Certificación en original extendida por el Secretario Municipal que acredite al Consejo Comunitario de Desarrollo esta integrado, inscrito, funcionando y vigente. así como el nombre de quien lo preside'
      },
      1.06: {
        phase: 1,
        description:
          'Certificación del acta de toma de posesión del Alcalde Municipal'
      },
      1.07: {
        phase: 1,
        description: 'Fotocopia de DPI del Alcalde Municipal (legible)'
      },
      1.08: {
        phase: 1,
        description:
          'Fotocopia del acuerdo de la Junta Electoral Departamental, respecto de la elección de la Corporación Municipal'
      },
      1.09: {
        phase: 1,
        description:
          'Certificación del ACTA DE PRIORIZACIÓN del proyecto por el COMUDE'
      },
      1.1: {
        phase: 1,
        description:
          'Certificación del ACTA DE APROBACIÓN DE COFINANCIAMIENTO del concejo municipal (monto, modalidad de ejecución administración o contrato; y compromiso de operación y mantenimiento cuando el ente rector no sea responsable).'
      },
      1.11: {
        phase: 1,
        description:
          'Servidumbre (Derechos de paso) constituida de conformidad con la ley, con su respectivo plano. Norma 3.5 y 11.3.3'
      },
      1.12: {
        phase: 1,
        description:
          'Certificación reciente (3 MESES DE ANTIGÜEDAD) del REGISTRO GENERAL DE LA PROPIEDAD, donde conste, que el inmueble en que se ejecutará la obra esté inscrito como propiedad del estado o del municipio o entidades descentralizadas y autonomas, en casos especiales se regira por el  (art. 30 bis, ley orgánica del presupuesto) en estos casos presentar escritura de la POSESION y Constancia de Bienes del Estado.  Norma 3.1. 4 y 11.3. 3. (En ambos caso presentar plano de registro)'
      },
      1.13: {
        phase: 1,
        description:
          'Resolución ambiental Favorable emitida por el Ministerio de Ambiente y Recursos Naturales (MARN), Registrando en Número y la fecha en el SINIP.  Fianza de Caución cuando aplique, Norma 3.1.6  (articulo 8, del Decreto 68.86)'
      },
      1.14: {
        phase: 1,
        description:
          'Analisis de gestión de riesgos en proyectos de Inversión Pública (AGRIP) incluir anexos. Dictamen, fotografias y plano de (croquis). Norma 3.1.7. \nIncluir tambien las medidas de mitigación firmados y sellados por el formulador (Supervisor de obras Municipal), evaluador ( Director Municipal de Planificación). Vo.Bo Alcade Municipal.  Sellado y Timbrado por el Profesional formulador. '
      },
      1.15: {
        phase: 1,
        description:
          'Aval del ente Rector (Art. 23 del Decreto No. 114-97) donde consta que a) la inversión propuesta responde a las políticas y lineamientos del sector b) Garantiza la sostenibilidad del proyecto y acepta cubrir los costos de operación y mantenimiento del servicio que genera el proyecto. Norma 3.2.1.\nSi el ente rector no opera el proyecto adjuntar acuerdo Municipal con presupuesto anual o mensual a cubrir.'
      },
      1.16: {
        phase: 1,
        description:
          'Para proyectos que se contruiran en centros o conjuntos historicos urbanos, rurales y en zonas o sitios arqueologicos, paleontologicos o historicos. Presentar la aprobación de la Dirección General del Patrimonio Cultural y Natural.  Norma 3.2.4'
      },
      1.17: {
        phase: 1,
        description:
          'Dictamen Sanitario del Ministerio de Salud Pública y asistencia social de acuerdo a la tipología de salud. (Artículo 86, 88 y 98, Decreto número 90-97 y Acuerdo Gubernativo Número 178-2009). Norma 3.2.5. \n*Dictamen favorable  proyectos de plantas de tratamiento drenajes\n*certificación de la calidad del Agua emitida por el MSPAS\n*Análisis fïsico quimico y bacteriologico'
      },
      1.18: {
        phase: 1,
        description:
          'Documento de Formulación del Proyecto, a nivel de perfil, prefactibilidad, factibilidad según sea el caso. Incluyendo como mínimo 3 alternativas de la solución del problema.\nNumeral 1.11 y Sección 11 de las Normas del SNIP, cumplir con cada númeral en la normativa. (Requisitos perfil)'
      },
      1.19: {
        phase: 1,
        description:
          'Constancias de visita al lugar del proyecto por la persona que realice el estudio, firmada por el profesional especializado en el área, COCODE y DMP.\nAdjuntar informe fotografico del lugar adjuntando fotografias de toda el área y colindancias. Utilizar formatos proporcionados'
      },
      1.2: {
        phase: 1,
        description:
          'Colegiado activo del responsable del estudio técnico. Norma 11.4 inciso f'
      },
      1.21: {
        phase: 1,
        description:
          'Plano de Localización y Ubicación. Estos deben ser Claros y Específicos e incluir Información necesaria como: Coordenadas Geográficas, norte, calles, avenidas, accesos y estado de los mismos, debe incluirse croquis de la comunidad.  (Estos no deben ser mapas del municipio ni ortofotos)'
      },
      1.22: {
        phase: 1,
        description:
          'Georreferenciación del proyecto (ortofoto indicando cordenadas, esta debe coincidir con el SINIP). En el caso de calles, drenaje, agua; indicar coordenadas de inicio y final del proyecto así como cada uno de sus elementos. Deberan análizar lo indicado en la norma 11. 3.3'
      },
      1.23: {
        phase: 1,
        description:
          'Memorias de cálculo y/o diseños, diseños estructurales según el tipo de proyecto estos deben estar timbrados y sellados.'
      },
      1.24: {
        phase: 1,
        description:
          'SEstudio de suelos y otros estudios, dependera del tipo de proyecto. Estudio hidrogeologico cuando exista perforación, estudio hidrologico en el caso de puentes y otros. Norma 11.4  inciso b y normas NRD-1'
      },
      1.25: {
        phase: 1,
        description:
          'Presupuesto: Resumen de presupuesto, desglosado, cronograma fisico y financiero. Firmado y sellado por el profesional responsable y el DMP.'
      },
      1.26: {
        phase: 1,
        description:
          'Especificaciones técnicas que incluyan tambien las medidas de mitigación, mobiliario y equipo, normas NRD indicando las que apliquen al proyecto. Incluir especificaciones generales, especificas y especiales. Norma 11.4  Inciso e, Ver Anexo 6.'
      },
      1.27: {
        phase: 1,
        description:
          'Juego de planos presentar impresos y en digital (ver anexo 6 de contenido minimo de planos) incluir tambien en planos la normas NRD y la normativa del manual del acceso a personas con discapacidad. Anexo 6'
      },
      1.28: {
        phase: 1,
        description:
          'Manual de operación y mantenimiento incluir costo de operación y mantenimiento'
      },
      1.29: {
        phase: 1,
        description: 'Cambio climatico'
      },
      1.3: {
        phase: 1,
        description:
          'Oficio donde conste que dentro de la planificación se cumplieron los lineamientos de conformidad con la Ley 135-96 de Atención a Personas con Discapacidad'
      },
      1.31: {
        phase: 1,
        description:
          'Oficio donde el DMP y Supervisor de obras municipales de su aval a la planificación presentada'
      },
      1.32: {
        phase: 1,
        description: 'Opinion favorable para firma de Convenio del COCODE'
      },
      1.33: {
        phase: 1,
        description: 'Convenio de Cofinanciamiuento de CODEDE'
      }
    }
    for (const key in taskList) {
      await createTask({
        name: key,
        description: taskList[key]?.description ?? '',
        projectId,
        phase: taskList[key]?.phase ?? 0
      })
    }
  }

  const updateTask = async (docId: string, { name }: TaskUpdate) => {
    setLoading(true)
    const pruebaDocRef = doc(db, 'tasks', docId)
    await updateDoc(pruebaDocRef, {
      name
    })
    setLoading(false)
  }

  return {
    getTasks,
    getTask,
    deteleTask,
    createTask,
    updateTask,
    tasks,
    loading,
    createDefaultProjectTasks,
    getTaskFiltered
  }
}

export default useTasks
