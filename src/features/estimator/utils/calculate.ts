import type { FireIntensity } from "../types"

export const BASE_RATES: Record<FireIntensity, number> = {
  cozy: 2,
  medium: 3,
  roaring: 5,
}

export const PEOPLE_MODIFIERS = [
  { min: 1, max: 2, modifier: 0 },
  { min: 3, max: 5, modifier: 0.2 },
  { min: 6, max: Infinity, modifier: 0.4 },
] as const

export function getPeopleModifier(peopleCount: number): number {
  for (const range of PEOPLE_MODIFIERS) {
    if (peopleCount >= range.min && peopleCount <= range.max) {
      return range.modifier
    }
  }
  return 0
}

export function calculateLogCount(
  peopleCount: number,
  duration: number,
  intensity: FireIntensity
): number {
  const base = BASE_RATES[intensity]
  const modifier = 1 + getPeopleModifier(peopleCount)
  return Math.ceil(base * duration * modifier)
}

export function getFriendlyTip(
  peopleCount: number,
  duration: number,
  intensity: FireIntensity
): string {
  const logCount = calculateLogCount(peopleCount, duration, intensity)

  if (logCount <= 6) {
    return "A small fire is perfect for a cozy evening. Enjoy the warmth!"
  }
  if (logCount <= 15) {
    return "You'll have a great campfire going. Don't forget the marshmallows!"
  }
  if (logCount <= 30) {
    return "That's a serious fire! Make sure you have enough space and safety gear."
  }
  return "Wow, that's an epic bonfire! Ensure you have proper supervision and a water source nearby."
}
