"use client"

import type React from "react"

import { useEffect, useRef } from "react"
import QRCodeStyling from "qr-code-styling"
import type { QRConfig } from "../lib/types"

type Props = {
  payload: string
  config: QRConfig
  canvasRef: React.RefObject<HTMLCanvasElement>
  onQrInstanceReady: (instance: any) => void
}

/**
 * QrCanvas wraps qr-code-styling library
 * Re-instantiates QR when configuration changes
 */
export default function QrCanvas({ payload, config, canvasRef, onQrInstanceReady }: Props) {
  const qrCodeRef = useRef<any>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const dotsOptions: any = {
      type: config.dotStyle === "square" ? "square" : config.dotStyle === "rounded" ? "rounded" : "dots",
    }

    // Handle foreground color (solid or gradient)
    if (config.theme.type === "gradient" && config.theme.color2) {
      dotsOptions.gradient = {
        type: "linear",
        rotation: (config.theme.angle || 0) * (Math.PI / 180),
        colorStops: [
          { offset: 0, color: config.theme.color1 },
          { offset: 1, color: config.theme.color2 },
        ],
      }
    } else {
      dotsOptions.color = config.theme.color1
    }

    const qrOptions: any = {
      width: 400,
      height: 400,
      data: payload || "Hello, Earth",
      margin: config.quietZone,
      qrOptions: {
        errorCorrectionLevel: config.errorCorrectionLevel,
      },
      dotsOptions,
      backgroundOptions: {
        color: config.backgroundTransparent ? "transparent" : config.backgroundColor,
      },
    }

    let logoUrl: string | undefined = undefined
    if (config.logo) {
      logoUrl = URL.createObjectURL(config.logo.file)
      qrOptions.image = logoUrl
      qrOptions.imageOptions = {
        imageSize: config.logo.size / 100,
        margin: config.logo.whiteKnockout ? 4 : 0,
        hideBackgroundDots: config.logo.whiteKnockout,
      }
    }

    // Create new QR Code instance
    const qrCode = new QRCodeStyling(qrOptions)

    // Clear previous QR
    containerRef.current.innerHTML = ""

    // Append to container
    qrCode.append(containerRef.current)
    qrCodeRef.current = qrCode
    onQrInstanceReady(qrCode)

    return () => {
      if (logoUrl) {
        URL.revokeObjectURL(logoUrl)
      }
    }
  }, [payload, config, onQrInstanceReady])

  return <div ref={containerRef} className="flex items-center justify-center max-w-[400px] w-full" />
}
