import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { clamp, colors, fonts } from "../theme";

const card: React.CSSProperties = {
  width: 640,
  height: 520,
  borderRadius: 28,
  padding: 36,
  boxSizing: "border-box",
  fontFamily: fonts.body,
  boxShadow: "0 40px 80px rgba(0,0,0,0.3)",
};

const skeleton = (w: number | string, color: string = colors.mist): React.CSSProperties => ({
  height: 14,
  width: w,
  borderRadius: 7,
  background: color,
});

/* SGT: course progress and a quiz question */
export const SgtVisual: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const progress = interpolate(frame, [18, 70], [0, 72], clamp);
  const picked = frame >= 50;
  const btn = spring({ frame: frame - 58, fps, config: { damping: 12 } });

  return (
    <div style={{ ...card, background: "#fff", color: colors.ink }}>
      <div style={{ fontFamily: fonts.display, fontWeight: 800, fontSize: 34 }}>Exam prep course</div>

      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 22, fontSize: 22 }}>
        <span>Course progress</span>
        <span style={{ fontWeight: 600 }}>{Math.round(progress)}%</span>
      </div>
      <div style={{ height: 14, borderRadius: 7, background: colors.tint, marginTop: 10 }}>
        <div style={{ height: 14, borderRadius: 7, width: `${progress}%`, background: colors.blue }} />
      </div>

      <div style={{ marginTop: 34, display: "flex", flexDirection: "column", gap: 12 }}>
        <div style={skeleton("90%", colors.ink)} />
        <div style={skeleton("60%", colors.ink)} />
      </div>

      <div style={{ marginTop: 26, display: "flex", flexDirection: "column", gap: 12 }}>
        {["A", "B", "C", "D"].map((l, i) => {
          const on = picked && i === 2;
          return (
            <div
              key={l}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 16,
                height: 52,
                padding: "0 16px",
                borderRadius: 14,
                border: `2px solid ${on ? colors.blue : colors.mist}`,
                background: on ? colors.tint : "#fff",
              }}
            >
              <div
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 15,
                  background: on ? colors.blue : colors.tint,
                  color: on ? "#fff" : colors.ink,
                  fontWeight: 600,
                  fontSize: 18,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {on ? "\u2713" : l}
              </div>
              <div style={skeleton(`${70 - i * 10}%`)} />
            </div>
          );
        })}
      </div>

      <div
        style={{
          marginTop: 22,
          marginLeft: "auto",
          width: 150,
          height: 48,
          borderRadius: 24,
          background: colors.ink,
          color: "#fff",
          fontWeight: 600,
          fontSize: 22,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transform: `scale(${btn})`,
        }}
      >
        Next
      </div>
    </div>
  );
};

/* RedFrame: a movie collection grid */
const posters: [string, string][] = [
  ["#7C5CFF", "#2438E8"],
  ["#FFD23F", "#FF6B57"],
  ["#35D0BA", "#2438E8"],
  ["#FF6B57", "#7C5CFF"],
  ["#F6F7FC", "#9AA5FF"],
  ["#FFD23F", "#35D0BA"],
];

export const RedFrameVisual: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <div style={{ ...card, background: colors.ink, color: colors.paper }}>
      <div style={{ fontFamily: fonts.display, fontWeight: 800, fontSize: 34 }}>My collection</div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 18,
          marginTop: 26,
        }}
      >
        {posters.map(([a, b], i) => {
          const p = spring({ frame: frame - 14 - i * 5, fps, config: { damping: 14 } });
          const watched = frame >= 56 + i * 4 && (i === 0 || i === 3 || i === 4);
          return (
            <div
              key={i}
              style={{
                position: "relative",
                height: 190,
                borderRadius: 16,
                background: `linear-gradient(160deg, ${a}, ${b})`,
                opacity: p,
                transform: `translateY(${(1 - p) * 60}px)`,
              }}
            >
              {i === 1 && (
                <div
                  style={{
                    position: "absolute",
                    left: "50%",
                    top: "50%",
                    width: 0,
                    height: 0,
                    marginLeft: -10,
                    marginTop: -16,
                    borderTop: "16px solid transparent",
                    borderBottom: "16px solid transparent",
                    borderLeft: `26px solid ${colors.ink}`,
                  }}
                />
              )}
              {watched && (
                <div
                  style={{
                    position: "absolute",
                    right: 10,
                    top: 10,
                    width: 32,
                    height: 32,
                    borderRadius: 16,
                    background: colors.ink,
                    color: colors.sun,
                    fontWeight: 600,
                    fontSize: 20,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {"\u2713"}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

/* Ulooks: booking a slot */
const days = [
  ["Mon", "12"],
  ["Tue", "13"],
  ["Wed", "14"],
  ["Thu", "15"],
  ["Fri", "16"],
];
const slots = ["09:00", "10:30", "12:00", "13:30", "15:00", "16:30"];

export const UlooksVisual: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const dayPicked = frame >= 26;
  const slotPicked = frame >= 46;
  const btn = spring({ frame: frame - 58, fps, config: { damping: 12 } });

  return (
    <div style={{ ...card, background: "#fff", color: colors.ink }}>
      <div style={{ fontFamily: fonts.display, fontWeight: 800, fontSize: 34 }}>Pick a time</div>

      <div style={{ display: "flex", gap: 12, marginTop: 24 }}>
        {days.map(([d, n], i) => {
          const on = dayPicked && i === 2;
          return (
            <div
              key={d}
              style={{
                flex: 1,
                height: 84,
                borderRadius: 16,
                background: on ? colors.ink : colors.tint,
                color: on ? "#fff" : colors.ink,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div style={{ fontSize: 20 }}>{d}</div>
              <div style={{ fontFamily: fonts.display, fontWeight: 800, fontSize: 30 }}>{n}</div>
            </div>
          );
        })}
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 12,
          marginTop: 24,
        }}
      >
        {slots.map((s, i) => {
          const on = slotPicked && i === 3;
          return (
            <div
              key={s}
              style={{
                height: 58,
                borderRadius: 14,
                border: `2px solid ${on ? colors.ink : colors.mist}`,
                background: on ? colors.sun : "#fff",
                fontWeight: 600,
                fontSize: 24,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {s}
            </div>
          );
        })}
      </div>

      <div
        style={{
          marginTop: 28,
          height: 60,
          borderRadius: 30,
          background: colors.ink,
          color: "#fff",
          fontWeight: 600,
          fontSize: 26,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transform: `scale(${btn})`,
        }}
      >
        Book now
      </div>
    </div>
  );
};
