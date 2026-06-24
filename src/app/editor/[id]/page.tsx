"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import { useEditor } from "@/store/editor.store";
import { Section } from "@/types/invitation";

import { PropertiesPanel } from "../properties-panel";
import { ComponentPanel } from "../component-panel";
import { SectionRenderer } from "@/components/renderer/section-renderer";

export default function EditorPage() {
  const id = useParams().id as string;
  const invitation = useEditor((state) => state.invitation);
  const setInvitation = useEditor((state) => state.setInvitation);
  const addSection = useEditor((state) => state.addSection);

  const [selectedSection, setSelectedSection] = useState<string | null>(null);
  const [selectedComponent, setSelectedComponent] = useState<string | null>(
    null,
  );

  useEffect(() => {
    if (!invitation.id) {
      try {
        const invitation = JSON.parse(localStorage.getItem(id) || "");
        console.log(invitation);
        setInvitation(invitation);
      } catch (error) {
        console.log(error);
      }
    }
  }, []);

  if (!invitation) {
    return (
      <div className="h-screen flex items-center justify-center">
        No invitation loaded
      </div>
    );
  }

  const handleAddSection = () => {
    const section: Section = {
      id: crypto.randomUUID(),
      type: "section",
      layout: {
        align: "start",
        width: "md",
        padding: 60,
        background: {
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
        },
        height: 0,
        justifyContent: "center",
      },
      components: [
        {
          id: crypto.randomUUID(),
          type: "title",
          value: "New Section Title",
          style: {
            fontSize: 32,
            fontWeight: 700,
            textAlign: "center",
            color: "#000",
          },
        },
        {
          id: crypto.randomUUID(),
          type: "subtitle",
          value: "New subtitle",
          style: {
            fontSize: 28,
            fontWeight: 500,
            textAlign: "center",
            color: "#000",
          },
        },
        {
          id: crypto.randomUUID(),
          type: "text",
          value: "New text",
          style: {
            fontSize: 16,
            fontWeight: 400,
            textAlign: "center",
            color: "#000",
          },
        },
      ],
    };

    addSection(section);
    setSelectedSection(section.id);
  };
  const SCALE = 0.7;

  return (
    <main className="grid h-screen grid-cols-[280px_320px_1fr]">
      {/* LEFT */}
      <ComponentPanel
        sectionId={selectedSection}
        handleAddSection={handleAddSection}
      />
      {/* MIDDLE */}
      <PropertiesPanel
        sectionId={selectedSection}
        componentId={selectedComponent}
      />

      {/* RIGHT */}
      <section className="overflow-auto bg-gray-100">
        <div className="flex justify-center p-5">
          <div
            style={{
              zoom: 0.7,
              width: "100%",
              maxWidth: "1600px",
            }}
            className="origin-top"
          >
            {invitation.sections.map((section) => (
              <SectionRenderer
                key={section.id}
                section={section}
                mode={"edit"}
                isSelected={selectedSection === section.id}
                selectedComponentId={selectedComponent}
                onSelectSection={(id) => {
                  setSelectedSection(id);
                  setSelectedComponent(null);
                }}
                onSelectComponent={(id) => setSelectedComponent(id)}
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
