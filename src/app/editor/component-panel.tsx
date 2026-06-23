"use client";

import { useParams } from "next/navigation";
import { createComponent } from "@/lib/create-component";
import { useEditor } from "@/store/editor.store";
import { Component, COMPONENT_REGISTRY } from "@/types/invitation";

type ComponentPanelProps = {
  sectionId: string | null;
  parentId?: string | null;
  handleAddSection: () => void;
};

export function ComponentPanel({
  sectionId,
  parentId = null,
  handleAddSection,
}: ComponentPanelProps) {
  const id = useParams().id as string;
  const addComponent = useEditor((s) => s.addComponent);
  const invitation = useEditor((s) => s.invitation);

  const componentsType = invitation.sections
    .find((s) => s.id === sectionId)
    ?.components.map((c) => c.type);

  const handleAdd = (type: Component["type"]) => {
    const newComponent = createComponent(type);
    addComponent(sectionId!, parentId, newComponent);
  };

  const handleSavePage = () => {
    localStorage.setItem(id, JSON.stringify(invitation));
  };
  return (
    <aside className="border-r p-4 space-y-3">
      <h2 className="font-semibold text-sm">Components</h2>
      {sectionId ? (
        <div>
          <h3 className="font-semibold text-sm mb-3">Add Components</h3>

          <div className="space-y-2">
            {Object.entries(COMPONENT_REGISTRY)
              .filter(
                ([type]) =>
                  !componentsType?.includes(type as Component["type"]),
              )
              .map(([type, meta]) => (
                <button
                  key={type}
                  onClick={() => handleAdd(type as Component["type"])}
                  className="w-full text-left px-3 py-2 border rounded hover:bg-gray-100"
                >
                  {meta.label}
                </button>
              ))}
          </div>
        </div>
      ) : (
        <div className="text-sm text-gray-500">
          Select a section to add components
        </div>
      )}
      <button
        onClick={handleAddSection}
        className="w-full mt-4 px-3 py-2 bg-black text-white rounded"
      >
        + Add Section
      </button>
      <button
        onClick={handleSavePage}
        className="w-full mt-4 px-3 py-2 bg-blue-500 text-white rounded"
      >
        Save Page
      </button>
    </aside>
  );
}
