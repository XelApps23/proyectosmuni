import { TaskList } from '@/hooks/types/Task'

type Props = {
  tasks: TaskList
}

export default function Tasks ({ tasks }: Props) {
  return (
    <div id="gantt-grid-container__tasks">
      <div className="gantt-task-row"></div>
      <div className="gantt-task-row"></div>
      <div className="gantt-task-row"></div>

      {tasks &&
        Object.keys(tasks).map((key, i) => (
          <div key={`${i}-${tasks[key]?.id}-${tasks[key].name}`} className="gantt-task-row ">
            <input data-task-id={tasks[key]?.id} value={tasks[key]?.name} />
          </div>
        ))}

      <style jsx>{`
        #gantt-grid-container__tasks {
          outline: 0.5px solid var(--color-outline);
        }

        .gantt-task-row {
          display: flex;
          outline: 0.5px solid var(--color-outline);
          text-align: center;
          height: var(--cell-height);
          border: none;
        }

        input {
          width: 127px;
          border: none;
          outline: none;
          background: none;
        }

        button {
          line-height: 0px;
          color: var(--color-orange);
          background: none;
          border-radius: 5px;
          border: none;
          transition: all 0.2s ease;
        }

        button:focus {
          outline: none;
          transform: scale(1.3);
        }
      `}</style>
    </div>
  )
}
