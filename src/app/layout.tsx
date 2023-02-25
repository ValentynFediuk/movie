import 'stylesheets/main.scss'
import {ReactNode} from "react";
import {MainLayout} from "layouts";

export const metadata = {
  title: 'Movie',
  description: 'Movie App',
}

const RootLayout = ({children}: { children: ReactNode }) => {
  return (
    <html lang="en">
      <body>
        <MainLayout>
          {children}
        </MainLayout>
      </body>
    </html>
  )
}

export default RootLayout