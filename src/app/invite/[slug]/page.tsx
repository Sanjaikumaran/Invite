"use client";

import { SectionRenderer } from "@/components/renderer/section-renderer";
import { Invitation } from "@/types/invitation";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const InvitePage = () => {
  const id = useParams().slug as string;
  const [invitation, setInvitation] = useState<Invitation>();

  useEffect(() => {
    if (id) {
      const invitation: Invitation = JSON.parse(
        localStorage.getItem(id) || "   ",
      );
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setInvitation(invitation);
    }
  }, [id]);

  return (
    <>
      {invitation?.sections.map((section) => (
        <SectionRenderer
          mode={"view"}
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
