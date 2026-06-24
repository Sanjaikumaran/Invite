import type { Component } from "@/types/invitation";

import { useEditor } from "@/store/editor.store";

import { constructGradient } from "@/lib/construct-gradient";

type Props = {
  component: Component;
  sectionId: string;
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
  const editable = mode === "edit";
  const isSelected = selectedComponentId === component.id;
  const baseStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    width: style.width ? `${style.width}px` : "100%",
    height: style.height ? `${style.height}px` : "auto",
    minWidth: style.minWidth,
    minHeight: style.minHeight,
    padding: style.padding,
    margin: style.margin,
    gap: style.gap,
    color: style.color,
    fontSize: style.fontSize,
    fontWeight: style.fontWeight,
    fontFamily: style.fontFamily,
    lineHeight: style.lineHeight,
    letterSpacing: style.letterSpacing,
    textAlign: style.textAlign,
    textTransform: style.textTransform,
    textDecoration: style.textDecoration,
    fontStyle: style.fontStyle,
    justifyContent: style.justifyContent,
    alignItems: style.alignItems,
    backgroundColor: style.backgroundColor,
    borderRadius: style.borderRadius,
    borderWidth: style.borderWidth,
    borderColor: style.borderColor,
    boxShadow: style.shadow,
    opacity: style.opacity,
    outline: "none",
    whiteSpace: "pre-wrap",
  };

  if (component.style?.background) {
    baseStyle.backgroundImage = constructGradient(component.style.background);
    baseStyle.backgroundClip = "text";
    baseStyle.WebkitBackgroundClip = "text";
    baseStyle.WebkitTextFillColor = "transparent";
  }

  const update = (value: string) => {
    updateComponent(sectionId, component.id, {
      value,
    });
  };

  const common = {
    style: baseStyle,
    contentEditable: editable,
    suppressContentEditableWarning: true,
    className: isSelected ? "ring-2 ring-green-500 " : "",
    onBlur: (e: any) => update(e.currentTarget.innerText || ""),
  };

  switch (component.type) {
    case "title":
      return <h1 {...common}>{component.value}</h1>;

    case "subtitle":
      return <h2 {...common}>{component.value}</h2>;

    case "text":
      return <p {...common}>{component.value}</p>;

    case "badge":
      return (
        <span
          {...common}
          style={{
            ...baseStyle,
          }}
        >
          {component.value}
        </span>
      );

    case "stat":
      return <div {...common}>{component.value}</div>;

    case "button":
      return (
        <button
          style={{
            ...baseStyle,

            borderRadius: style.borderRadius ?? 12,

            cursor: "pointer",
          }}
          onClick={() => {
            if (
              mode === "view" &&
              component.action?.type === "navigate" &&
              component.action?.url
            ) {
              if (component.action?.newTab) {
                window.open(component.action.url, "_blank");
              } else {
                location.href = component.action.url;
              }
            }
          }}
        >
          {component.value}
        </button>
      );

    case "list":
      return (
        <ul
          style={{
            ...baseStyle,

            listStyle: component.style?.bullet,
          }}
        >
          {component.value.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      );

    default:
      return null;
  }
}
