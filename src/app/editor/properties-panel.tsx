"use client";

import GradientEditor, { Gradient } from "@/components/GradientEditor";
import ImageStorage from "@/components/image-upload";
import { useEditor } from "@/store/editor.store";
import { Section, TextStyle } from "@/types/invitation";
import { useEffect, useRef } from "react";

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

  const ref = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    ref.current.style.height = "0px";
    ref.current.style.height = `${ref.current.scrollHeight}px`;
  }, [component?.value]);

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
      <div className="space-y-5 border-r p-4 overflow-auto h-screen">
        <h2 className="font-semibold">Component Properties</h2>
        {component.type === "list" ? (
          <div>
            <label>Items</label>

            <div className="space-y-2">
              {component.value.map((item, i) => (
                <div key={i} className="flex gap-2">
                  <input
                    className="flex-1 border rounded p-2"
                    value={item}
                    onChange={(e) => {
                      const next = [...component.value];

                      next[i] = e.target.value;

                      updateComponent(sectionId, componentId, {
                        value: next,
                      });
                    }}
                  />

                  <button
                    onClick={() => {
                      updateComponent(sectionId, componentId, {
                        value: component.value.filter((_, idx) => idx !== i),
                      });
                    }}
                  >
                    ×
                  </button>
                </div>
              ))}

              <button
                className=" border rounded p-2 w-full "
                onClick={() =>
                  updateComponent(sectionId, componentId, {
                    value: [...component.value, "New Item"],
                  })
                }
              >
                + Add Item
              </button>
            </div>
          </div>
        ) : (
          <div>
            <label className="block text-sm">Text</label>

            <textarea
              ref={ref}
              rows={1}
              value={component.value}
              className="w-full resize-none overflow-hidden rounded border p-2 outline-none max-h-[300px]"
              onInput={(e) => {
                e.currentTarget.style.height = "0px";

                e.currentTarget.style.height = `${e.currentTarget.scrollHeight}px`;
              }}
              onChange={(e) =>
                updateComponent(sectionId, componentId, {
                  value: e.target.value,
                })
              }
            />
          </div>
        )}

        {/* STYLE */}

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label>Font Size</label>

            <input
              type="number"
              className="w-full border rounded p-2"
              value={component.style?.fontSize ?? 16}
              onChange={(e) =>
                updateComponent(sectionId, componentId, {
                  style: {
                    ...component.style,

                    fontSize: Number(e.target.value),
                  },
                })
              }
            />
          </div>

          <div>
            <label>Weight</label>

            <input
              type="number"
              min={100}
              max={900}
              step={100}
              className="w-full border rounded p-2"
              value={component.style?.fontWeight ?? 400}
              onChange={(e) =>
                updateComponent(sectionId, componentId, {
                  style: {
                    ...component.style,

                    fontWeight: Number(e.target.value),
                  },
                })
              }
            />
          </div>

          <div>
            <label>Width</label>

            <input
              type="number"
              className="w-full border rounded p-2"
              value={component.style?.width ?? 0}
              onChange={(e) =>
                updateComponent(sectionId, componentId, {
                  style: {
                    ...component.style,

                    width: Number(e.target.value),
                  },
                })
              }
            />
          </div>

          <div>
            <label>Height</label>

            <input
              type="number"
              className="w-full border rounded p-2"
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

          <div>
            <label>Padding</label>

            <input
              type="number"
              className="w-full border rounded p-2"
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

          <div>
            <label>Margin</label>

            <input
              type="number"
              className="w-full border rounded p-2"
              value={component.style?.margin ?? 0}
              onChange={(e) =>
                updateComponent(sectionId, componentId, {
                  style: {
                    ...component.style,

                    margin: Number(e.target.value),
                  },
                })
              }
            />
          </div>

          <div>
            <label> Align</label>
            <select
              className="w-full border rounded p-2"
              value={component.style?.textAlign ?? "left"}
              onChange={(e) =>
                updateComponent(sectionId, componentId, {
                  style: {
                    ...component.style,

                    textAlign: e.target.value as TextStyle["textAlign"],
                  },
                })
              }
            >
              <option>left</option>

              <option>center</option>

              <option>right</option>
            </select>
          </div>
          {component.type === "button" && (
            <>
              <div className="flex flex-col">
                <label>Action</label>

                <select
                  className="w-full border rounded p-2"
                  value={component.action?.type}
                  onChange={(e) =>
                    updateComponent(sectionId, componentId, {
                      action: {
                        ...component.action,

                        type: e.target.value as "none" | "navigate",
                      },
                    })
                  }
                >
                  <option value="none">None</option>

                  <option value="navigate">Navigate</option>
                </select>
              </div>

              {component.action?.type === "navigate" && (
                <div className="flex flex-col">
                  <label>URL</label>
                  <input
                    placeholder="URL"
                    className="w-full border rounded p-2"
                    value={component.action?.url}
                    onChange={(e) =>
                      updateComponent(sectionId, componentId, {
                        action: {
                          ...component.action,
                          type: "navigate",

                          url: e.target.value,
                        },
                      })
                    }
                  />

                  <label className="text-sm block">
                    <input
                      type="checkbox"
                      checked={component.action?.newTab}
                      onChange={(e) =>
                        updateComponent(sectionId, componentId, {
                          action: {
                            ...component.action,
                            type: "navigate",

                            newTab: e.target.checked,
                          },
                        })
                      }
                    />
                    Open New Tab
                  </label>
                </div>
              )}
            </>
          )}
          <div>
            <label>Radius</label>

            <input
              type="number"
              className="w-full border rounded p-2"
              value={component.style?.borderRadius ?? 0}
              onChange={(e) =>
                updateComponent(sectionId, componentId, {
                  style: {
                    ...component.style,

                    borderRadius: Number(e.target.value),
                  },
                })
              }
            />
          </div>

          <div>
            <label>Opacity</label>

            <input
              type="range"
              min={0}
              max={1}
              step={0.1}
              value={component.style?.opacity ?? 1}
              onChange={(e) =>
                updateComponent(sectionId, componentId, {
                  style: {
                    ...component.style,

                    opacity: Number(e.target.value),
                  },
                })
              }
            />
          </div>
        </div>

        {/* ALIGN */}

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
            value={
              component.style?.background ?? {
                type: "linear",

                angle: 90,

                stops: [
                  {
                    id: crypto.randomUUID(),

                    color: "#3B82F6",

                    position: 0,
                  },
                  {
                    id: crypto.randomUUID(),

                    color: "#9333EA",

                    position: 100,
                  },
                ],
              }
            }
            onChange={(gradient) =>
              updateComponent(sectionId, componentId, {
                style: {
                  ...component.style,

                  background: gradient,
                },
              })
            }
          />
        ) : (
          <div className="space-y-3">
            <div className="flex gap-3">
              <label>Text Color:</label>

              <input
                type="color"
                value={component.style?.color ?? "#000000"}
                onChange={(e) =>
                  updateComponent(sectionId, componentId, {
                    style: {
                      ...component.style,

                      color: e.target.value,

                      background: undefined,
                    },
                  })
                }
              />
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-4 border-r p-4 overflow-auto h-screen">
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
            if (e.target.value === "image") {
              background = {
                type: "image",
                value: {
                  url: "",
                  position: "center",
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
          <option value="image">Image</option>
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
      ) : section.layout.background?.type === "color" ? (
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
      ) : (
        <ImageStorage
          imageData={section.layout.background?.value?.url}
          onChange={(url) =>
            updateSection(sectionId, {
              layout: {
                ...section.layout,
                background: {
                  type: "image",
                  value: {
                    url,
                    position: "center",
                    // repeat: "no-repeat",
                    size: "contain",
                    width: "100%",
                    height: "auto",
                  },
                },
              },
            })
          }
        />
      )}
    </div>
  );
}
