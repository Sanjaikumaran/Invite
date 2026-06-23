import { Section } from "@/types/invitation";
import { constructGradient } from "@/lib/construct-gradient";
import { ComponentRenderer } from "./component-renderer";

type Props = {
  section: Section;
  isSelected?: boolean;
  selectedComponentId?: string | null;
  onSelectSection: (id: string) => void;
  onSelectComponent: (id: string) => void;
};

export function SectionRenderer({
  section,
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
    width: section.layout.width,
    padding: section.layout.padding,
    height: section.layout.height ? `${section.layout.height}px` : "auto",
  };

  if (section.layout.background?.type === "gradient") {
    styles.background = constructGradient(section.layout.background.value);
  } else {
    styles.background = section.layout.background?.value;
  }

  return (
    <div
      onClick={() => onSelectSection(section.id)}
      style={styles}
      className={isSelected ? "outline outline-2 outline-blue-500" : ""}
    >
      {section.components.map((component) => {
        return (
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
              selectedComponentId={selectedComponentId}
              component={component}
              mode="edit"
            />
          </div>
        );
      })}
    </div>
  );
}
