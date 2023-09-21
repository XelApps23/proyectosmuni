import NewProject from '@/components/forms/NewProject'
import BaseLayout from '@/src/components/BaseLayout'
import React from 'react'

const NewProjectPage = () => {
  return (
    <BaseLayout>
      <div className="w-full justify-center items-center flex">
        <NewProject />
      </div>
    </BaseLayout>
  )
}

export default NewProjectPage
