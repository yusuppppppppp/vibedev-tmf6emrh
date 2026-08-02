import type { FireIntensity } from "../../features/estimator/types"

interface CampfireVisualProps {
  intensity: FireIntensity
  logCount: number
}

const INTENSITY_CONFIG = {
  cozy: {
    flameHeight: 30,
    flameWidth: 20,
    flameCount: 3,
    sparkCount: 2,
    colors: { outer: "#f97316", inner: "#fbbf24", core: "#fef08a" },
  },
  medium: {
    flameHeight: 45,
    flameWidth: 25,
    flameCount: 5,
    sparkCount: 4,
    colors: { outer: "#ef4444", inner: "#f97316", core: "#fbbf24" },
  },
  roaring: {
    flameHeight: 60,
    flameWidth: 35,
    flameCount: 7,
    sparkCount: 6,
    colors: { outer: "#dc2626", inner: "#ef4444", core: "#f97316" },
  },
}

const FLAME_VARIATIONS = [
  { heightMult: 0.85, widthMult: 0.7 },
  { heightMult: 1.0, widthMult: 0.9 },
  { heightMult: 0.95, widthMult: 1.0 },
  { heightMult: 0.9, widthMult: 0.8 },
  { heightMult: 1.05, widthMult: 0.95 },
  { heightMult: 0.88, widthMult: 0.85 },
  { heightMult: 1.02, widthMult: 0.75 },
]

const SPARK_POSITIONS = [
  { x: 90, y: 45 },
  { x: 110, y: 42 },
  { x: 95, y: 48 },
  { x: 105, y: 40 },
  { x: 88, y: 50 },
  { x: 112, y: 44 },
]

const LOG_POSITIONS = [
  { x: 88, y: 120, rotation: -45 },
  { x: 100, y: 122, rotation: -15 },
  { x: 112, y: 120, rotation: 15 },
  { x: 85, y: 124, rotation: -60 },
  { x: 115, y: 124, rotation: 60 },
  { x: 95, y: 126, rotation: -30 },
  { x: 105, y: 126, rotation: 30 },
  { x: 100, y: 128, rotation: 0 },
]

function Flame({
  x,
  height,
  width,
  color,
  delay,
}: {
  x: number
  height: number
  width: number
  color: string
  delay: number
}) {
  return (
    <ellipse
      cx={x}
      cy={100 - height / 2}
      rx={width / 2}
      ry={height / 2}
      fill={color}
      opacity={0.9}
      style={{
        animation: `flicker 1.5s ease-in-out ${delay}s infinite alternate`,
      }}
    />
  )
}

function Spark({
  x,
  y,
  delay,
}: {
  x: number
  y: number
  delay: number
}) {
  return (
    <circle
      cx={x}
      cy={y}
      r={2}
      fill="#fbbf24"
      style={{
        animation: `spark 2s ease-out ${delay}s infinite`,
      }}
    />
  )
}

export function CampfireVisual({ intensity, logCount }: CampfireVisualProps) {
  const config = INTENSITY_CONFIG[intensity]
  const displayLogs = Math.min(logCount, 8)

  return (
    <div className="relative w-full max-w-xs mx-auto">
      <style>{`
        @keyframes flicker {
          0% { transform: scaleY(1) scaleX(1); }
          100% { transform: scaleY(1.1) scaleX(0.95); }
        }
        @keyframes spark {
          0% { opacity: 1; transform: translateY(0); }
          100% { opacity: 0; transform: translateY(-40px); }
        }
        @keyframes smoke {
          0% { opacity: 0.3; transform: translateY(0) scale(1); }
          100% { opacity: 0; transform: translateY(-20px) scale(1.5); }
        }
      `}</style>

      <svg
        viewBox="0 0 200 150"
        className="w-full h-auto"
        role="img"
        aria-label={`Campfire with ${intensity} intensity and approximately ${logCount} logs`}
      >
        {/* Ground */}
        <ellipse cx="100" cy="135" rx="70" ry="10" fill="#78716c" opacity="0.3" />

        {/* Smoke */}
        <circle
          cx="100"
          cy="30"
          r="8"
          fill="#9ca3af"
          opacity="0.2"
          style={{ animation: "smoke 3s ease-out infinite" }}
        />

        {/* Flames */}
        <g>
          {Array.from({ length: config.flameCount }).map((_, i) => {
            const offset = (i - (config.flameCount - 1) / 2) * 12
            const variation = FLAME_VARIATIONS[i % FLAME_VARIATIONS.length]
            const heightVariation = config.flameHeight * variation.heightMult
            return (
              <Flame
                key={`flame-${i}`}
                x={100 + offset}
                height={heightVariation}
                width={config.flameWidth * variation.widthMult}
                color={
                  i % 3 === 0
                    ? config.colors.core
                    : i % 3 === 1
                      ? config.colors.inner
                      : config.colors.outer
                }
                delay={i * 0.1}
              />
            )
          })}
        </g>

        {/* Sparks */}
        <g>
          {Array.from({ length: config.sparkCount }).map((_, i) => {
            const pos = SPARK_POSITIONS[i % SPARK_POSITIONS.length]
            return (
              <Spark
                key={`spark-${i}`}
                x={pos.x}
                y={pos.y}
                delay={i * 0.3}
              />
            )
          })}
        </g>

        {/* Logs */}
        <g>
          {Array.from({ length: displayLogs }).map((_, i) => {
            const pos = LOG_POSITIONS[i % LOG_POSITIONS.length]
            return (
              <rect
                key={`log-${i}`}
                x={pos.x - 12}
                y={pos.y}
                width={24}
                height={6}
                rx={3}
                fill="#78716c"
                transform={`rotate(${pos.rotation} ${pos.x} ${pos.y + 3})`}
              />
            )
          })}
        </g>

        {/* Fire bed */}
        <ellipse cx="100" cy="128" rx="40" ry="6" fill="#44403c" />
      </svg>
    </div>
  )
}
