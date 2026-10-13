import React from "react";
import { AbsoluteFill, Sequence } from "remotion";
import { Wipe } from "./components";
import { colors, fonts } from "./theme";
import { Intro } from "./scenes/Intro";
import { Craft } from "./scenes/Craft";
import { Project, projects } from "./scenes/Project";
import { Stack } from "./scenes/Stack";
import { Outro } from "./scenes/Outro";

// Timeline in frames at 30 fps.
const INTRO = 120;
const CRAFT = 150;
const PROJECT = 90;
const STACK = 150;
const OUTRO = 120;

const craftAt = INTRO;
const projectsAt = craftAt + CRAFT;
const stackAt = projectsAt + PROJECT * projects.length;
const outroAt = stackAt + STACK;

export const TOTAL_FRAMES = outroAt + OUTRO;

const boundaries = [
  craftAt,
  projectsAt,
  ...projects.slice(1).map((_, i) => projectsAt + PROJECT * (i + 1)),
  stackAt,
  outroAt,
];

export const Portfolio: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: colors.ink, fontFamily: fonts.body }}>
      <Sequence from={0} durationInFrames={INTRO}>
        <Intro />
      </Sequence>
      <Sequence from={craftAt} durationInFrames={CRAFT}>
        <Craft />
      </Sequence>
      {projects.map((p, i) => (
        <Sequence key={p.name} from={projectsAt + PROJECT * i} durationInFrames={PROJECT}>
          <Project {...p} />
        </Sequence>
      ))}
      <Sequence from={stackAt} durationInFrames={STACK}>
        <Stack />
      </Sequence>
      <Sequence from={outroAt} durationInFrames={OUTRO}>
        <Outro />
      </Sequence>

      {/* Transitions sit on top, centred on each scene boundary. */}
      {boundaries.map((t) => (
        <Sequence key={t} from={t - 12} durationInFrames={30}>
          <Wipe color={colors.sun} />
          <Wipe color={colors.ink} delay={4} />
        </Sequence>
      ))}
    </AbsoluteFill>
  );
};
