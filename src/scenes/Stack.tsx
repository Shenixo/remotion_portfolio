import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { Reveal } from "../components";
import { clamp, colors, fonts } from "../theme";

const rows = [
  {
    label: "Frontend",
    items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    bg: colors.blue,
    fg: "#fff",
    start: 34,
  },
  {
    label: "Backend",
    items: ["Node.js", "Express", "PostgreSQL", "Redis", "BullMQ"],
    bg: colors.ink,
    fg: "#fff",
    start: 70,
  },
];

export const Stack: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill
      style={{
        background: colors.paper,
        color: colors.ink,
        justifyContent: "center",
        padding: "0 140px",
      }}
    >
      <Reveal delay={2}>
        <div
          style={{
            fontFamily: fonts.display,
            fontWeight: 800,
            fontSize: 110,
            letterSpacing: "-0.035em",
            lineHeight: 1.05,
          }}
        >
          Frontend first.
        </div>
      </Reveal>
      <Reveal delay={12}>
        <div
          style={{
            fontFamily: fonts.display,
            fontWeight: 800,
            fontSize: 110,
            letterSpacing: "-0.035em",
            lineHeight: 1.05,
            color: colors.blue,
            marginBottom: 56,
          }}
        >
          Growing into fullstack.
        </div>
      </Reveal>

      {rows.map((row) => (
        <div
          key={row.label}
          style={{ display: "flex", alignItems: "center", gap: 36, marginBottom: 28 }}
        >
          <div
            style={{
              width: 190,
              fontFamily: fonts.display,
              fontWeight: 800,
              fontSize: 40,
              opacity: interpolate(frame, [row.start - 8, row.start + 6], [0, 1], clamp),
            }}
          >
            {row.label}
          </div>
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
            {row.items.map((item, i) => {
              const p = spring({ frame: frame - row.start - i * 5, fps, config: { damping: 12 } });
              return (
                <div
                  key={item}
                  style={{
                    fontFamily: fonts.body,
                    fontWeight: 600,
                    fontSize: 38,
                    padding: "14px 32px",
                    borderRadius: 999,
                    background: row.bg,
                    color: row.fg,
                    transform: `scale(${p})`,
                    opacity: p,
                  }}
                >
                  {item}
                </div>
              );
            })}
          </div>
        </div>
      ))}

      <div
        style={{
          marginTop: 24,
          fontFamily: fonts.body,
          fontSize: 32,
          color: "#5B6390",
          opacity: interpolate(frame, [104, 124], [0, 1], clamp),
        }}
      >
        Production work in ed-tech and immigration services.
      </div>
    </AbsoluteFill>
  );
};
