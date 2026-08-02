import { useState } from "react"
import { AppLayout } from "./components/layout/AppLayout"
import { EstimatorForm } from "./features/estimator/components/EstimatorForm"
import { EstimationResult } from "./features/estimator/components/EstimationResult"
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
        <EstimationResult formData={formData} />
      </div>
    </AppLayout>
  )
}

export default App
