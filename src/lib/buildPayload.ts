export function buildVCardPayload(data: {
  firstName: string
  lastName: string
  organization?: string
  title?: string
  phone?: string
  email?: string
  website?: string
  address?: string
  note?: string
}): string {
  const lines = ["BEGIN:VCARD", "VERSION:3.0"]

  if (data.firstName || data.lastName) {
    lines.push(`FN:${data.firstName} ${data.lastName}`.trim())
    lines.push(`N:${data.lastName};${data.firstName};;;`)
  }

  if (data.organization) lines.push(`ORG:${data.organization}`)
  if (data.title) lines.push(`TITLE:${data.title}`)
  if (data.phone) lines.push(`TEL:${data.phone}`)
  if (data.email) lines.push(`EMAIL:${data.email}`)
  if (data.website) lines.push(`URL:${data.website}`)
  if (data.address) lines.push(`ADR:;;${data.address};;;;`)
  if (data.note) lines.push(`NOTE:${data.note}`)

  lines.push("END:VCARD")
  return lines.join("\n")
}

export function buildMeCardPayload(data: {
  name?: string
  phone?: string
  email?: string
  website?: string
  address?: string
  note?: string
}): string {
  const parts: string[] = ["MECARD:"]

  if (data.name) parts.push(`N:${data.name}`)
  if (data.phone) parts.push(`TEL:${data.phone}`)
  if (data.email) parts.push(`EMAIL:${data.email}`)
  if (data.website) parts.push(`URL:${data.website}`)
  if (data.address) parts.push(`ADR:${data.address}`)
  if (data.note) parts.push(`NOTE:${data.note}`)

  parts.push(";")
  return parts.join(";").replace(";;", ";")
}

export function buildWifiPayload(data: {
  ssid: string
  password?: string
  encryption: "WPA" | "WPA2" | "WEP" | "nopass"
  hidden?: boolean
}): string {
  const authType = data.encryption === "nopass" ? "nopass" : data.encryption
  const password = data.password || ""
  const hidden = data.hidden ? "true" : "false"

  return `WIFI:T:${authType};S:${escapeWifiString(data.ssid)};P:${escapeWifiString(password)};H:${hidden};;`
}

function escapeWifiString(str: string): string {
  return str.replace(/[\\;,:]/g, "\\$&")
}

export function buildCryptoPayload(
  type: "bitcoin" | "ethereum" | "lightning",
  address: string,
  amount?: string,
  chainId?: string,
  erc20?: { tokenContract: string; recipientAddress: string },
): string {
  switch (type) {
    case "bitcoin":
      return amount ? `bitcoin:${address}?amount=${amount}` : `bitcoin:${address}`
    case "ethereum":
      const chain = chainId || "1"

      // ERC-20 token transfer using EIP-681 format
      if (erc20 && erc20.tokenContract && erc20.recipientAddress) {
        // Format: ethereum:<token_contract>@<chain_id>/transfer?address=<recipient>&uint256=<amount>
        const params = new URLSearchParams()
        params.append("address", erc20.recipientAddress)
        if (amount) {
          params.append("uint256", amount)
        }
        return `ethereum:${erc20.tokenContract}@${chain}/transfer?${params.toString()}`
      }

      // Standard ETH transfer
      return amount ? `ethereum:${address}@${chain}?value=${amount}` : `ethereum:${address}@${chain}`
    case "lightning":
      return `lightning:${address}`
    default:
      return address
  }
}
