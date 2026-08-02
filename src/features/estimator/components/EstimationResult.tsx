import type { EstimatorFormData } from "../types"
import {
  calculateLogCount,
  getFriendlyTip,
  getPeopleModifier,
} from "../utils/calculate"

interface EstimationResultProps {
  formData: EstimatorFormData
}

export function EstimationResult({ formData }: EstimationResultProps) {
  const { peopleCount, duration, intensity } = formData
  const logCount = calculateLogCount(peopleCount, duration, intensity)
  const tip = getFriendlyTip(peopleCount, duration, intensity)
  const modifier = getPeopleModifier(peopleCount)
  const modifierPercent = Math.round(modifier * 100)

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-foreground mb-4">
          Estimation Results
        </h2>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-lg bg-muted p-4 text-center">
            <p className="text-3xl font-bold text-foreground">{logCount}</p>
            <p className="text-sm text-muted-foreground mt-1">Logs Needed</p>
          </div>

          <div className="rounded-lg bg-muted p-4 text-center">
            <p className="text-3xl font-bold text-foreground">{duration}h</p>
            <p className="text-sm text-muted-foreground mt-1">Duration</p>
          </div>

          <div className="rounded-lg bg-muted p-4 text-center">
            <p className="text-3xl font-bold text-foreground capitalize">
              {intensity}
            </p>
            <p className="text-sm text-muted-foreground mt-1">Intensity</p>
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <h3 className="text-sm font-medium text-foreground mb-2">Summary</h3>
        <ul className="space-y-1 text-sm text-muted-foreground">
          <li>
            Base rate: {intensity} intensity × {duration} hours
          </li>
          <li>
            People modifier: {peopleCount} people (+{modifierPercent}%)
          </li>
          <li className="font-medium text-foreground">
            Total: {logCount} logs
          </li>
        </ul>
      </div>

      <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <h3 className="text-sm font-medium text-foreground mb-2">
          Campfire Tip
        </h3>
        <p className="text-sm text-muted-foreground">{tip}</p>
      </div>
    </div>
  )
}
