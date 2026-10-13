import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { Word } from "../components";
import { clamp, colors, fonts } from "../theme";

export const Intro: React.FC = () => {
  const frame = useCurrentFrame();
  const bar = interpolate(frame, [40, 70], [0, 240], clamp);
  const sub = interpolate(frame, [50, 72], [0, 1], clamp);
  const sub2 = interpolate(frame, [62, 84], [0, 1], clamp);

  return (
    <AbsoluteFill
      style={{
        background: colors.blue,
        justifyContent: "center",
        paddingLeft: 140,
        color: colors.paper,
      }}
    >
      <div
        style={{
          fontFamily: fonts.display,
          fontWeight: 800,
          fontSize: 300,
          lineHeight: 0.9,
          letterSpacing: "-0.04em",
        }}
      >
        <Word text="Olaseni" delay={4} />
        <Word text="Disu" delay={14} />
      </div>

      <div style={{ height: 10, width: bar, background: colors.sun, margin: "36px 0 32px" }} />

      <div
        style={{
          fontFamily: fonts.body,
          fontWeight: 600,
          fontSize: 56,
          opacity: sub,
          transform: `translateX(${(1 - sub) * -30}px)`,
        }}
      >
        Senior frontend engineer
      </div>
      <div
        style={{
          fontFamily: fonts.body,
          fontSize: 38,
          marginTop: 10,
          color: colors.mist,
          opacity: sub2,
          transform: `translateX(${(1 - sub2) * -30}px)`,
        }}
      >
        React, Next.js and the systems behind them.
      </div>
    </AbsoluteFill>
  );
};
