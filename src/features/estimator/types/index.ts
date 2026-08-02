export type FireIntensity = "cozy" | "medium" | "roaring"

export interface EstimatorFormData {
  peopleCount: number
  duration: number
  intensity: FireIntensity
}

export interface EstimationResult {
  logCount: number
  tip: string
}
