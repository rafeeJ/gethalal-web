import { RegionProvider } from '../contexts/RegionProvider'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <RegionProvider>
      <Component {...pageProps} />
    </RegionProvider>
  )
}

export default MyApp
