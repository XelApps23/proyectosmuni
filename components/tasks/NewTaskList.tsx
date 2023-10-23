import { TaskList } from '@/hooks/types/Task'
import React from 'react'

type Props = {
  tasks: TaskList
}

const NewTaskList = ({ tasks }: Props) => {
  return (
    <div className="flex flex-col bg-fondo">
      <div className="-m-1.5 overflow-x-auto">
        <div className="p-1.5 min-w-full inline-block">
          <div className="border border-gray2 rounded-lg overflow-hidden">
            <table className="min-w-full divide-y divide-gray2">
              <tbody className="divide-y divide-gray2">
                {Object.keys(tasks).map((key, index) => (
                  <tr key={index}>
                    <td key={index} className="px-6 py-4 whitespace-nowrap">
                      {tasks[key]?.name}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NewTaskList
