import { Navbar } from '@/components/navbar'
import { ThemeProvider } from '@/providers/theme-provider'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ThemeProvider>
      <Navbar />
      {children}
    </ThemeProvider>
  )
}
