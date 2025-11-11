import { Moon, Sun } from 'lucide-react'

import { Button } from '@/components/ui/button'

import { useTheme } from '../providers/theme-provider'

export function Navbar() {
  const { theme, toggleTheme } = useTheme()

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-primary">MovieApp</h1>
        <Button variant="ghost" size="icon" onClick={toggleTheme}>
          {theme === 'light' ? (
            <Moon className="h-5 w-5" />
          ) : (
            <Sun className="h-5 w-5" />
          )}
        </Button>
      </div>
    </nav>
  )
}
