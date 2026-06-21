import { Toaster } from 'sonner'
import AppRoutes from './routes/AppRoutes'
import { Suspense } from 'react'
import { Loader2 } from 'lucide-react'

function App() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-screen">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      }
    >
      <Toaster />
      <AppRoutes />
    </Suspense>
  )
}

export default App
