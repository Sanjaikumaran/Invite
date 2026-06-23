"use client";

import GradientEditor, { Gradient } from "@/components/GradientEditor";
import { useEditor } from "@/store/editor.store";
import { Section, TextStyle } from "@/types/invitation";

type Props = {
  sectionId: string | null;
  componentId: string | null;
};

export function PropertiesPanel({ sectionId, componentId }: Props) {
  const invitation = useEditor((s) => s.invitation);
  const updateSection = useEditor((s) => s.updateSection);
  const updateComponent = useEditor((s) => s.updateComponent);

  const section = invitation.sections.find((s) => s.id === sectionId);

  const component = section?.components.find((c) => c.id === componentId);

  if (!sectionId || !section) {
    return (
      <div className="space-y-4 border-r p-4">
        <h2 className="font-semibold">Properties</h2>

        <div className="text-gray-500">Select section or component</div>
      </div>
    );
  }

  if (component && componentId) {
    return (
      <div className="space-y-4 border-r p-4">
        <h2 className="font-semibold">Component Properties</h2>

        {/* TEXT VALUE */}

        <div>
          <label className="text-sm block">Text</label>

          <input
            className="w-full border p-2 rounded"
            value={component.value}
            onChange={(e) =>
              updateComponent(sectionId, component.id, {
                value: e.target.value,
              })
            }
          />
        </div>

        {/* STYLE CONTROLS */}
        <>
          {/* FONT SIZE */}
          <div>
            <label className="text-sm block">Font Size</label>

            <input
              type="number"
              min={10}
              max={100}
              className="w-full border p-2 rounded"
              value={component.style?.fontSize ?? 16}
              onChange={(e) =>
                updateComponent(sectionId, component.id, {
                  style: {
                    ...component.style,
                    fontSize: Number(e.target.value),
                  },
                })
              }
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            {/* WIDTH */}
            <div>
              <label className="text-sm block">Width</label>

              <input
                type="number"
                min={0}
                className="w-full border p-2 rounded"
                value={component.style?.width ?? 0}
                onChange={(e) =>
                  updateComponent(sectionId, component.id, {
                    style: {
                      ...component.style,
                      width: Number(e.target.value),
                    },
                  })
                }
              />
            </div>

            {/* HEIGHT */}
            <div>
              <label className="text-sm block ">Height</label>

              <input
                type="number"
                min={0}
                className="w-full border p-2 rounded"
                value={component.style?.height ?? 0}
                onChange={(e) =>
                  updateComponent(sectionId, componentId, {
                    style: {
                      ...component.style,
                      height: Number(e.target.value),
                    },
                  })
                }
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {/* ALIGN */}
            <div>
              <label className="text-sm block">Align</label>

              <select
                value={component.style?.textAlign ?? "left"}
                onChange={(e) =>
                  updateComponent(sectionId, component.id, {
                    style: {
                      ...component.style,
                      textAlign: e.target.value as TextStyle["textAlign"],
                    },
                  })
                }
                className="w-full border p-2 rounded capitalize"
              >
                <option value="left">left</option>
                <option value="center">center</option>
                <option value="right">right</option>
              </select>
            </div>

            {/* VERTICAL ALIGN */}
            <div>
              <label className="text-sm block ">Vertical Align</label>

              <select
                value={component.style?.justifyContent ?? "start"}
                className="w-full border p-2 rounded capitalize"
                onChange={(e) =>
                  updateComponent(sectionId, componentId, {
                    style: {
                      ...component.style,
                      justifyContent: e.target
                        .value as TextStyle["justifyContent"],
                    },
                  })
                }
              >
                <option value="start">start</option>
                <option value="center">center</option>
                <option value="end">end</option>
              </select>
            </div>
          </div>

          {/* PADDING */}
          <div>
            <label className="text-sm block ">Padding</label>

            <input
              type="number"
              min={0}
              className="w-full border p-2 rounded"
              max={200}
              value={component.style?.padding ?? 0}
              onChange={(e) =>
                updateComponent(sectionId, componentId, {
                  style: {
                    ...component.style,
                    padding: Number(e.target.value),
                  },
                })
              }
            />
          </div>

          {/* BACKGROUND TYPE */}
          <div>
            <label className="text-sm block">Background</label>

            <select
              value={component.style?.color ? "color" : "gradient"}
              className="w-full border p-2 rounded capitalize"
              onChange={(e) => {
                let background: Gradient | undefined = undefined;
                let color: string | undefined = undefined;

                if (e.target.value === "color") {
                  background = undefined;
                  color = e.target.value;
                }

                if (e.target.value === "gradient") {
                  color = undefined;
                  background = {
                    type: "linear",
                    angle: 0,
                    stops: [
                      {
                        id: crypto.randomUUID(),
                        color: "#ffffff",
                        position: 50,
                      },
                    ],
                  };
                }
                console.log(background, color);
                updateComponent(sectionId, component.id, {
                  style: {
                    ...component.style,
                    background,
                    color,
                  },
                });
              }}
            >
              <option value="color">color</option>
              <option value="gradient">gradient</option>
            </select>
          </div>

          {/* GRADIENT EDITOR */}
          {component.style?.background ? (
            <GradientEditor
              value={component.style.background}
              onChange={(gradient) =>
                updateComponent(sectionId, component.id, {
                  style: {
                    ...component.style,
                    background: gradient,
                    color: undefined,
                  },
                })
              }
            />
          ) : (
            <input
              type="color"
              value={component.style?.color || "#ffffff"}
              onChange={(e) =>
                updateComponent(sectionId, component.id, {
                  style: {
                    ...component.style,
                    color: e.target.value,
                    background: undefined,
                  },
                })
              }
            />
          )}
        </>
      </div>
    );
  }

  return (
    <div className="space-y-4 border-r p-4">
      <h2 className="font-semibold">Section Properties</h2>

      {/* TYPE */}
      <div>
        <label className="text-sm block ">Type</label>
        <select
          value={section.type}
          className="w-full border p-2 rounded"
          onChange={(e) =>
            updateSection(sectionId, {
              type: e.target.value as typeof section.type,
            })
          }
        >
          <option value="hero">hero</option>
          <option value="section">section</option>
          <option value="gallery">gallery</option>
          <option value="schedule">schedule</option>
          <option value="map">map</option>
          <option value="rsvp">rsvp</option>
          <option value="custom">custom</option>
        </select>
      </div>

      <div className="grid grid-cols-2 gap-2">
        {/* HORIZONTAL ALIGN */}
        <div>
          <label className="text-sm block ">Horizontal Align</label>
          <select
            value={section.layout.align}
            className="w-full border p-2 rounded capitalize"
            onChange={(e) =>
              updateSection(sectionId, {
                layout: {
                  ...section.layout,
                  align: e.target.value as typeof section.layout.align,
                },
              })
            }
          >
            <option value="start">start</option>
            <option value="center">center</option>
            <option value="end">end</option>
          </select>
        </div>

        {/* VERTICAL ALIGN */}
        <div>
          <label className="text-sm block ">Vertical Align</label>

          <select
            value={section.layout.justifyContent}
            className="w-full border p-2 rounded capitalize"
            onChange={(e) =>
              updateSection(sectionId, {
                layout: {
                  ...section.layout,
                  justifyContent: e.target
                    .value as typeof section.layout.justifyContent,
                },
              })
            }
          >
            <option value="start">start</option>
            <option value="center">center</option>
            <option value="end">end</option>
          </select>
        </div>
      </div>
      {/* PADDING */}
      <div>
        <label className="text-sm block ">Padding</label>

        <input
          type="number"
          min={0}
          className="w-full border p-2 rounded"
          max={200}
          value={section.layout.padding}
          onChange={(e) =>
            updateSection(sectionId, {
              layout: {
                ...section.layout,
                padding: Number(e.target.value),
              },
            })
          }
        />
      </div>

      {/* HEIGHT */}
      <div>
        <label className="text-sm block ">Height</label>

        <input
          type="number"
          min={0}
          className="w-full border p-2 rounded"
          value={section.layout.height}
          onChange={(e) =>
            updateSection(sectionId, {
              layout: {
                ...section.layout,
                height: Number(e.target.value),
              },
            })
          }
        />
      </div>

      {/* BACKGROUND */}
      <div>
        <label className="text-sm block ">Background</label>

        <select
          value={section.layout.background?.type ?? "color"}
          className="w-full border p-2 rounded capitalize"
          onChange={(e) => {
            let background: Section["layout"]["background"] = {
              type: "color",
              value: "#ffffff",
            };
            if (e.target.value === "gradient") {
              background = {
                type: "gradient",
                value: {
                  type: "linear",
                  angle: 0,
                  stops: [
                    {
                      id: crypto.randomUUID(),
                      color: "#ffffff",
                      position: 50,
                    },
                  ],
                },
              };
            }
            updateSection(sectionId, {
              layout: {
                ...section.layout,
                background,
              },
            });
          }}
        >
          <option value="color">color</option>

          <option value="gradient">gradient</option>
        </select>
      </div>
      {section.layout.background?.type === "gradient" ? (
        <GradientEditor
          value={section.layout.background.value}
          onChange={(gradient) =>
            updateSection(sectionId, {
              layout: {
                ...section.layout,
                background: {
                  type: "gradient",
                  value: gradient,
                },
              },
            })
          }
        />
      ) : (
        <div className="grid grid-cols-2 gap-2">
          <label className="text-sm block">Pick a color:</label>
          <input
            type="color"
            value={section.layout.background?.value ?? "#ffffff"}
            onChange={(e) =>
              updateSection(sectionId, {
                layout: {
                  ...section.layout,
                  background: {
                    type: "color",
                    value: e.target.value,
                  },
                },
              })
            }
          />
        </div>
      )}
    </div>
  );
}
