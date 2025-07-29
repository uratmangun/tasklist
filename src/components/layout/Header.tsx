import { Button } from '@/components/ui/button'
import { ThemeToggle } from '@/components/ui/theme-toggle'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, Zap } from 'lucide-react'
import { useState, useEffect } from 'react'
import { SignInButton, UserButton, useUser } from '@clerk/clerk-react'
import { cn } from '@/lib/utils'

export default function Header() {
  const location = useLocation()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { isSignedIn } = useUser()

  const isActive = (path: string) => location.pathname === path

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen)

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className={cn(
      "sticky top-0 z-50 w-full transition-all duration-300 ease-in-out",
      scrolled 
        ? "border-b bg-background/80 backdrop-blur-md shadow-sm" 
        : "border-b-0 bg-background/60 backdrop-blur-sm"
    )}>
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo/Brand */}
          <div className="flex items-center space-x-3">
            <Link to="/" className="group flex items-center space-x-3 transition-all duration-200 hover:scale-105">
              <div className="relative h-9 w-9 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-200">
                <Zap className="h-5 w-5 text-primary-foreground" />
                <div className="absolute inset-0 rounded-xl bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-xl bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent hidden sm:block">TaskFlow</span>
                <span className="text-xs text-muted-foreground hidden lg:block -mt-1">Productivity Reimagined</span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-2">
            <div className="flex items-center space-x-1 p-1 rounded-full bg-muted/50">
              <Button
                variant={isActive('/') ? 'default' : 'ghost'}
                size="sm"
                asChild
                className={cn(
                  "transition-all duration-200 rounded-full px-4",
                  isActive('/') 
                    ? "bg-primary text-primary-foreground shadow-md" 
                    : "hover:bg-background/80 hover:shadow-sm"
                )}
              >
                <Link to="/" className="font-medium">Home</Link>
              </Button>
              
              <Button
                variant={isActive('/about') ? 'default' : 'ghost'}
                size="sm"
                asChild
                className={cn(
                  "transition-all duration-200 rounded-full px-4",
                  isActive('/about') 
                    ? "bg-primary text-primary-foreground shadow-md" 
                    : "hover:bg-background/80 hover:shadow-sm"
                )}
              >
                <Link to="/about" className="font-medium">About</Link>
              </Button>
            </div>
          </nav>

          {/* Right side actions */}
          <div className="flex items-center space-x-3">
            {/* Authentication */}
            {isSignedIn ? (
              <div className="flex items-center">
                <UserButton 
                  afterSignOutUrl="/" 
                  appearance={{
                    elements: {
                      avatarBox: "h-9 w-9 rounded-full ring-2 ring-primary/20 hover:ring-primary/40 transition-all duration-200"
                    }
                  }}
                />
              </div>
            ) : (
              <SignInButton mode="modal">
                <Button 
                  variant="default" 
                  size="sm"
                  className="rounded-full px-6 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-lg hover:shadow-xl transition-all duration-200 font-medium"
                >
                  Sign In
                </Button>
              </SignInButton>
            )}
            
            <ThemeToggle />
            
            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                "md:hidden rounded-full transition-all duration-200",
                mobileMenuOpen ? "bg-muted rotate-90" : "hover:bg-muted/50"
              )}
              onClick={toggleMobileMenu}
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
              <span className="sr-only">Toggle menu</span>
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className={cn(
          "md:hidden overflow-hidden transition-all duration-300 ease-in-out",
          mobileMenuOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0"
        )}>
          <div className="border-t bg-background/95 backdrop-blur-md">
            <nav className="flex flex-col space-y-2 p-4">
              <Button
                variant={isActive('/') ? 'default' : 'ghost'}
                size="sm"
                asChild
                className={cn(
                  "justify-start rounded-xl transition-all duration-200",
                  isActive('/') 
                    ? "bg-primary text-primary-foreground shadow-md" 
                    : "hover:bg-muted/80"
                )}
                onClick={() => setMobileMenuOpen(false)}
              >
                <Link to="/" className="font-medium">🏠 Home</Link>
              </Button>
              
              <Button
                variant={isActive('/about') ? 'default' : 'ghost'}
                size="sm"
                asChild
                className={cn(
                  "justify-start rounded-xl transition-all duration-200",
                  isActive('/about') 
                    ? "bg-primary text-primary-foreground shadow-md" 
                    : "hover:bg-muted/80"
                )}
                onClick={() => setMobileMenuOpen(false)}
              >
                <Link to="/about" className="font-medium">ℹ️ About</Link>
              </Button>
              
              {!isSignedIn && (
                <div className="pt-2 border-t border-border/50">
                  <SignInButton mode="modal">
                    <Button 
                      variant="default" 
                      size="sm"
                      className="w-full rounded-xl bg-gradient-to-r from-primary to-primary/90 font-medium"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      🚀 Get Started
                    </Button>
                  </SignInButton>
                </div>
              )}
            </nav>
          </div>
        </div>
      </div>
    </header>
  )
}