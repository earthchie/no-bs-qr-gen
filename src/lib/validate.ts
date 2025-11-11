/**
 * Validation functions for various input formats
 */

export function validateBitcoinAddress(address: string): { valid: boolean; message?: string } {
  // Basic validation for Bitcoin addresses
  if (!address) return { valid: false, message: "Address is required" }

  // Legacy (P2PKH/P2SH): starts with 1 or 3, 26-35 chars
  const legacyPattern = /^[13][a-km-zA-HJ-NP-Z1-9]{25,34}$/
  // SegWit (Bech32): starts with bc1, lowercase
  const bech32Pattern = /^bc1[a-z0-9]{39,87}$/

  if (!legacyPattern.test(address) && !bech32Pattern.test(address)) {
    return { valid: false, message: "Invalid Bitcoin address format" }
  }

  return { valid: true }
}

export function validateEthereumAddress(address: string): { valid: boolean; message?: string } {
  if (!address) return { valid: false, message: "Address is required" }

  // Must start with 0x and be 42 chars (0x + 40 hex chars)
  const pattern = /^0x[a-fA-F0-9]{40}$/

  if (!pattern.test(address)) {
    return { valid: false, message: "Invalid Ethereum address (must be 0x + 40 hex chars)" }
  }

  return { valid: true }
}

export function validateEmail(email: string): boolean {
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return pattern.test(email)
}

export function validateUrl(url: string): boolean {
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}

export function calculateContrast(color1: string, color2: string): number {
  // Simple contrast calculation
  const getLuminance = (color: string) => {
    const hex = color.replace("#", "")
    const r = Number.parseInt(hex.substr(0, 2), 16) / 255
    const g = Number.parseInt(hex.substr(2, 2), 16) / 255
    const b = Number.parseInt(hex.substr(4, 2), 16) / 255

    const rsRGB = r <= 0.03928 ? r / 12.92 : Math.pow((r + 0.055) / 1.055, 2.4)
    const gsRGB = g <= 0.03928 ? g / 12.92 : Math.pow((g + 0.055) / 1.055, 2.4)
    const bsRGB = b <= 0.03928 ? b / 12.92 : Math.pow((b + 0.055) / 1.055, 2.4)

    return 0.2126 * rsRGB + 0.7152 * gsRGB + 0.0722 * bsRGB
  }

  const l1 = getLuminance(color1)
  const l2 = getLuminance(color2)
  const lighter = Math.max(l1, l2)
  const darker = Math.min(l1, l2)

  return (lighter + 0.05) / (darker + 0.05)
}
