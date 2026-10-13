import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { Word } from "../components";
import { clamp, colors, fonts } from "../theme";

export const Outro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const pill = spring({ frame: frame - 44, fps, config: { damping: 12 } });
  const sign = interpolate(frame, [64, 84], [0, 1], clamp);

  return (
    <AbsoluteFill
      style={{
        background: colors.blue,
        color: colors.paper,
        justifyContent: "center",
        paddingLeft: 140,
      }}
    >
      <div
        style={{
          fontFamily: fonts.display,
          fontWeight: 800,
          fontSize: 190,
          lineHeight: 0.95,
          letterSpacing: "-0.04em",
        }}
      >
        <Word text="Let's build" delay={2} stagger={2} />
        <Word text="something good." delay={14} stagger={2} />
      </div>

      <div
        style={{
          marginTop: 48,
          alignSelf: "flex-start",
          background: colors.sun,
          color: colors.ink,
          fontFamily: fonts.display,
          fontWeight: 800,
          fontSize: 60,
          padding: "16px 44px",
          borderRadius: 999,
          transform: `scale(${pill})`,
          transformOrigin: "left center",
        }}
      >
        shenixo.vercel.app
      </div>

      <div
        style={{
          marginTop: 32,
          fontFamily: fonts.body,
          fontSize: 36,
          color: colors.mist,
          opacity: sign,
        }}
      >
        Olaseni Disu, senior frontend engineer
      </div>
    </AbsoluteFill>
  );
};
