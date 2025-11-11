import type { QRConfig, ColorTheme } from "./types"

export const colorThemes: ColorTheme[] = [
  { name: "Black on White", type: "solid", color1: "#000000" },
  { name: "White on Black", type: "solid", color1: "#FFFFFF" },
  { name: "Blue to Red", type: "gradient", color1: "#3B82F6", color2: "#EF4444", angle: 135 },
  { name: "Emerald to Teal", type: "gradient", color1: "#10B981", color2: "#14B8A6", angle: 135 },
  { name: "Purple to Pink", type: "gradient", color1: "#A855F7", color2: "#EC4899", angle: 135 },
  { name: "Custom", type: "gradient", color1: "#000000", color2: "#FFFFFF", angle: 135 },
]

export const defaultQRConfig: QRConfig = {
  width: 1000,
  height: 1000,
  backgroundColor: "#FFFFFF",
  backgroundTransparent: true,
  theme: colorThemes[0],
  errorCorrectionLevel: "Q",
  quietZone: 0,
  dotStyle: "square",
}
