import Default from '@/layout/Default'
import store from '@/store'
import '@/styles/globals.css'
import { NextPage } from 'next'
import type { AppProps } from 'next/app'
import { ReactElement, ReactNode } from 'react'
import { Provider } from 'react-redux'
import { ChakraProvider } from '@chakra-ui/react'

type Page = NextPage & {
  layout?: (page: ReactElement) => ReactNode
}

type Layout = AppProps & {
  Component: Page
}

export default function App ({ Component, pageProps }: Layout) {
  const layout =
    Component.layout ?? ((page) => <Default>{page}</Default>)

  return (
    <ChakraProvider>
      <Provider store={store}>{layout(<Component {...pageProps} />)}</Provider>
    </ChakraProvider>
  )
}
