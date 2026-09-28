// The /apresentacao record's star doodle. Kept here, out of components/site/, because the
// real site replaced it with the brand symbol (TASK-brand-alignment.md §2.3); the dated
// preview document keeps what was approved.

type StarBurstProps = {
  points?: number;
  size?: number;
  color?: string;
  className?: string;
};

export function StarBurst({ points = 9, size = 32, color = "var(--color-lime)", className }: StarBurstProps) {
  const outerR = size / 2;
  const innerR = outerR * 0.55;
  const coords: string[] = [];
  for (let i = 0; i < points * 2; i++) {
    const r = i % 2 === 0 ? outerR : innerR;
    const angle = (Math.PI * i) / points - Math.PI / 2;
    const x = outerR + r * Math.cos(angle);
    const y = outerR + r * Math.sin(angle);
    coords.push(`${x.toFixed(2)},${y.toFixed(2)}`);
  }
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className={className} aria-hidden="true">
      <polygon points={coords.join(" ")} fill="none" stroke={color} strokeWidth={2} strokeLinejoin="round" />
    </svg>
  );
}
