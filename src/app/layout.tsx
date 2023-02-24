import {ReactNode} from "react";

export const metadata = {
  title: 'Movie',
  description: 'Movie App',
}

const RootLayout = ({children}: { children: ReactNode }) => {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

export default RootLayout
