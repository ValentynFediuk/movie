import 'stylesheets/main.scss'
import {ReactNode} from "react";
import {MainLayout} from "layouts";
import { Roboto } from 'next/font/google';
import 'keen-slider/keen-slider.min.css'

export const metadata = {
  title: 'Movie',
  description: 'Movie App',
}

const roboto = Roboto({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
  display: 'swap'
})

const RootLayout = ({children}: { children: ReactNode }) => (
    <html className={roboto.className} lang='en'>
      <body>
        <MainLayout>
          {children}
        </MainLayout>
      </body>
    </html>
  )

export default RootLayout