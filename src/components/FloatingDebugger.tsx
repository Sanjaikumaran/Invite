"use client";

import { useEditor } from "@/store/editor.store";
import { useEffect, useRef, useState } from "react";

type Pos = { x: number; y: number };
type Size = { width: number; height: number };

const LS_KEY = "floating-debugger-state";

export function FloatingDebugger() {
  const data = useEditor((s) => s.invitation);

  const panelRef = useRef<HTMLDivElement | null>(null);
  const dragRef = useRef(false);
  const offset = useRef({ x: 0, y: 0 });

  const [open, setOpen] = useState(false);
  const [pos, setPos] = useState<Pos>({ x: 20, y: 20 });
  const [size, setSize] = useState<Size>({ width: 360, height: 300 });

  // load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem(LS_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed.open !== undefined) setOpen(parsed.open);
      if (parsed.pos) setPos(parsed.pos);
      if (parsed.size) setSize(parsed.size);
    }
  }, []);

  // persist
  useEffect(() => {
    localStorage.setItem(LS_KEY, JSON.stringify({ open, pos, size }));
  }, [open, pos, size]);

  // drag handlers
  const onMouseDown = (e: React.MouseEvent) => {
    dragRef.current = true;
    offset.current = {
      x: e.clientX - pos.x,
      y: e.clientY - pos.y,
    };
  };

  const onMouseMove = (e: MouseEvent) => {
    if (!dragRef.current) return;
    setPos({
      x: e.clientX - offset.current.x,
      y: e.clientY - offset.current.y,
    });
  };

  const onMouseUp = () => {
    dragRef.current = false;
  };

  useEffect(() => {
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, []);

  return (
    <>
      {/* Floating toggle button */}
      <button
        onClick={() => setOpen((v) => !v)}
        style={{
          position: "fixed",
          bottom: 20,
          right: 20,
          zIndex: 9999,
          padding: "10px 14px",
          borderRadius: 8,
          background: "#111",
          color: "#fff",
        }}
      >
        Debug
      </button>

      {open && (
        <div
          ref={panelRef}
          style={{
            position: "fixed",
            top: pos.y,
            left: pos.x,
            width: size.width,
            height: size.height,
            zIndex: 10000,
            background: "#0f0f0f",
            color: "#0f0",
            border: "1px solid #333",
            borderRadius: 8,
            overflow: "auto",
            resize: "both",
          }}
          onMouseUp={() => {
            if (panelRef.current) {
              setSize({
                width: panelRef.current.offsetWidth,
                height: panelRef.current.offsetHeight,
              });
            }
          }}
        >
          {/* header (drag handle) */}
          <div
            onMouseDown={onMouseDown}
            style={{
              padding: "6px 10px",
              cursor: "move",
              background: "#1a1a1a",
              borderBottom: "1px solid #333",
              fontSize: 12,
              userSelect: "none",
            }}
          >
            Debugger
          </div>

          {/* content */}
          <pre
            style={{
              margin: 0,
              padding: 10,
              fontSize: 12,
              whiteSpace: "pre-wrap",
              wordBreak: "break-word",
            }}
          >
            {JSON.stringify(data, null, 2)}
          </pre>
        </div>
      )}
    </>
  );
}
