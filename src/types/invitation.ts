import { Gradient } from "@/components/GradientEditor";

export type Invitation = {
  id: string;

  slug: string;

  title: string;

  status: "draft" | "published";

  sections: Section[];

  createdAt: string;

  updatedAt: string;
};

export type Section = {
  id: string;

  type: "hero" | "section" | "gallery" | "schedule" | "map" | "rsvp" | "custom";

  layout: SectionLayout;

  components: Component[];
};

export type SectionLayout = {
  align: "start" | "center" | "end";
  width: "sm" | "md" | "lg" | "full";
  padding: number;
  height: number;
  justifyContent: "start" | "center" | "end";
  background?:
    | {
        type: "color" | "image";

        value: string;
      }
    | {
        type: "gradient";

        value: Gradient;
      };
};

export type Component = TitleComponent | SubtitleComponent | TextComponent;

export type TextStyle = {
  color?: string;
  background?: Gradient;
  fontSize?: number;
  fontWeight?: number;
  textAlign?: "left" | "center" | "right";
  fontStyle?: "normal" | "italic";
  width?: number;
  justifyContent?: "start" | "center" | "end";
  padding?: number;
  height?: number;
};

type Base = {
  id: string;
};

export type TitleComponent = Base & {
  type: "title";
  value: string;
  style?: TextStyle & {
    level?: 1 | 2 | 3;
  };
};

export type SubtitleComponent = Base & {
  type: "subtitle";
  style?: TextStyle;
  value: string;
};

export type TextComponent = Base & {
  type: "text";
  value: string;
  style?: TextStyle;
};

type ComponentType = Component["type"];

export const COMPONENT_REGISTRY: Record<
  ComponentType,
  { label: string; category: "basic" | "layout" }
> = {
  title: { label: "Title", category: "basic" },
  subtitle: { label: "Subtitle", category: "basic" },
  text: { label: "Text", category: "basic" },
};
