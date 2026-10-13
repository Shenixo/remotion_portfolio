import React from "react";
import {
  AbsoluteFill,
  Easing,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

// Letters rise out of a mask one by one.
export const Word: React.FC<{ text: string; delay?: number; stagger?: number }> = ({
  text,
  delay = 0,
  stagger = 3,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <div style={{ display: "flex", overflow: "hidden", padding: "0.02em 0 0.14em" }}>
      {text.split("").map((ch, i) => {
        const p = spring({
          frame: frame - delay - i * stagger,
          fps,
          config: { damping: 16, stiffness: 110 },
        });
        return (
          <span
            key={i}
            style={{ display: "inline-block", transform: `translateY(${(1 - p) * 115}%)` }}
          >
            {ch === " " ? "\u00A0" : ch}
          </span>
        );
      })}
    </div>
  );
};

// A line of text uncovered from left to right.
export const Reveal: React.FC<{
  delay?: number;
  children: React.ReactNode;
  style?: React.CSSProperties;
}> = ({ delay = 0, children, style }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = spring({ frame: frame - delay, fps, config: { damping: 200 } });
  return <div style={{ clipPath: `inset(0 ${(1 - p) * 100}% 0 0)`, ...style }}>{children}</div>;
};

// A colour panel that sweeps across the screen. The cut between scenes
// happens at local frame 12, when the panel covers everything.
export const Wipe: React.FC<{ color: string; delay?: number }> = ({ color, delay = 0 }) => {
  const frame = useCurrentFrame();
  const x = interpolate(frame - delay, [0, 12, 24], [-100, 0, 100], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.inOut(Easing.cubic),
  });
  return <AbsoluteFill style={{ background: color, transform: `translateX(${x}%)` }} />;
};
