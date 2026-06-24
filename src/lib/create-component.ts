import { Component } from "@/types/invitation";

export function createComponent(type: Component["type"]): Component {
  const id = crypto.randomUUID();

  switch (type) {
    case "title":
      return {
        id,
        type,
        value: "New Title",
        style: {
          fontSize: 32,
          fontWeight: 700,
          textAlign: "center",
          color: "#000",
          level: 1,
        },
      };

    case "subtitle":
      return {
        id,
        type,
        value: "Subtitle",
        style: {
          fontSize: 22,
          fontWeight: 500,
          textAlign: "center",
          color: "#334155",
        },
      };

    case "text":
      return {
        id,
        type,
        value: "Your text here...",
        style: {
          fontSize: 16,
          color: "#475569",
        },
      };

    case "badge":
      return {
        id,
        type,
        value: "New badge",
        style: {
          fontSize: 14,
          fontWeight: 700,
          color: "#2563EB",
          padding: 8,
        },
      };

    case "stat":
      return {
        id,
        type,
        value: "New stat",
        style: {
          fontSize: 42,
          fontWeight: 800,
          textAlign: "center",
          color: "#0F172A",
        },
      };

    case "button":
      return {
        id,
        type,
        value: "Register Now",
        action: {
          type: "navigate",
          url: "/",
          newTab: false,
        },
        style: {
          fontSize: 16,
          fontWeight: 600,
          padding: 16,
          color: "#ffffff",
        },
      };

    case "list":
      return {
        id,
        type,
        value: ["First Item", "Second Item"],
        style: {
          fontSize: 18,
          bullet: "disc",
        },
      };
    default:
      throw new Error("Unsupported type");
  }
}
