import { useRouter } from 'next/router'
import BaseLayout from '@/src/components/BaseLayout'
import React, { useEffect } from 'react'

const Home = () => {
  const router = useRouter()

  useEffect(() => {
    router.push('/home')
  }, [])

  return (
    <BaseLayout>
      <div></div>
    </BaseLayout>
  )
}

export default Home
