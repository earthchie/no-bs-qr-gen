export type InputMode = "text" | "vcard" | "mecard" | "wifi" | "crypto"

export type ErrorCorrectionLevel = "L" | "M" | "Q" | "H"

export type DotStyle = "square" | "rounded" | "dots"

export type ColorTheme = {
  name: string
  type: "solid" | "gradient"
  color1: string
  color2?: string
  angle?: number
}

export type QRConfig = {
  width: number
  height: number
  backgroundColor: string
  backgroundTransparent: boolean
  theme: ColorTheme
  errorCorrectionLevel: ErrorCorrectionLevel
  quietZone: number
  dotStyle: DotStyle
  logo?: {
    file: File
    size: number
    backgroundShape: "none" | "circle" | "rounded"
    whiteKnockout: boolean
  }
}

export type CryptoType = "bitcoin" | "ethereum" | "lightning"

export type WifiEncryption = "WPA" | "WPA2" | "WEP" | "nopass"
