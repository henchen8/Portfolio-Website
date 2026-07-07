import type { StaticImageData } from "next/image";

// Rubik's Cube
import rubiksHero from "@/assets/rubiks/hero.jpeg";
import rubiksDrawing from "@/assets/rubiks/drawing.png";
import rubiksGui from "@/assets/rubiks/gui.png";
import rubiksTmc from "@/assets/rubiks/tmc.png";
import rubiksNema from "@/assets/rubiks/nema.png";
import rubiksArduino from "@/assets/rubiks/arduino.png";

// Financial Derivatives
import derivHero from "@/assets/derivatives/hero.png";
import derivCard from "@/assets/derivatives/card.png";
import derivFamafrench from "@/assets/derivatives/famafrench.png";
import derivSimplifiedBs from "@/assets/derivatives/simplified-bs.png";
import derivFreeBoundary from "@/assets/derivatives/free-boundary.png";

// FitBox
import fitboxLogo from "@/assets/fitbox/logo.png";
import fitboxExplosion from "@/assets/fitbox/explosion.png";

export type ImageRegistry = Record<string, Record<string, StaticImageData>>;

export const projectImages: ImageRegistry = {
  "rubiks-cube": {
    hero: rubiksHero,
    card: rubiksHero,
    drawing: rubiksDrawing,
    gui: rubiksGui,
    tmc: rubiksTmc,
    nema: rubiksNema,
    arduino: rubiksArduino,
  },
  "financial-derivatives": {
    hero: derivHero,
    card: derivCard,
    famafrench: derivFamafrench,
    "simplified-bs": derivSimplifiedBs,
    "free-boundary": derivFreeBoundary,
  },
  fitbox: {
    hero: fitboxLogo,
    card: fitboxLogo,
    logo: fitboxLogo,
    explosion: fitboxExplosion,
  },
};

export function getImage(slug: string, key: string): StaticImageData | undefined {
  return projectImages[slug]?.[key];
}
