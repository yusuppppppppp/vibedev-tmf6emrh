import { useState } from "react"
import { AppLayout } from "./components/layout/AppLayout"
import { CampfireVisual } from "./components/ui/CampfireVisual"
import { EstimatorForm } from "./features/estimator/components/EstimatorForm"
import { EstimationResult } from "./features/estimator/components/EstimationResult"
import type { EstimatorFormData } from "./features/estimator/types"
import { calculateLogCount } from "./features/estimator/utils/calculate"

function App() {
  const [formData, setFormData] = useState<EstimatorFormData>({
    peopleCount: 2,
    duration: 3,
    intensity: "medium",
  })

  const logCount = calculateLogCount(
    formData.peopleCount,
    formData.duration,
    formData.intensity
  )

  return (
    <AppLayout>
      <div className="space-y-8">
        <EstimatorForm onFormChange={setFormData} />

        <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-foreground mb-4">
            Campfire Preview
          </h2>
          <CampfireVisual intensity={formData.intensity} logCount={logCount} />
        </div>

        <EstimationResult formData={formData} />
      </div>
    </AppLayout>
  )
}

export default App
