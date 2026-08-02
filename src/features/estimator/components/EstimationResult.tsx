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
    <div className="space-y-6" role="region" aria-label="Estimation results">
      <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-foreground mb-4">
          Estimation Results
        </h2>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3" role="list" aria-label="Key metrics">
          <div className="rounded-lg bg-muted p-4 text-center" role="listitem">
            <p className="text-3xl font-bold text-foreground" aria-label={`${logCount} logs needed`}>{logCount}</p>
            <p className="text-sm text-muted-foreground mt-1">Logs Needed</p>
          </div>

          <div className="rounded-lg bg-muted p-4 text-center" role="listitem">
            <p className="text-3xl font-bold text-foreground" aria-label={`${duration} hours duration`}>{duration}h</p>
            <p className="text-sm text-muted-foreground mt-1">Duration</p>
          </div>

          <div className="rounded-lg bg-muted p-4 text-center" role="listitem">
            <p className="text-3xl font-bold text-foreground capitalize" aria-label={`${intensity} intensity`}>
              {intensity}
            </p>
            <p className="text-sm text-muted-foreground mt-1">Intensity</p>
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <h3 className="text-sm font-medium text-foreground mb-2">Summary</h3>
        <ul className="space-y-1 text-sm text-muted-foreground" aria-label="Calculation summary">
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
        <p className="text-sm text-muted-foreground" role="note">{tip}</p>
      </div>
    </div>
  )
}
