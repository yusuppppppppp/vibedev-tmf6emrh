import type { FireIntensity } from "../../features/estimator/types"

interface CampfireVisualProps {
  intensity: FireIntensity
  logCount: number
}

const INTENSITY_CONFIG: Record<FireIntensity, { flameHeight: number; flameWidth: number; flameCount: number; sparkCount: number; colors: [string, string, string] }> = {
  cozy: { flameHeight: 30, flameWidth: 20, flameCount: 3, sparkCount: 2, colors: ["#fef08a", "#fbbf24", "#f97316"] },
  medium: { flameHeight: 45, flameWidth: 25, flameCount: 5, sparkCount: 4, colors: ["#fbbf24", "#f97316", "#ef4444"] },
  roaring: { flameHeight: 60, flameWidth: 35, flameCount: 7, sparkCount: 6, colors: ["#f97316", "#ef4444", "#dc2626"] },
}

const FLAME_MULTS = [[0.85, 0.7], [1, 0.9], [0.95, 1], [0.9, 0.8], [1.05, 0.95], [0.88, 0.85], [1.02, 0.75]]
const SPARK_POS = [[90, 45], [110, 42], [95, 48], [105, 40], [88, 50], [112, 44]]
const LOG_POS = [[88, 120, -45], [100, 122, -15], [112, 120, 15], [85, 124, -60], [115, 124, 60], [95, 126, -30], [105, 126, 30], [100, 128, 0]]

export function CampfireVisual({ intensity, logCount }: CampfireVisualProps) {
  const c = INTENSITY_CONFIG[intensity]
  const n = Math.min(logCount, 8)

  return (
    <div className="relative w-full max-w-xs mx-auto">
      <style>{`
        @keyframes flicker { 0%{transform:scaleY(1) scaleX(1)} 100%{transform:scaleY(1.1) scaleX(.95)} }
        @keyframes spark { 0%{opacity:1;transform:translateY(0)} 100%{opacity:0;transform:translateY(-40px)} }
        @keyframes smoke { 0%{opacity:.3;transform:translateY(0) scale(1)} 100%{opacity:0;transform:translateY(-20px) scale(1.5)} }
      `}</style>
      <svg viewBox="0 0 200 150" className="w-full h-auto" role="img" aria-label={`Campfire with ${intensity} intensity and approximately ${logCount} logs`}>
        <ellipse cx="100" cy="135" rx="70" ry="10" fill="#78716c" opacity=".3" />
        <circle cx="100" cy="30" r="8" fill="#9ca3af" opacity=".2" style={{ animation: "smoke 3s ease-out infinite" }} />
        <g>
          {Array.from({ length: c.flameCount }).map((_, i) => {
            const off = (i - (c.flameCount - 1) / 2) * 12
            const [hm, wm] = FLAME_MULTS[i % FLAME_MULTS.length]
            return <ellipse key={i} cx={100 + off} cy={100 - c.flameHeight * hm / 2} rx={c.flameWidth * wm / 2} ry={c.flameHeight * hm / 2} fill={c.colors[i % 3]} opacity=".9" style={{ animation: `flicker 1.5s ease-in-out ${i * .1}s infinite alternate` }} />
          })}
        </g>
        <g>
          {Array.from({ length: c.sparkCount }).map((_, i) => {
            const [x, y] = SPARK_POS[i % SPARK_POS.length]
            return <circle key={i} cx={x} cy={y} r={2} fill="#fbbf24" style={{ animation: `spark 2s ease-out ${i * .3}s infinite` }} />
          })}
        </g>
        <g>
          {Array.from({ length: n }).map((_, i) => {
            const [x, y, rot] = LOG_POS[i % LOG_POS.length]
            return <rect key={i} x={x - 12} y={y} width={24} height={6} rx={3} fill="#78716c" transform={`rotate(${rot} ${x} ${y + 3})`} />
          })}
        </g>
        <ellipse cx="100" cy="128" rx="40" ry="6" fill="#44403c" />
      </svg>
    </div>
  )
}
