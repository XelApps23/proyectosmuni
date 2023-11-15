import Default from '@/layout/Default'
import store from '@/store'
import '@/styles/globals.css'
import { NextPage } from 'next'
import type { AppProps } from 'next/app'
import { ReactElement, ReactNode, useState } from 'react'
import { Provider } from 'react-redux'
import { ChakraProvider } from '@chakra-ui/react'
// eslint-disable-next-line camelcase
import { MenuContext } from '@/context/MenuContext'

type Page = NextPage & {
  layout?: (page: ReactElement) => ReactNode
}

type Layout = AppProps & {
  Component: Page
}


export default function App({ Component, pageProps }: Layout) {
  const layout = Component.layout ?? ((page) => <Default>{page}</Default>)
  const [openMenu, setOpenMenu] = useState(false)

  return (
      <ChakraProvider>
        <Provider store={store}>
          <MenuContext.Provider value={{ openMenu, setOpenMenu }}>
            {layout(<Component {...pageProps} />)}
          </MenuContext.Provider>
        </Provider>
      </ChakraProvider>
  )
}
