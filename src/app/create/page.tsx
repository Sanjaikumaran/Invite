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
  const [jsonInput, setJsonInput] = useState(
    JSON.stringify({
      createdAt: "2026-06-24T10:00:00Z",
      id: "api-workshop-demo-001",
      sections: [
        {
          components: [
            {
              id: "hero-badge",
              style: {
                color: "#BFDBFE",
                fontSize: 14,
                fontWeight: 700,
                padding: 18,
              },
              type: "badge",
              value: "LIMITED COHORT • LIVE • PRODUCTION ENGINEERING",
            },
            {
              id: "hero-proof",
              style: {
                color: "#CBD5E1",
                fontSize: 18,
              },
              type: "subtitle",
              value:
                "Trusted by 1200+ engineers across startups and enterprise teams",
            },
            {
              id: "hero-title",
              style: {
                background: {
                  angle: 90,
                  stops: [
                    {
                      color: "#FFFFFF",
                      id: "a",
                      position: 0,
                    },
                    {
                      color: "#C4B5FD",
                      id: "b",
                      position: 50,
                    },
                    {
                      color: "#67E8F9",
                      id: "c",
                      position: 100,
                    },
                  ],
                  type: "linear",
                },
                fontSize: 92,
                fontWeight: 900,
                textAlign: "center",
                width: 1300,
              },
              type: "title",
              value:
                "Master The API Architecture Patterns Used By Modern Engineering Teams",
            },
            {
              id: "hero-text",
              style: {
                color: "#E2E8F0",
                fontSize: 26,
                textAlign: "center",
                width: 920,
              },
              type: "text",
              value:
                "Design resilient APIs, implement enterprise security, deploy modern infrastructure and ship production-grade systems through guided hands-on delivery.",
            },
            {
              action: {
                newTab: false,
                type: "navigate",
                url: "/register",
              },
              id: "hero-cta",
              style: {
                borderRadius: 999,
                color: "#2563EB",
                fontSize: 18,
                fontWeight: 700,
                padding: 24,
                width: 360,
              },
              type: "button",
              value: "Reserve Your Seat →",
            },
            {
              action: {
                type: "navigate",
                url: "#curriculum",
              },
              id: "hero-secondary",
              style: {
                borderRadius: 999,
                color: "#FFFFFF",
                fontSize: 18,
                fontWeight: 700,
                padding: 20,
                width: 320,
              },
              type: "button",
              value: "View Curriculum",
            },
          ],
          id: "hero",
          layout: {
            align: "center",
            background: {
              type: "gradient",
              value: {
                angle: 0,
                radial: {
                  shape: "circle",
                  x: 50,
                  y: 10,
                },
                stops: [
                  {
                    color: "#020617",
                    id: "1",
                    position: 0,
                  },
                  {
                    color: "#172554",
                    id: "2",
                    position: 45,
                  },
                  {
                    color: "#1D4ED8",
                    id: "3",
                    position: 72,
                  },
                  {
                    color: "#06B6D4",
                    id: "4",
                    position: 100,
                  },
                ],
                type: "radial",
              },
            },
            height: 980,
            justifyContent: "center",
            padding: 120,
            width: "full",
          },
          type: "hero",
        },
        {
          components: [
            {
              id: "m1",
              type: "badge",
              value: "OUTCOMES",
            },
            {
              id: "m2",
              style: {
                fontSize: 64,
                fontWeight: 900,
                textAlign: "center",
                width: 1200,
              },
              type: "title",
              value:
                "Leave With Skills That Immediately Transfer To Production",
            },
            {
              id: "m3",
              style: {
                color: "#64748B",
                fontSize: 24,
              },
              type: "subtitle",
              value:
                "Built for backend engineers, platform teams and software developers.",
            },
            {
              id: "m4",
              type: "stat",
              value: "1200+\nEngineers",
            },
            {
              id: "m5",
              type: "stat",
              value: "95%\nSatisfaction",
            },
            {
              id: "m6",
              type: "stat",
              value: "18\nSessions",
            },
            {
              id: "m7",
              type: "stat",
              value: "3\nExperts",
            },
          ],
          id: "metrics",
          layout: {
            align: "center",
            background: {
              type: "gradient",
              value: {
                angle: 180,
                stops: [
                  {
                    color: "#FFFFFF",
                    id: "1",
                    position: 0,
                  },
                  {
                    color: "#F8FAFC",
                    id: "2",
                    position: 100,
                  },
                ],
                type: "linear",
              },
            },
            height: 760,
            justifyContent: "center",
            padding: 160,
            width: "full",
          },
          type: "section",
        },
        {
          components: [
            {
              id: "b1",
              style: {
                fontSize: 66,
                fontWeight: 900,
                textAlign: "center",
              },
              type: "title",
              value: "Everything You Need To Build Production APIs",
            },
            {
              id: "b2",
              style: {
                fontSize: 24,
              },
              type: "list",
              value: [
                "Enterprise REST Design",
                "GraphQL APIs",
                "OAuth + JWT Security",
                "API Gateway Patterns",
                "Caching & Redis",
                "Observability",
                "Docker Infrastructure",
                "CI/CD Delivery",
                "Performance Optimization",
                "Scaling Patterns",
                "Documentation Standards",
                "Deployment Automation",
              ],
            },
          ],
          id: "benefits",
          layout: {
            align: "center",
            background: {
              type: "gradient",
              value: {
                angle: 180,
                stops: [
                  {
                    color: "#EFF6FF",
                    id: "1",
                    position: 0,
                  },
                  {
                    color: "#FFFFFF",
                    id: "2",
                    position: 100,
                  },
                ],
                type: "linear",
              },
            },
            height: 980,
            justifyContent: "center",
            padding: 160,
            width: "full",
          },
          type: "section",
        },
        {
          components: [
            {
              id: "c1",
              style: {
                fontSize: 64,
              },
              type: "title",
              value: "3 Days. One Complete Production Workflow",
            },
            {
              id: "c2",
              style: {
                fontSize: 28,
              },
              type: "list",
              value: [
                "Day 1 → Architecture • REST • GraphQL • Design Systems",
                "Day 2 → Security • Auth • Rate Limits • Gateways",
                "Day 3 → Docker • Monitoring • Deployment • Capstone",
              ],
            },
          ],
          id: "curriculum",
          layout: {
            align: "center",
            background: {
              type: "gradient",
              value: {
                angle: 135,
                stops: [
                  {
                    color: "#FFFFFF",
                    id: "1",
                    position: 0,
                  },
                  {
                    color: "#ECFEFF",
                    id: "2",
                    position: 100,
                  },
                ],
                type: "linear",
              },
            },
            height: 980,
            justifyContent: "center",
            padding: 170,
            width: "full",
          },
          type: "section",
        },
        {
          components: [
            {
              id: "p1",
              style: {
                color: "#67E8F9",
              },
              type: "badge",
              value: "PROJECT SHOWCASE",
            },
            {
              id: "p2",
              style: {
                color: "#FFFFFF",
                fontSize: 68,
                fontWeight: 900,
              },
              type: "title",
              value: "Build Systems That Look Like Real Products",
            },
            {
              id: "p3",
              style: {
                color: "#CBD5E1",
                fontSize: 28,
              },
              type: "list",
              value: [
                "Authentication Platform",
                "API Gateway",
                "Observability Dashboard",
                "CI/CD Pipeline",
                "Developer Portal",
                "Monitoring Infrastructure",
              ],
            },
          ],
          id: "projects",
          layout: {
            align: "center",
            background: {
              type: "color",
              value: "#020617",
            },
            height: 900,
            justifyContent: "center",
            padding: 160,
            width: "full",
          },
          type: "section",
        },
        {
          components: [
            {
              id: "t1",
              style: {
                fontSize: 62,
                fontWeight: 900,
              },
              type: "title",
              value: "Loved By Engineers Across Teams",
            },
            {
              id: "t2",
              style: {
                fontSize: 24,
              },
              type: "list",
              value: [
                "★★★★★ • Senior Backend Engineer • Cut months of learning",
                "★★★★★ • Platform Engineer • Best architecture workshop attended",
                "★★★★★ • Engineering Lead • Immediate production impact",
              ],
            },
          ],
          id: "testimonials",
          layout: {
            align: "center",
            background: {
              type: "color",
              value: "#FFFFFF",
            },
            height: 880,
            justifyContent: "center",
            padding: 150,
            width: "full",
          },
          type: "section",
        },
        {
          components: [
            {
              id: "f1",
              style: {
                fontSize: 60,
              },
              type: "title",
              value: "Frequently Asked Questions",
            },
            {
              id: "f2",
              style: {
                fontSize: 22,
              },
              type: "list",
              value: [
                "Do I need backend experience?",
                "Will recordings be available?",
                "Will certificates be included?",
                "Are projects production-grade?",
                "Will source code be shared?",
                "Can teams enroll together?",
              ],
            },
          ],
          id: "faq",
          layout: {
            align: "center",
            background: {
              type: "gradient",
              value: {
                angle: 180,
                stops: [
                  {
                    color: "#F8FAFC",
                    id: "1",
                    position: 0,
                  },
                  {
                    color: "#FFFFFF",
                    id: "2",
                    position: 100,
                  },
                ],
                type: "linear",
              },
            },
            height: 950,
            justifyContent: "center",
            padding: 160,
            width: "full",
          },
          type: "section",
        },
        {
          components: [
            {
              id: "fc1",
              style: {
                color: "#FFFFFF",
                fontSize: 78,
                fontWeight: 900,
                textAlign: "center",
              },
              type: "title",
              value: "Start Building Systems That Scale",
            },
            {
              id: "fc2",
              style: {
                color: "#E0F2FE",
                fontSize: 24,
              },
              type: "subtitle",
              value:
                "Join the next cohort and build production-ready API skills.",
            },
            {
              action: {
                type: "navigate",
                url: "/register",
              },
              id: "fc3",
              style: {
                borderRadius: 999,
                color: "#2563EB",
                fontSize: 20,
                fontWeight: 700,
                padding: 24,
                width: 360,
              },
              type: "button",
              value: "Join Workshop",
            },
          ],
          id: "final-cta",
          layout: {
            align: "center",
            background: {
              type: "gradient",
              value: {
                angle: 135,
                stops: [
                  {
                    color: "#2563EB",
                    id: "1",
                    position: 0,
                  },
                  {
                    color: "#8B5CF6",
                    id: "2",
                    position: 100,
                  },
                ],
                type: "linear",
              },
            },
            height: 620,
            justifyContent: "center",
            padding: 200,
            width: "full",
          },
          type: "section",
        },
      ],
      slug: "modern-api-engineering-workshop",
      status: "published",
      title: "Modern API Engineering Workshop",
      updatedAt: "2026-06-24T10:00:00Z",
    }),
  );

  const handleCreate = async () => {
    if (!title.trim()) return;

    setLoading(true);

    const slug =
      title.trim().toLowerCase().replace(/\s+/g, "-") + "-" + Date.now();

    let invitation: Invitation;

    try {
      if (jsonInput.trim()) {
        invitation = JSON.parse(jsonInput);

        invitation = {
          ...invitation,
          title,
          slug,
          updatedAt: new Date().toISOString(),
        };
      } else {
        invitation = {
          id: crypto.randomUUID(),
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
      }

      localStorage.setItem(slug, JSON.stringify(invitation));

      setInvitation(invitation);

      router.push(`/editor/${slug}`);
    } catch {
      alert("Invalid JSON");
    } finally {
      setLoading(false);
    }
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

        <textarea
          value={jsonInput}
          onChange={(e) => setJsonInput(e.target.value)}
          placeholder="Paste invitation JSON (optional)"
          className="w-full min-h-[220px] border px-3 py-2 rounded font-mono text-sm"
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
