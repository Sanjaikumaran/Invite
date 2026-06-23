import type { Component } from "@/types/invitation";
import { useEditor } from "@/store/editor.store";
import { constructGradient } from "@/lib/construct-gradient";

type Props = {
  component: Component;
  sectionId: string; // 🔥 REQUIRED FIX
  selectedComponentId?: string | null;
  mode: "edit" | "view";
};

export function ComponentRenderer({
  component,
  sectionId,
  mode,
  selectedComponentId,
}: Props) {
  const updateComponent = useEditor((s) => s.updateComponent);

  const style = component.style || {};

  const baseStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    fontSize: style.fontSize,
    fontWeight: style.fontWeight,
    textAlign: style.textAlign,
    fontStyle: style.fontStyle,
    width: style.width ? `${style.width}px` : "auto",
    padding: style.padding ? `${style.padding}px` : "0",
    height: style.height ? `${style.height}px` : "auto",
    justifyContent: style.justifyContent,
    color: style.color,
    outline: "none",
  };

  // gradient text
  if (component.style?.background) {
    baseStyle.backgroundImage = constructGradient(component.style.background);
    baseStyle.backgroundClip = "text";
    baseStyle.WebkitBackgroundClip = "text";
    baseStyle.WebkitTextFillColor = "transparent";
    baseStyle.color = "transparent";
    baseStyle.backgroundRepeat = "no-repeat";
    baseStyle.backgroundSize = "100%";
  } else {
    baseStyle.backgroundImage = "none";
    baseStyle.WebkitTextFillColor = undefined;
  }

  const handleUpdate = (value: string) => {
    updateComponent(sectionId, component.id, {
      value,
    });
  };

  const isSelected = selectedComponentId === component.id;

  // -------------------------
  // TITLE
  // -------------------------
  if (component.type === "title") {
    return (
      <h1
        style={baseStyle}
        contentEditable={mode === "edit"}
        suppressContentEditableWarning
        className={isSelected ? "ring-2 ring-green-500" : ""}
        onBlur={(e) => handleUpdate(e.currentTarget.textContent || "")}
      >
        {component.value}
      </h1>
    );
  }

  // -------------------------
  // SUBTITLE
  // -------------------------
  if (component.type === "subtitle") {
    return (
      <h2
        style={baseStyle}
        contentEditable={mode === "edit"}
        suppressContentEditableWarning
        className={isSelected ? "ring-2 ring-green-500" : ""}
        onBlur={(e) => handleUpdate(e.currentTarget.textContent || "")}
      >
        {component.value}
      </h2>
    );
  }

  // -------------------------
  // TEXT
  // -------------------------
  if (component.type === "text") {
    return (
      <p
        style={baseStyle}
        contentEditable={mode === "edit"}
        suppressContentEditableWarning
        className={isSelected ? "ring-2 ring-green-500" : ""}
        onBlur={(e) => handleUpdate(e.currentTarget.textContent || "")}
      >
        {component.value}
      </p>
    );
  }

  return null;
}
