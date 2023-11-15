import { TaskList } from '@/hooks/types/Task'

type Props = {
  tasks: TaskList
  clickPhase: (phase: number) => void
}

const styles = {
  base: 'flex justify-center items-center outline outline-[0.5px] outline-fondo h-10'
}

export default function Tasks ({ tasks, clickPhase }: Props) {
  return (
    <div id="gantt-grid-container__tasks">
      <div className={styles.base}></div>
      <div className={styles.base}></div>
      <div className={styles.base}></div>

      <div className={styles.base} onClick={() => clickPhase(1)}>
        Fase 1
      </div>
      {tasks &&
        Object.keys(tasks).map((key, i) => (
          <div key={`${i}-${tasks[key]?.id}-${tasks[key].name}`} className={styles.base + ` `}>
            {tasks[key]?.name}
          </div>
        ))}

      <style jsx>{`
        #gantt-grid-container__tasks {
          outline: 0.5px solid var(--color-outline);
        }
      `}</style>
    </div>
  )
}
