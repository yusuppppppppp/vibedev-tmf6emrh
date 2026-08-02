import { useState } from "react"
import { AppLayout } from "./components/layout/AppLayout"
import { EstimatorForm } from "./features/estimator/components/EstimatorForm"
import type { EstimatorFormData } from "./features/estimator/types"

function App() {
  const [formData, setFormData] = useState<EstimatorFormData>({
    peopleCount: 2,
    duration: 3,
    intensity: "medium",
  })

  return (
    <AppLayout>
      <div className="space-y-8">
        <EstimatorForm onFormChange={setFormData} />
        <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
          <p className="text-muted-foreground">
            Results will appear here...
          </p>
          <pre className="mt-4 text-xs text-muted-foreground">
            {JSON.stringify(formData, null, 2)}
          </pre>
        </div>
      </div>
    </AppLayout>
  )
}

export default App
