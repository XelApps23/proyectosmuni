import { TaskList } from '@/hooks/types/Task'
import Table from '../main/Table'
import { FileList } from '@/hooks/types/File'

type Props = {
  files: FileList,
  tasks: TaskList
}

const FilesTable = ({ files, tasks }: Props) => {
  return <Table headers={['Nombre', 'Tarea perteneciente', 'Test']} cells={Object.keys(files).map(key => ({
    name: files[key].name,
    task: tasks[files[key].taskId]?.name
  }))} />
}

export default FilesTable
