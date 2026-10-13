import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { Word } from "../components";
import { clamp, colors, fonts } from "../theme";
import { RedFrameVisual, SgtVisual, UlooksVisual } from "./Visuals";

export type ProjectProps = {
  name: string;
  role: string;
  line: string;
  stack: string[];
  bg: string;
  fg: string;
  Visual: React.FC;
};

export const projects: ProjectProps[] = [
  {
    name: "SGT",
    role: "Frontend lead",
    line: "Expert led courses for students preparing for ATS, ICAN and O'Level exams.",
    stack: ["React", "Next.js", "TypeScript"],
    bg: colors.ink,
    fg: colors.paper,
    Visual: SgtVisual,
  },
  {
    name: "RedFrame",
    role: "Fullstack, solo build",
    line: "A movie collection tracker with trailers, powered by TMDB and YouTube.",
    stack: ["React", "TypeScript", "Firebase"],
    bg: colors.coral,
    fg: colors.ink,
    Visual: RedFrameVisual,
  },
  {
    name: "Ulooks",
    role: "Co-founder and CTO",
    line: "A booking marketplace that connects people with beauty and grooming professionals.",
    stack: ["Product", "Engineering", "Leadership"],
    bg: colors.sun,
    fg: colors.ink,
    Visual: UlooksVisual,
  },
];

export const Project: React.FC<ProjectProps> = ({ name, role, line, stack, bg, fg, Visual }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const enter = spring({ frame: frame - 8, fps, config: { damping: 16, stiffness: 70 } });
  const roleOpacity = interpolate(frame, [0, 14], [0, 1], clamp);
  const lineOpacity = interpolate(frame, [26, 44], [0, 1], clamp);

  return (
    <AbsoluteFill
      style={{
        background: bg,
        color: fg,
        flexDirection: "row",
        alignItems: "center",
        padding: "0 120px",
        gap: 40,
      }}
    >
      <div style={{ flex: 1 }}>
        <div
          style={{
            fontFamily: fonts.body,
            fontWeight: 600,
            fontSize: 36,
            opacity: roleOpacity * 0.85,
          }}
        >
          {role}
        </div>
        <div
          style={{
            fontFamily: fonts.display,
            fontWeight: 800,
            fontSize: 190,
            lineHeight: 1,
            letterSpacing: "-0.04em",
            margin: "6px 0 18px",
          }}
        >
          <Word text={name} delay={4} stagger={2} />
        </div>
        <div
          style={{
            fontFamily: fonts.body,
            fontSize: 42,
            lineHeight: 1.3,
            maxWidth: 780,
            opacity: lineOpacity,
          }}
        >
          {line}
        </div>
        <div style={{ display: "flex", gap: 14, marginTop: 34 }}>
          {stack.map((s, i) => {
            const p = spring({ frame: frame - 40 - i * 5, fps, config: { damping: 14 } });
            return (
              <div
                key={s}
                style={{
                  fontFamily: fonts.body,
                  fontWeight: 600,
                  fontSize: 28,
                  padding: "10px 24px",
                  borderRadius: 999,
                  border: `3px solid ${fg}`,
                  transform: `scale(${p})`,
                  opacity: p,
                }}
              >
                {s}
              </div>
            );
          })}
        </div>
      </div>

      <div
        style={{
          width: 640,
          transform: `translateX(${(1 - enter) * 700}px) rotate(${-3 + (1 - enter) * 8}deg)`,
        }}
      >
        <Visual />
      </div>
    </AbsoluteFill>
  );
};
