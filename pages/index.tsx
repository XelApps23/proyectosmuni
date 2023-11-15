import { useRouter } from 'next/router'
import React, { useEffect } from 'react'

const Home = () => {
  const router = useRouter()

  useEffect(() => {
    router.push('/home')
  }, [])

  return <div></div>
}

export default Home
