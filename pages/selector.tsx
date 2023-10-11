import UserSelector from '@/components/main/UserSelector'
import { useEffect, useState } from 'react'

const Selector = () => {
  const [ids, setIds] = useState([])

  useEffect(() => {
    console.log(ids)
  }, [])

  const onSubmit = () => {
    console.log(ids)
  }

  return (
    <>
      <div className="w-1/2">
        <UserSelector setIds={setIds} label="Invitar usuario" />
        <button onClick={onSubmit}>Submit</button>
      </div>
    </>
  )
}

export default Selector
