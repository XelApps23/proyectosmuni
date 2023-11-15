type TaskListObjType = {
  index: number
  phase: number
  description: string
}[]

const TaskListObj: TaskListObjType = [
  {
    index: 1,
    phase: 1,
    description:
      'Solicitud escrita del Presidente del COCODE requiriendo al COMUDE el proyecto priorizado'
  },
  {
    index: 2,
    phase: 1,
    description:
      'Fotocopia del libro de Actas + Certificación de la priorización del COCODE de los proyectos u obra'
  },
  {
    index: 3,
    phase: 1,
    description:
      'Fotocopia del libro de Actas + Certificación de la APROBACIÓN DE COFINANCIAMIENTO DEL COCODE (mano de obra no calificada)'
  },
  {
    index: 4,
    phase: 1,
    description: 'Fotocopia del DPI presidente de COCODE'
  },
  {
    index: 5,
    phase: 1,
    description:
      'Certificación en original extendida por el Secretario Municipal que acredite al Consejo Comunitario de Desarrollo esta integrado, inscrito, funcionando y vigente. así como el nombre de quien lo preside'
  },
  {
    index: 6,
    phase: 1,
    description:
      'Certificación del acta de toma de posesión del Alcalde Municipal'
  },
  {
    index: 7,
    phase: 1,
    description: 'Fotocopia de DPI del Alcalde Municipal (legible)'
  },
  {
    index: 8,
    phase: 1,
    description:
      'Fotocopia del acuerdo de la Junta Electoral Departamental, respecto de la elección de la Corporación Municipal'
  },
  {
    index: 9,
    phase: 1,
    description:
      'Certificación del ACTA DE PRIORIZACIÓN del proyecto por el COMUDE'
  },
  {
    index: 10,
    phase: 1,
    description:
      'Certificación del ACTA DE APROBACIÓN DE COFINANCIAMIENTO del concejo municipal (monto, modalidad de ejecución administración o contrato; y compromiso de operación y mantenimiento cuando el ente rector no sea responsable).'
  },
  {
    index: 11,
    phase: 1,
    description:
      'Servidumbre (Derechos de paso) constituida de conformidad con la ley, con su respectivo plano. Norma 3.5 y 13.3'
  },
  {
    index: 12,
    phase: 1,
    description:
      'Certificación reciente (3 MESES DE ANTIGÜEDAD) del REGISTRO GENERAL DE LA PROPIEDAD, donde conste, que el inmueble en que se ejecutará la obra esté inscrito como propiedad del estado o del municipio o entidades descentralizadas y autonomas, en casos especiales se regira por el  (art. 30 bis, ley orgánica del presupuesto) en estos casos presentar escritura de la POSESION y Constancia de Bienes del Estado.  Norma 3. 4 y 13. 3. (En ambos caso presentar plano de registro)'
  },
  {
    index: 13,
    phase: 1,
    description:
      'Resolución ambiental Favorable emitida por el Ministerio de Ambiente y Recursos Naturales (MARN), Registrando en Número y la fecha en el SINIP.  Fianza de Caución cuando aplique, Norma 3.6  (articulo 8, del Decreto 68.86)'
  },
  {
    index: 14,
    phase: 1,
    description:
      'Analisis de gestión de riesgos en proyectos de Inversión Pública (AGRIP) incluir anexos. Dictamen, fotografias y plano de (croquis). Norma 3.7. \nIncluir tambien las medidas de mitigación firmados y sellados por el formulador (Supervisor de obras Municipal), evaluador ( Director Municipal de Planificación). Vo.Bo Alcade Municipal.  Sellado y Timbrado por el Profesional formulador. '
  },
  {
    index: 15,
    phase: 1,
    description:
      'Aval del ente Rector (Art. 23 del Decreto No. 114-97) donde consta que a) la inversión propuesta responde a las políticas y lineamientos del sector b) Garantiza la sostenibilidad del proyecto y acepta cubrir los costos de operación y mantenimiento del servicio que genera el proyecto. Norma 3.2.\nSi el ente rector no opera el proyecto adjuntar acuerdo Municipal con presupuesto anual o mensual a cubrir.'
  },
  {
    index: 16,
    phase: 1,
    description:
      'Para proyectos que se contruiran en centros o conjuntos historicos urbanos, rurales y en zonas o sitios arqueologicos, paleontologicos o historicos. Presentar la aprobación de la Dirección General del Patrimonio Cultural y Natural.  Norma 3.2.4'
  },
  {
    index: 17,
    phase: 1,
    description:
      'Dictamen Sanitario del Ministerio de Salud Pública y asistencia social de acuerdo a la tipología de salud. (Artículo 86, 88 y 98, Decreto número 90-97 y Acuerdo Gubernativo Número 178-2009). Norma 3.2.5. \n*Dictamen favorable  proyectos de plantas de tratamiento drenajes\n*certificación de la calidad del Agua emitida por el MSPAS\n*Análisis fïsico quimico y bacteriologico'
  },
  {
    index: 18,
    phase: 1,
    description:
      'Documento de Formulación del Proyecto, a nivel de perfil, prefactibilidad, factibilidad según sea el caso. Incluyendo como mínimo 3 alternativas de la solución del problema.\nNumeral 11 y Sección 11 de las Normas del SNIP, cumplir con cada númeral en la normativa. (Requisitos perfil)'
  },
  {
    index: 19,
    phase: 1,
    description:
      'Constancias de visita al lugar del proyecto por la persona que realice el estudio, firmada por el profesional especializado en el área, COCODE y DMP.\nAdjuntar informe fotografico del lugar adjuntando fotografias de toda el área y colindancias. Utilizar formatos proporcionados'
  },
  {
    index: 20,
    phase: 1,
    description:
      'Colegiado activo del responsable del estudio técnico. Norma 14 inciso f'
  },
  {
    index: 21,
    phase: 1,
    description:
      'Plano de Localización y Ubicación. Estos deben ser Claros y Específicos e incluir Información necesaria como: Coordenadas Geográficas, norte, calles, avenidas, accesos y estado de los mismos, debe incluirse croquis de la comunidad.  (Estos no deben ser mapas del municipio ni ortofotos)'
  },
  {
    index: 22,
    phase: 1,
    description:
      'Georreferenciación del proyecto (ortofoto indicando cordenadas, esta debe coincidir con el SINIP). En el caso de calles, drenaje, agua; indicar coordenadas de inicio y final del proyecto así como cada uno de sus elementos. Deberan análizar lo indicado en la norma 1 3.3'
  },
  {
    index: 23,
    phase: 1,
    description:
      'Memorias de cálculo y/o diseños, diseños estructurales según el tipo de proyecto estos deben estar timbrados y sellados.'
  },
  {
    index: 24,
    phase: 1,
    description:
      'SEstudio de suelos y otros estudios, dependera del tipo de proyecto. Estudio hidrogeologico cuando exista perforación, estudio hidrologico en el caso de puentes y otros. Norma 14  inciso b y normas NRD-1'
  },
  {
    index: 25,
    phase: 1,
    description:
      'Presupuesto: Resumen de presupuesto, desglosado, cronograma fisico y financiero. Firmado y sellado por el profesional responsable y el DMP.'
  },
  {
    index: 26,
    phase: 1,
    description:
      'Especificaciones técnicas que incluyan tambien las medidas de mitigación, mobiliario y equipo, normas NRD indicando las que apliquen al proyecto. Incluir especificaciones generales, especificas y especiales. Norma 14  Inciso e, Ver Anexo 6.'
  },
  {
    index: 27,
    phase: 1,
    description:
      'Juego de planos presentar impresos y en digital (ver anexo 6 de contenido minimo de planos) incluir tambien en planos la normas NRD y la normativa del manual del acceso a personas con discapacidad. Anexo 6'
  },
  {
    index: 28,
    phase: 1,
    description:
      'Manual de operación y mantenimiento incluir costo de operación y mantenimiento'
  },
  {
    index: 29,
    phase: 1,
    description: 'Cambio climatico'
  },
  {
    index: 30,
    phase: 1,
    description:
      'Oficio donde conste que dentro de la planificación se cumplieron los lineamientos de conformidad con la Ley 135-96 de Atención a Personas con Discapacidad'
  },
  {
    index: 31,
    phase: 1,
    description:
      'Oficio donde el DMP y Supervisor de obras municipales de su aval a la planificación presentada'
  },
  {
    index: 32,
    phase: 1,
    description: 'Opinion favorable para firma de Convenio del COCODE'
  },
  {
    index: 33,
    phase: 1,
    description: 'Convenio de Cofinanciamiuento de CODEDE'
  },
  {
    index: 1,
    phase: 2,
    description: 'Dictamen de aprobación de estudio de Impacto Ambiental'
  },
  {
    index: 2,
    phase: 2,
    description: 'Estudio de impacto ambiental'
  },
  { index: 3, phase: 2, description: 'Estudio de Factibilidad' },
  { index: 4, phase: 2, description: 'Proyecto de contrato' },
  {
    index: 5,
    phase: 2,
    description: 'Solicitud o requerimiento de bien, servicio o suministro'
  },
  { index: 6, phase: 2, description: 'Diseño del Proyecto' },
  { index: 7, phase: 2, description: 'Resolución de aprobación de bases' },
  {
    index: 8,
    phase: 2,
    description: 'Dictamen de aprobación de estudio de factibilidad'
  },
  { index: 9, phase: 2, description: 'Anuncio, convocatoria o invitación' },
  { index: 10, phase: 2, description: 'Opinión Jurídica o dictamen jurídico' },
  { index: 11, phase: 2, description: 'Selección de supervisor de la obra' },
  { index: 12, phase: 2, description: 'Dictamen técnico' },
  { index: 13, phase: 2, description: 'Boleta de SNIP' },
  {
    index: 14,
    phase: 2,
    description: 'Bases, especificaciones generales o términos de referencia'
  },
  { index: 15, phase: 2, description: 'Modelo de oferta (formulario)' },
  {
    index: 1,
    phase: 3,
    description: 'Notificacion a la junta de Cotizacion o Licitacion del evento'
  },
  {
    index: 2,
    phase: 3,
    description:
      'Remitir bases de proyecto a la junta de Cotizacion o Licitacion por medio de oficio de entrega'
  },
  { index: 3, phase: 3, description: 'Plicas de empresas participantes' },
  { index: 4, phase: 3, description: 'Acta de apertura de plicas' },
  { index: 5, phase: 3, description: 'Acta de adjudicacion' },
  {
    index: 6,
    phase: 3,
    description: 'Notidicacion al Concejo de la adjudicacion para aprobacion'
  },
  { index: 7, phase: 3, description: 'Aprobacion de Acta de Adjudicacion' },
  {
    index: 8,
    phase: 3,
    description: 'Notificacion al oferente de parte de junta de la adjudicacion'
  },
  {
    index: 9,
    phase: 3,
    description:
      'Indicadores cost: Aprobacion de acuerdo financiamiento CDP DAFIM'
  },
  {
    index: 10,
    phase: 3,
    description: 'Indicadores cost: Nombramiento de supervisor'
  },
  {
    index: 11,
    phase: 3,
    description: 'Indicadores cost: Aprobacion de cuadro cantidades de trabajo'
  },
  {
    index: 12,
    phase: 3,
    description:
      'Indicadores cost: Aprobacion de programa preliminar de inversion y ejecucion de trabajo'
  },
  { index: 1, phase: 4, description: 'Contrato administrativo' },
  {
    index: 2,
    phase: 4,
    description: 'Acuerdo de aprobacion de contrato administrativo'
  },
  { index: 3, phase: 4, description: 'Fianza de Anticipo' },
  { index: 4, phase: 4, description: 'Fianza de Cumplimiento de Contrato' },
  { index: 5, phase: 4, description: 'Acta de Inicio' },
  {
    index: 6,
    phase: 4,
    description: 'Registro de Contrato en Contraloria General de Cuentas'
  },
  {
    index: 1,
    phase: 5,
    description: 'PAGO ANTICIPO: Solicitud de empresa del pago del anticipo'
  },
  {
    index: 2,
    phase: 5,
    description:
      'PAGO ANTICIPO: Cuadro de ejecucion fisica y financiera del 20%, firmado por representante legal y supervisor residente'
  },
  {
    index: 3,
    phase: 5,
    description: 'PAGO ANTICIPO: Copia de autorizacion de bitacora'
  },
  {
    index: 4,
    phase: 5,
    description: 'PAGO ANTICIPO: Acuerdo de pago de anticipo'
  },
  {
    index: 5,
    phase: 5,
    description:
      'PAGO ANTICIPO: Documentos que amparen el pago del anticipo (solicitar DAFIM)'
  },
  {
    index: 1,
    phase: 6,
    description:
      'INFORMES DE SUPERVISION: Informes de Supervicion Municipal firmados y sellados en todas las hojas a color, con firma de VoBo del Alcalde Municipal'
  },
  {
    index: 2,
    phase: 6,
    description:
      'INFORMES DE SUPERVISION: Acuerdo de aprobacion de informe de supervision'
  },
  {
    index: 3,
    phase: 6,
    description:
      'INFORMES DE SUPERVISION: Informes de Supervicion de empresa, firmados y sellados por Supervisor Residente y Representante Legal en todas las hojas, a color'
  },
  {
    index: 4,
    phase: 6,
    description:
      'INFORMES DE SUPERVISION: Solicitud de la empresa para que se realice supervision de parte del Supervisor Municipal'
  },
  {
    index: 5,
    phase: 6,
    description:
      'DOCUMENTACION DE ESTIMACION DE PAGO: Solicitud de la empresa para que se realice pago de estimacion'
  },
  {
    index: 6,
    phase: 6,
    description:
      'DOCUMENTACION DE ESTIMACION DE PAGO: Bitacora hasta el avance que se requiera pagar'
  },
  {
    index: 7,
    phase: 6,
    description:
      'DOCUMENTACION DE ESTIMACION DE PAGO: Acuerdo municipal donde se aprueba el pago'
  },
  {
    index: 8,
    phase: 6,
    description:
      'Documentos que amparen el pago de estimacion (Solicitar DAFIM)'
  },
  {
    index: 1,
    phase: 7,
    description:
      'DOCUMENTO DE CAMBIO: Solicitud de empresa para realizar Documento de cambio'
  },
  {
    index: 2,
    phase: 7,
    description:
      'DOCUMENTO DE CAMBIO: Dictamen Tecnico de Supervision Municipal, firmado y sellado'
  },
  {
    index: 3,
    phase: 7,
    description:
      'DOCUMENTO DE CAMBIO: Dictamen Tecnico de Supervision Residente, firmado y sellado'
  },
  {
    index: 4,
    phase: 7,
    description: 'DOCUMENTO DE CAMBIO: Cuadros de OC, OTS, ATE, cuando aplique'
  },
  {
    index: 5,
    phase: 7,
    description:
      'DOCUMENTO DE CAMBIO: Planos de la modificacion (planos debe decir Documento de cambio'
  },
  {
    index: 6,
    phase: 7,
    description:
      'DOCUMENTO DE CAMBIO: Especificaciones tecnicas y renglones nuevos si hubiese ATE'
  },
  {
    index: 7,
    phase: 7,
    description: 'DOCUMENTO DE CAMBIO: Memorias de calculo cuando aplique'
  },
  {
    index: 8,
    phase: 7,
    description:
      'DOCUMENTO DE CAMBIO: Anotacion en bitacora que se realizara el documento de cambio'
  },
  {
    index: 9,
    phase: 7,
    description: 'DOCUMENTO DE CAMBIO: Derechos de paso cuando aplique'
  },
  {
    index: 10,
    phase: 7,
    description: 'DOCUMENTO DE CAMBIO: Notificacion al COCODE'
  },
  {
    index: 11,
    phase: 7,
    description:
      'DOCUMENTO DE CAMBIO: Acuerdo Municipal del documento de cambio'
  },
  {
    index: 1,
    phase: 8,
    description:
      'Solicitud de la empresa para realizar supervision final, donde se indique que la obra esta al 100%'
  },
  {
    index: 2,
    phase: 8,
    description:
      'Informe del Supervisor Residente de la obra firmado y sellado en todas las hojas, a color, firmado por el representante legal y supervisor de obras de la empresa'
  },
  {
    index: 3,
    phase: 8,
    description:
      'Informe del Supervisor Municipal firmado y sellado en todas las hojas, a color, firmado por el Alcalde Municipal y Supervisor de Obras Municipales'
  },
  {
    index: 4,
    phase: 8,
    description: 'Acuerdo de aprobacion de informe de supervision Municipal'
  },
  {
    index: 5,
    phase: 8,
    description:
      'Informe Pormenorizado del Supervisor Municipal firmado y sellado en todas las hojas, a color'
  },
  {
    index: 6,
    phase: 8,
    description: 'Acuerdo de aprobacion de informe pormenorizado'
  },
  { index: 7, phase: 8, description: 'Bitacora al 100%' },
  { index: 8, phase: 8, description: 'Certificados de Calidad' },
  { index: 9, phase: 8, description: 'Planos Finales' },
  { index: 10, phase: 8, description: 'Aprobacion de Planos Finales' },
  { index: 11, phase: 8, description: 'Acta de Recepcion' },
  { index: 12, phase: 8, description: 'Acta de liquidacion' },
  { index: 13, phase: 8, description: 'Fianza de Conservacion de obra' },
  { index: 14, phase: 8, description: 'Fianza de Saldos Deudores' },
  {
    index: 15,
    phase: 8,
    description: 'Solicitud de la empresa para Pago de Liquidacion Final'
  },
  { index: 16, phase: 8, description: 'Aprobacion de Pago de Liquidacion' },
  {
    index: 17,
    phase: 8,
    description:
      'Documentos que amparen el pago de liquidacion (Solicitar en DAFIM)'
  }
]

export default TaskListObj
