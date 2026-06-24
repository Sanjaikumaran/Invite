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
        type: "color";
        value: string;
      }
    | {
        type: "gradient";
        value: Gradient;
      }
    | {
        type: "image";
        value: {
          url: string;
          position: "top" | "center" | "bottom";
          repeat?: "no-repeat" | "repeat" | "repeat-x" | "repeat-y";
          size?: "contain" | "cover";
          width?: string;
          height?: string;
        };
      };
};

export type Component =
  | TitleComponent
  | SubtitleComponent
  | TextComponent
  | BadgeComponent
  | StatComponent
  | ButtonComponent
  | ListComponent;

export type TextStyle = {
  color?: string;
  background?: Gradient;
  backgroundColor?: string;
  fontSize?: number;
  fontWeight?: number;
  fontFamily?: string;
  lineHeight?: number;
  letterSpacing?: number;
  textAlign?: "left" | "center" | "right";
  textTransform?: "none" | "uppercase" | "lowercase" | "capitalize";
  textDecoration?: "none" | "underline";
  fontStyle?: "normal" | "italic";
  opacity?: number;
  borderRadius?: number;
  borderWidth?: number;
  borderColor?: string;
  shadow?: string;
  width?: number;
  height?: number;
  minWidth?: number;
  minHeight?: number;
  padding?: number;
  margin?: number;
  gap?: number;
  justifyContent?: "start" | "center" | "end";
  alignItems?: "start" | "center" | "end";
  image?: {
    url: string;
    fit: "cover" | "contain";
    position: "top" | "center" | "bottom";
    repeat: "no-repeat" | "repeat";
  };
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

export type BadgeComponent = Base & {
  type: "badge";
  value: string;
  style?: TextStyle;
};

export type StatComponent = Base & {
  type: "stat";
  value: string;
  style?: TextStyle;
};

export type ButtonComponent = Base & {
  type: "button";

  value: string;

  action?: {
    type: "none" | "navigate";

    url?: string;

    newTab?: boolean;
  };

  style?: TextStyle;
};

export type ListComponent = Base & {
  type: "list";

  value: string[];

  style?: TextStyle & {
    bullet?: "disc" | "circle" | "decimal" | "none";
  };
};

type ComponentType = Component["type"];

export const COMPONENT_REGISTRY: Record<
  ComponentType,
  {
    label: string;
    category: "basic" | "layout";
  }
> = {
  title: {
    label: "Title",
    category: "basic",
  },

  subtitle: {
    label: "Subtitle",
    category: "basic",
  },

  text: {
    label: "Text",
    category: "basic",
  },

  badge: {
    label: "Badge",
    category: "basic",
  },

  stat: {
    label: "Stat",
    category: "basic",
  },

  button: {
    label: "Button",
    category: "basic",
  },

  list: {
    label: "List",
    category: "basic",
  },
};
