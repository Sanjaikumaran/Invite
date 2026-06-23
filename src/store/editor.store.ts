import { create } from "zustand";
import type { Component, Invitation, Section } from "@/types/invitation";

type Store = {
  invitation: Invitation;

  setInvitation: (data: Invitation) => void;

  addComponent: (
    sectionId: string,
    parentId: string | null,
    component: Component,
  ) => void;

  updateComponent: (
    sectionId: string,
    componentId: string,
    patch: Partial<Component>,
  ) => void;

  removeComponent: (sectionId: string, componentId: string) => void;

  addSection: (section: Section) => void;
  updateSection: (id: string, section: Partial<Section>) => void;
  removeSection: (id: string) => void;
};

export const useEditor = create<Store>((set) => ({
  invitation: {
    id: "",
    slug: "",
    title: "",
    status: "draft",
    sections: [],
    createdAt: "",
    updatedAt: "",
  },

  setInvitation: (data) =>
    set(() => ({
      invitation: data,
    })),

  addComponent: (sectionId, _parentId, component) =>
    set((state) => ({
      invitation: {
        ...state.invitation,
        sections: state.invitation.sections.map((section) =>
          section.id === sectionId
            ? {
                ...section,
                components: [...section.components, component],
              }
            : section,
        ),
      },
    })),

  updateComponent: (sectionId, componentId, patch) =>
    set((state) => ({
      invitation: {
        ...state.invitation,
        sections: state.invitation.sections.map((section) => {
          if (section.id !== sectionId) return section;

          return {
            ...section,
            components: section.components.map((c) =>
              c.id === componentId ? { ...c, ...patch } : c,
            ),
          };
        }),
      },
    })),

  removeComponent: (sectionId, componentId) =>
    set((state) => ({
      invitation: {
        ...state.invitation,
        sections: state.invitation.sections.map((section) =>
          section.id === sectionId
            ? {
                ...section,
                components: section.components.filter(
                  (c) => c.id !== componentId,
                ),
              }
            : section,
        ),
      },
    })),

  addSection: (section) =>
    set((state) => ({
      invitation: {
        ...state.invitation,
        sections: [...state.invitation.sections, section],
      },
    })),

  updateSection: (id, patch) =>
    set((state) => ({
      invitation: {
        ...state.invitation,
        sections: state.invitation.sections.map((s) =>
          s.id === id ? { ...s, ...patch } : s,
        ),
      },
    })),

  removeSection: (id) =>
    set((state) => ({
      invitation: {
        ...state.invitation,
        sections: state.invitation.sections.filter((s) => s.id !== id),
      },
    })),
}));
