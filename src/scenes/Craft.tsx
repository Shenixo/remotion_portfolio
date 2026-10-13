import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { Reveal } from "../components";
import { clamp, colors, fonts } from "../theme";

const cards = [
  { label: "Visitors", value: 12480 },
  { label: "Signups", value: 3260 },
  { label: "Orders", value: 874 },
];

const bars = [40, 70, 55, 95, 80, 120, 100, 150, 125];

export const Craft: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const win = spring({ frame: frame - 6, fps, config: { damping: 18, stiffness: 80 } });

  return (
    <AbsoluteFill
      style={{
        background: colors.paper,
        flexDirection: "row",
        alignItems: "center",
        padding: "0 100px",
        gap: 60,
      }}
    >
      {/* Copy */}
      <div style={{ width: 780, color: colors.ink, fontFamily: fonts.display, fontWeight: 800 }}>
        <Reveal delay={4}>
          <div style={{ fontSize: 76, lineHeight: 1.05, letterSpacing: "-0.03em" }}>
            I turn designs
          </div>
        </Reveal>
        <Reveal delay={12}>
          <div style={{ fontSize: 76, lineHeight: 1.05, letterSpacing: "-0.03em" }}>
            into fast, accessible
          </div>
        </Reveal>
        <Reveal delay={20}>
          <div
            style={{
              fontSize: 76,
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
              color: colors.blue,
            }}
          >
            interfaces.
          </div>
        </Reveal>
        <div
          style={{
            marginTop: 36,
            fontFamily: fonts.body,
            fontWeight: 400,
            fontSize: 34,
            lineHeight: 1.4,
            maxWidth: 620,
            opacity: interpolate(frame, [40, 60], [0, 1], clamp),
          }}
        >
          Reusable components, clean state and layouts that hold up on every screen.
        </div>
      </div>

      {/* Browser window */}
      <div
        style={{
          width: 880,
          height: 600,
          borderRadius: 22,
          background: "#fff",
          overflow: "hidden",
          boxShadow: "0 40px 90px rgba(11,16,48,0.28)",
          transform: `translateY(${(1 - win) * 160}px) rotate(${(1 - win) * 4}deg)`,
          opacity: interpolate(win, [0, 0.3], [0, 1], clamp),
        }}
      >
        <div
          style={{
            height: 44,
            background: colors.tint,
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: "0 18px",
          }}
        >
          {[0, 1, 2].map((i) => (
            <div key={i} style={{ width: 12, height: 12, borderRadius: 6, background: colors.mist }} />
          ))}
        </div>

        <div style={{ display: "flex", height: 556 }}>
          {/* Sidebar */}
          <div style={{ width: 160, background: colors.ink, padding: 22 }}>
            {[0, 1, 2, 3, 4].map((i) => {
              const p = spring({ frame: frame - 18 - i * 4, fps, config: { damping: 200 } });
              return (
                <div
                  key={i}
                  style={{
                    height: 16,
                    borderRadius: 8,
                    marginBottom: 22,
                    width: `${p * (i === 0 ? 100 : 70)}%`,
                    background: i === 0 ? colors.sun : "rgba(255,255,255,0.28)",
                  }}
                />
              );
            })}
          </div>

          {/* Main */}
          <div style={{ flex: 1, padding: 28 }}>
            <div
              style={{
                height: 24,
                width: interpolate(frame, [20, 40], [0, 240], clamp),
                borderRadius: 12,
                background: colors.ink,
                marginBottom: 56,
              }}
            />

            <div style={{ display: "flex", gap: 18 }}>
              {cards.map((c, i) => {
                const start = 26 + i * 8;
                const p = spring({ frame: frame - start, fps, config: { damping: 200 } });
                const n = Math.round(interpolate(frame, [start, start + 40], [0, c.value], clamp));
                const s = 58 + i * 30;
                const hl = interpolate(frame, [s, s + 8, s + 26, s + 34], [0, 1, 1, 0], clamp);
                return (
                  <div key={c.label} style={{ position: "relative", flex: 1 }}>
                    <div
                      style={{
                        background: colors.tint,
                        borderRadius: 14,
                        padding: 18,
                        opacity: p,
                        transform: `translateY(${(1 - p) * 24}px)`,
                      }}
                    >
                      <div style={{ fontFamily: fonts.body, fontSize: 20, color: "#5B6390" }}>
                        {c.label}
                      </div>
                      <div
                        style={{
                          fontFamily: fonts.display,
                          fontWeight: 800,
                          fontSize: 42,
                          color: colors.ink,
                          marginTop: 6,
                        }}
                      >
                        {n.toLocaleString("en-US")}
                      </div>
                    </div>
                    <div
                      style={{
                        position: "absolute",
                        inset: -8,
                        border: `3px dashed ${colors.blue}`,
                        borderRadius: 20,
                        opacity: hl,
                      }}
                    />
                    <div
                      style={{
                        position: "absolute",
                        top: -42,
                        left: -8,
                        background: colors.blue,
                        color: "#fff",
                        fontFamily: "ui-monospace, Menlo, Consolas, monospace",
                        fontSize: 18,
                        padding: "4px 12px",
                        borderRadius: 8,
                        opacity: hl,
                      }}
                    >
                      {"<StatCard />"}
                    </div>
                  </div>
                );
              })}
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "flex-end",
                gap: 14,
                height: 180,
                marginTop: 44,
              }}
            >
              {bars.map((h, i) => {
                const p = spring({ frame: frame - 40 - i * 3, fps, config: { damping: 14 } });
                return (
                  <div
                    key={i}
                    style={{
                      flex: 1,
                      height: h * p,
                      borderRadius: 8,
                      background: i === 7 ? colors.blue : colors.mist,
                    }}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
