import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import type { EstimatorFormData, FireIntensity } from "../types"
import { estimatorSchema } from "../utils/validation"

interface EstimatorFormProps {
  onFormChange: (data: EstimatorFormData) => void
}

const INTENSITY_OPTIONS: { value: FireIntensity; label: string }[] = [
  { value: "cozy", label: "Cozy" },
  { value: "medium", label: "Medium" },
  { value: "roaring", label: "Roaring" },
]

const DEFAULT_VALUES: EstimatorFormData = {
  peopleCount: 2,
  duration: 3,
  intensity: "medium",
}

export function EstimatorForm({ onFormChange }: EstimatorFormProps) {
  const { register, watch, reset } = useForm<EstimatorFormData>({
    resolver: zodResolver(estimatorSchema),
    defaultValues: DEFAULT_VALUES,
  })

  const peopleCount = watch("peopleCount")
  const duration = watch("duration")
  const intensity = watch("intensity")

  useEffect(() => {
    onFormChange({ peopleCount, duration, intensity })
  }, [peopleCount, duration, intensity, onFormChange])

  const handleReset = () => {
    reset(DEFAULT_VALUES)
    onFormChange(DEFAULT_VALUES)
  }

  return (
    <form className="space-y-6">
      <fieldset className="space-y-4">
        <legend className="text-sm font-medium text-foreground">
          Campfire Settings
        </legend>

        <div className="space-y-2">
          <label
            htmlFor="peopleCount"
            className="block text-sm font-medium text-foreground"
          >
            Number of People
          </label>
          <input
            {...register("peopleCount", { valueAsNumber: true })}
            id="peopleCount"
            type="number"
            min={1}
            max={20}
            className="w-full rounded-lg border border-border bg-background px-3 py-2 text-foreground shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="duration"
            className="block text-sm font-medium text-foreground"
          >
            Burn Duration (hours)
          </label>
          <input
            {...register("duration", { valueAsNumber: true })}
            id="duration"
            type="range"
            min={1}
            max={8}
            step={1}
            className="w-full accent-primary"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>1h</span>
            <span className="font-medium text-foreground">{duration}h</span>
            <span>8h</span>
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-foreground">
            Fire Intensity
          </label>
          <div className="flex gap-2">
            {INTENSITY_OPTIONS.map(({ value, label }) => (
              <label
                key={value}
                className={`flex-1 cursor-pointer rounded-lg border border-border px-3 py-2 text-center text-sm transition-colors ${
                  intensity === value
                    ? "border-primary bg-primary text-primary-foreground"
                    : "bg-background text-foreground hover:bg-muted"
                }`}
              >
                <input
                  {...register("intensity")}
                  type="radio"
                  value={value}
                  className="sr-only"
                />
                {label}
              </label>
            ))}
          </div>
        </div>
      </fieldset>

      <button
        type="button"
        onClick={handleReset}
        className="w-full rounded-lg border border-border bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
      >
        Reset
      </button>
    </form>
  )
}
