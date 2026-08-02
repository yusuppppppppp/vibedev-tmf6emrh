import type { ReactNode } from "react"

interface AppLayoutProps {
  children: ReactNode
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <main className="min-h-screen bg-background" role="main" aria-label="Campfire Wood Log Estimator Application">
      <header className="border-b border-border bg-background/80 backdrop-blur-sm sticky top-0 z-50" role="banner">
        <div className="mx-auto max-w-2xl px-4 py-4 sm:px-6 lg:px-8">
          <h1 className="text-xl font-semibold tracking-tight text-foreground">
            Campfire Wood Log Estimator
          </h1>
        </div>
      </header>
      <section className="mx-auto max-w-2xl px-4 py-8 sm:px-6 lg:px-8" aria-label="Estimator content">
        {children}
      </section>
    </main>
  )
}
