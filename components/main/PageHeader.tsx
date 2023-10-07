import React from 'react'

type Props = {
  title: string
}

const PageHeader = ({ title }: Props) => {
  return <div className="text-3xl">{title}</div>
}

export default PageHeader
