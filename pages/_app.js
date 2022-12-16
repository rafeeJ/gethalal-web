import { AuthenticatedUserProvider } from '../contexts/AuthenticatedUser'
import { RegionProvider } from '../contexts/RegionProvider'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <AuthenticatedUserProvider>
      <RegionProvider>
        <Component {...pageProps} />
      </RegionProvider>
    </AuthenticatedUserProvider>
  )
}

export default MyApp
