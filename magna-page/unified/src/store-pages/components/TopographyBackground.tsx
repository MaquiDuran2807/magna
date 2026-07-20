import './styles/topographyBackground.css'

export function TopographyBackground() {
  return (
    <div className="topography-bg" aria-hidden="true">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="100%"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        className="topography-svg"
      >
        {[...Array(12)].map((_, i) => {
          const baseY = 60 + i * 72
          const waveAmp = 20 + Math.sin(i * 1.5) * 15
          const freq = 0.003 + i * 0.0004
          const xOffset = i * 37
          const label = (900 - baseY).toString()
          return (
            <path
              key={i}
              className="contour-line"
              style={{ animationDelay: `${i * 0.4}s` }}
              d={generateContour(0, 1440, baseY, waveAmp, freq, xOffset)}
            />
          )
        })}
      </svg>
    </div>
  )
}

function generateContour(
  x1: number,
  x2: number,
  baseY: number,
  amp: number,
  freq: number,
  phase: number
): string {
  const steps = 40
  const stepSize = (x2 - x1) / steps
  let d = `M ${x1} ${baseY}`
  for (let i = 0; i <= steps; i++) {
    const x = x1 + i * stepSize
    const y = baseY + Math.sin(x * freq + phase) * amp + Math.sin(x * freq * 2.5 + phase * 1.7) * amp * 0.4
    d += ` L ${x} ${y}`
  }
  return d
}
