"use client";

import { SectionRenderer } from "@/components/renderer/section-renderer";
import { Invitation } from "@/types/invitation";
import { useParams } from "next/navigation";

const InvitePage = () => {
  const id = useParams().slug as string;
  console.log(id);

  const invitation: Invitation = JSON.parse(localStorage.getItem(id) || "   ");

  return (
    <>
      {invitation.sections.map((section) => (
        <SectionRenderer
          key={section.id}
          section={section}
          onSelectSection={() => {}}
          onSelectComponent={() => {}}
        />
      ))}
    </>
  );
};

export default InvitePage;
