"use client";

import { useMemo } from "react";

export type Gradient = {
  type: "linear" | "radial" | "conic";
  angle: number;
  stops: {
    id: string;
    color: string;
    position: number; // 0 - 100
  }[];
  radial?: {
    shape: "circle" | "ellipse";
    x: number;
    y: number;
  };
};

type Props = {
  value: Gradient;
  onChange: (value: Gradient) => void;
};

export default function GradientEditor({ value, onChange }: Props) {
  // ----------------------------
  // UPDATE STOP
  // ----------------------------
  const updateStop = (id: string, patch: Partial<Gradient["stops"][0]>) => {
    const stops = value.stops.map((s) =>
      s.id === id ? { ...s, ...patch } : s,
    );

    onChange({ ...value, stops });
  };

  // ----------------------------
  // ADD STOP
  // ----------------------------
  const addStop = () => {
    onChange({
      ...value,
      stops: [
        ...value.stops,
        {
          id: crypto.randomUUID(),
          color: "#ffffff",
          position: 50,
        },
      ],
    });
  };

  // ----------------------------
  // REMOVE STOP
  // ----------------------------
  const removeStop = (id: string) => {
    onChange({
      ...value,
      stops: value.stops.filter((s) => s.id !== id),
    });
  };

  // ----------------------------
  // BUILD CSS GRADIENT
  // ----------------------------
  const css = useMemo(() => {
    const stops = [...value.stops]
      .sort((a, b) => a.position - b.position)
      .map((s) => `${s.color} ${s.position}%`)
      .join(", ");

    if (value.type === "linear") {
      return `linear-gradient(${value.angle}deg, ${stops})`;
    }

    if (value.type === "radial") {
      const x = value.radial?.x ?? 50;
      const y = value.radial?.y ?? 50;

      return `radial-gradient(circle at ${x}% ${y}%, ${stops})`;
    }

    return `conic-gradient(from ${value.angle ?? 0}deg, ${stops})`;
  }, [value]);

  // ----------------------------
  // UI
  // ----------------------------
  return (
    <div className="space-y-4 border p-3 rounded">
      {/* PREVIEW */}
      <div style={{ background: css }} className="h-24 w-full rounded border" />

      {/* TYPE */}
      <div>
        <label className="text-sm block mb-1">Type</label>
        <select
          value={value.type}
          className="w-full border p-2 rounded"
          onChange={(e) =>
            onChange({
              ...value,
              type: e.target.value as Gradient["type"],
            })
          }
        >
          <option value="linear">Linear</option>
          <option value="radial">Radial</option>
          <option value="conic">Conic</option>
        </select>
      </div>

      {/* ANGLE */}
      {value.type !== "radial" && (
        <div>
          <label className="text-sm block mb-1">Angle ({value.angle}°)</label>

          <input
            type="range"
            min={0}
            max={360}
            value={value.angle}
            onChange={(e) =>
              onChange({
                ...value,
                angle: Number(e.target.value),
              })
            }
            className="w-full"
          />
        </div>
      )}

      {/* RADIAL CONTROLS */}
      {value.type === "radial" && (
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <label className="text-sm">Center X</label>
            <input
              type="range"
              min={0}
              max={100}
              value={value.radial?.x ?? 50}
              onChange={(e) =>
                onChange({
                  ...value,
                  radial: {
                    shape: "circle",
                    x: Number(e.target.value),
                    y: value.radial?.y ?? 50,
                  },
                })
              }
            />
          </div>

          <div className="flex items-center gap-2">
            <label className="text-sm">Center Y</label>
            <input
              type="range"
              min={0}
              max={100}
              value={value.radial?.y ?? 50}
              onChange={(e) =>
                onChange({
                  ...value,
                  radial: {
                    shape: "circle",
                    x: value.radial?.x ?? 50,
                    y: Number(e.target.value),
                  },
                })
              }
            />
          </div>
        </div>
      )}

      {/* STOPS */}
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <label className="text-sm">Color Stops</label>

          <button
            onClick={addStop}
            className="text-xs px-2 py-1 border rounded"
          >
            + Add
          </button>
        </div>

        {value.stops.map((stop) => (
          <div key={stop.id} className="flex items-center gap-2">
            {/* COLOR */}
            <input
              type="color"
              value={stop.color}
              onChange={(e) => updateStop(stop.id, { color: e.target.value })}
            />

            {/* POSITION */}
            <input
              type="range"
              min={0}
              max={100}
              value={stop.position}
              onChange={(e) =>
                updateStop(stop.id, {
                  position: Number(e.target.value),
                })
              }
              className="flex-1"
            />

            <span className="text-xs w-10">{stop.position}%</span>

            {/* DELETE */}
            <button
              onClick={() => removeStop(stop.id)}
              className="text-xs text-red-500"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
