import { ReactNode } from 'react'

interface PeopleSuggestedProps{
  icon: ReactNode,
  text: string
}

const PeopleSuggested = ({
  icon,
  text
}: PeopleSuggestedProps) => {
  return (
        <>
          <div className='rounded-md gap-x-1 flex w-full hover:bg-fondo p-2'>
            <div className='md:w-5'> {icon} </div>
            <p> {text} </p>
          </div>
        </>
  )
}

export default PeopleSuggested
