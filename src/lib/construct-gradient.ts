import { Gradient } from "@/components/GradientEditor";

export function constructGradient(gradient: Gradient) {
  const stops = [...gradient.stops]
    .sort((a, b) => a.position - b.position)
    .map((s) => `${s.color} ${s.position}%`)
    .join(", ");

  if (gradient.type === "linear") {
    return `linear-gradient(${gradient.angle}deg, ${stops})`;
  }

  if (gradient.type === "radial") {
    const x = gradient.radial?.x ?? 50;
    const y = gradient.radial?.y ?? 50;

    return `radial-gradient(circle at ${x}% ${y}%, ${stops})`;
  }

  return `conic-gradient(from ${gradient.angle ?? 0}deg, ${stops})`;
}
