import { Inter } from "next/font/google"
import "./globals.css"
import { AuthProvider } from "../lib/auth"
import { Toaster } from "../components/ui/toaster"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "EcoLink+ - Sustainable Fashion Platform",
  description: "Return, donate, and rewear clothes with local impact",
    generator: 'v0.dev'
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          {children}
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  )
}
