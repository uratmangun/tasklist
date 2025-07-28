import { Suspense, lazy } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ClerkProvider } from '@clerk/clerk-react'
import Layout from '@/components/layout/Layout'
import LoadingSpinner from '@/components/common/LoadingSpinner'
import RouteErrorBoundary from '@/components/common/RouteErrorBoundary'
import GlobalErrorBoundary from '@/components/common/GlobalErrorBoundary'
import { ThemeProvider } from '@/components/providers/ThemeProvider'
import { Toaster } from '@/components/ui/toaster'
import { StagewiseToolbar } from '@stagewise/toolbar-react'
import ReactPlugin from '@stagewise-plugins/react'

// Lazy load pages for code splitting
const HomePage = lazy(() => import('@/pages/HomePage'))
const AboutPage = lazy(() => import('@/pages/AboutPage'))
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage'))

// Import your publishable key
const PUBLISHABLE_KEY = import.meta.env['VITE_CLERK_PUBLISHABLE_KEY']

if (!PUBLISHABLE_KEY) {
  throw new Error('Missing Publishable Key')
}

function App() {
  return (
    <GlobalErrorBoundary>
      <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
        <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
          <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route
                index
                element={
                  <RouteErrorBoundary>
                    <Suspense fallback={<LoadingSpinner />}>
                      <HomePage />
                    </Suspense>
                  </RouteErrorBoundary>
                }
              />
              <Route
                path="about"
                element={
                  <RouteErrorBoundary>
                    <Suspense fallback={<LoadingSpinner />}>
                      <AboutPage />
                    </Suspense>
                  </RouteErrorBoundary>
                }
              />
              <Route
                path="*"
                element={
                  <RouteErrorBoundary>
                    <Suspense fallback={<LoadingSpinner />}>
                      <NotFoundPage />
                    </Suspense>
                  </RouteErrorBoundary>
                }
              />
            </Route>
          </Routes>
          <Toaster />
          </BrowserRouter>
          <StagewiseToolbar config={{ plugins: [ReactPlugin] }} />
        </ThemeProvider>
      </ClerkProvider>
    </GlobalErrorBoundary>
  )
}

export default App
