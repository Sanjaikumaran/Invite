"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useEditor } from "@/store/editor.store";
import { Invitation } from "@/types/invitation";

export default function CreateInvitationPage() {
  const router = useRouter();
  const setInvitation = useEditor((s) => s.setInvitation);

  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCreate = async () => {
    if (!title.trim()) return;

    setLoading(true);

    const id = crypto.randomUUID();
    const slug = title.toLowerCase().replace(/\s+/g, "-") + "-" + Date.now();

    const newInvitation: Invitation = {
      id,
      slug,
      title,
      status: "draft",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      sections: [
        {
          id: crypto.randomUUID(),
          type: "hero",
          layout: {
            align: "center",
            width: "full",
            padding: 40,
            height: 0,
            justifyContent: "center",
          },
          components: [],
        },
      ],
    };

    localStorage.setItem(slug, JSON.stringify(newInvitation));
    setInvitation(newInvitation);

    // optional: backend call here later
    // await axios.post("/api/invitations", newInvitation);

    setLoading(false);

    router.push(`/editor/${slug}`);
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-50">
      <div className="w-[420px] bg-white border rounded-xl p-6 space-y-4">
        <h1 className="text-xl font-semibold">Create Invitation</h1>

        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter invitation title"
          className="w-full border px-3 py-2 rounded"
        />

        <button
          onClick={handleCreate}
          disabled={loading}
          className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 disabled:opacity-50"
        >
          {loading ? "Creating..." : "Create"}
        </button>
      </div>
    </div>
  );
}
