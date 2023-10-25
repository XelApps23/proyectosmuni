import { ReactNode } from "react"

const styles = {
  cell: 'px-6 py-4 whitespace-nowrap',
  gridContainer: 'grid grid-cols-3 gap-2 p-2',
  colTitle: 'font-semibold text-sm'
}

type Props = {
  children: ReactNode
  title: string
}

const Info = ({ children, title }: Props) => {
  return (
    <div className={styles.gridContainer}>
      <h2 className={styles.colTitle}>{title}</h2>
      <p className="col-span-2 flex">
        {children}
      </p>
    </div>
  )
}

export default Info
