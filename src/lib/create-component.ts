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
          color: "#000000",
          level: 1,
        },
      };

    case "subtitle":
      return {
        id,
        type,
        value: "Subtitle",
        style: {
          fontSize: 20,
          fontWeight: 500,
          textAlign: "center",
          color: "#333",
        },
      };

    case "text":
      return {
        id,
        type,
        value: "Your text here...",
        style: {
          fontSize: 16,
          fontWeight: 400,
          textAlign: "left",
          color: "#444",
        },
      };

    default:
      throw new Error("Unsupported type");
  }
}
