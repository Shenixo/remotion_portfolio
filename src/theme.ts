import { loadFont as loadDisplay } from "@remotion/google-fonts/BricolageGrotesque";
import { loadFont as loadBody } from "@remotion/google-fonts/InstrumentSans";

const display = loadDisplay("normal", { weights: ["600", "800"], subsets: ["latin"] });
const body = loadBody("normal", { weights: ["400", "600"], subsets: ["latin"] });

export const fonts = {
  display: display.fontFamily,
  body: body.fontFamily,
};

export const colors = {
  blue: "#2438E8",
  ink: "#0B1030",
  paper: "#F6F7FC",
  sun: "#FFD23F",
  coral: "#FF6B57",
  mist: "#C9D0F5",
  tint: "#EEF1FF",
};

export const clamp = {
  extrapolateLeft: "clamp",
  extrapolateRight: "clamp",
} as const;
