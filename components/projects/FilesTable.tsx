import Table from '../main/Table'
import { FileList } from '@/hooks/types/File'

type Props = {
  files: FileList
}

const FilesTable = ({ files }: Props) => {
  return <Table headers={['Nombre', 'Tarea perteneciente', 'Test']} cells={Object.keys(files).map(key => ({
    name: files[key].name,
    task: files[key].taskId
  }))} />
}

export default FilesTable
