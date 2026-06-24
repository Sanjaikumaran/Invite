import { Section } from "@/types/invitation";
import { constructGradient } from "@/lib/construct-gradient";
import { ComponentRenderer } from "./component-renderer";

type Props = {
  section: Section;
  mode: "edit" | "view";
  isSelected?: boolean;
  selectedComponentId?: string | null;
  onSelectSection: (id: string) => void;
  onSelectComponent: (id: string) => void;
};

export function SectionRenderer({
  section,
  mode,
  isSelected,
  selectedComponentId,
  onSelectSection,
  onSelectComponent,
}: Props) {
  const styles: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    alignItems: section.layout.align,
    justifyContent: section.layout.justifyContent,
    width: section.layout.width || "100%",
    padding: section.layout.padding,
    height: section.layout.height ? `${section.layout.height}px` : "auto",
    // gap: section.layout.gap || 20,
  };

  if (section.layout.background?.type === "gradient") {
    styles.background = constructGradient(section.layout.background.value);
  }

  if (section.layout.background?.type === "color") {
    styles.background = section.layout.background.value;
  }

  if (section.layout.background?.type === "image") {
    const bg = section.layout.background.value;

    styles.backgroundImage = `url(${bg.url})`;

    styles.backgroundRepeat = bg.repeat || "no-repeat";

    styles.backgroundPosition = bg.position || "center";

    styles.backgroundSize = bg.size || "cover";
  }

  return (
    <section
      style={styles}
      onClick={() => onSelectSection(section.id)}
      className={
        isSelected && !selectedComponentId
          ? "outline outline-3 outline-green-500"
          : ""
      }
    >
      {section.components.map((component) => (
        <div
          key={component.id}
          onClick={(e) => {
            e.stopPropagation();
            onSelectSection(section.id);
            onSelectComponent(component.id);
          }}
        >
          <ComponentRenderer
            sectionId={section.id}
            component={component}
            mode={mode}
            selectedComponentId={selectedComponentId}
          />
        </div>
      ))}
    </section>
  );
}
