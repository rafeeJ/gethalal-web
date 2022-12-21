import { AuthenticatedUserProvider } from '../contexts/AuthenticatedUser'
import { RegionProvider } from '../contexts/RegionProvider'
import '../styles/globals.css'
import NextNProgress from 'nextjs-progressbar'

function MyApp({ Component, pageProps }) {
  return (
    <AuthenticatedUserProvider>
      <RegionProvider>
        <NextNProgress />
        <Component {...pageProps} />
      </RegionProvider>
    </AuthenticatedUserProvider>
  )
}

export default MyApp
