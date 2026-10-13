import React from "react";
import { Composition } from "remotion";
import { Portfolio, TOTAL_FRAMES } from "./Portfolio";

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="Portfolio"
      component={Portfolio}
      durationInFrames={TOTAL_FRAMES}
      fps={30}
      width={1920}
      height={1080}
    />
  );
};
