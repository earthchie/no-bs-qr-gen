"use client"

import { useEffect, useRef, useState } from "react"
import { Download, Copy, AlertTriangle } from "lucide-react"
import type { QRConfig } from "../lib/types"
import QrCanvas from "./QrCanvas"
import { calculateContrast } from "../lib/validate"

type Props = {
  payload: string
  config: QRConfig
  addToast: (message: string, type: "success" | "error") => void
}

export default function PreviewCard({ payload, config, addToast }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [qrInstance, setQrInstance] = useState<any>(null)
  const [lowContrast, setLowContrast] = useState(false)

  // Check contrast
  useEffect(() => {
    if (!config.backgroundTransparent) {
      const contrast = calculateContrast(config.theme.color1, config.backgroundColor)
      setLowContrast(contrast < 3)
    } else {
      setLowContrast(false)
    }
  }, [config])

  const handleDownloadPNG = async () => {
    if (!qrInstance) return
    try {
      const blob = await qrInstance.getRawData("png")
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `qr-code-${Date.now()}.png`
      a.click()
      URL.revokeObjectURL(url)
      addToast("PNG downloaded successfully", "success")
    } catch (error) {
      addToast("Failed to download PNG", "error")
    }
  }

  const handleDownloadSVG = async () => {
    if (!qrInstance) return
    try {
      const blob = await qrInstance.getRawData("svg")
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `qr-code-${Date.now()}.svg`
      a.click()
      URL.revokeObjectURL(url)
      addToast("SVG downloaded successfully", "success")
    } catch (error) {
      addToast("Failed to download SVG", "error")
    }
  }

  const handleCopyImage = async () => {
    if (!qrInstance) return
    try {
      const blob = await qrInstance.getRawData("png")
      await navigator.clipboard.write([new ClipboardItem({ "image/png": blob })])
      addToast("Image copied to clipboard", "success")
    } catch (error) {
      addToast("Failed to copy image (may not be supported)", "error")
    }
  }

  const handleCopyText = async () => {
    try {
      await navigator.clipboard.writeText(payload)
      addToast("Encoded text copied", "success")
    } catch (error) {
      addToast("Failed to copy text", "error")
    }
  }

  return (
    <div className="bg-surface border border-border rounded-lg p-6 space-y-6 sticky top-4">
      <h2 className="text-xl font-semibold">Preview</h2>

      {/* Preview Container with Checkerboard */}
      <div className="relative">
        <div className="checkerboard rounded-lg p-8 flex items-center justify-center min-h-[400px]">
          <div className="max-w-full max-h-[400px] flex items-center justify-center">
            <QrCanvas
              payload={payload || "Hello, Earth"}
              config={config}
              canvasRef={canvasRef}
              onQrInstanceReady={setQrInstance}
            />
          </div>
        </div>

        {lowContrast && (
          <div className="absolute top-2 right-2 bg-yellow-500 text-white p-2 rounded-lg shadow-lg flex items-center gap-2 text-xs">
            <AlertTriangle className="w-4 h-4" />
            <span>Low contrast warning</span>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={handleDownloadPNG}
            disabled={!qrInstance}
            className="flex items-center justify-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity cursor-pointer"
          >
            <Download className="w-4 h-4" />
            Download PNG
          </button>
          <button
            onClick={handleDownloadSVG}
            disabled={!qrInstance}
            className="flex items-center justify-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity cursor-pointer"
          >
            <Download className="w-4 h-4" />
            Download SVG
          </button>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={handleCopyImage}
            disabled={!qrInstance}
            className="flex items-center justify-center gap-2 px-4 py-2 border border-border rounded-lg hover:bg-surface-hover disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer"
          >
            <Copy className="w-4 h-4" />
            Copy Image
          </button>
          <button
            onClick={handleCopyText}
            disabled={!payload}
            className="flex items-center justify-center gap-2 px-4 py-2 border border-border rounded-lg hover:bg-surface-hover disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer"
          >
            <Copy className="w-4 h-4" />
            Copy Text
          </button>
        </div>
      </div>

      {/* Scanning Tips */}
      <div className="bg-surface-hover border border-border rounded-lg p-4">
        <h3 className="text-sm font-semibold mb-2">📱 Scanning Tips</h3>
        <ul className="text-xs text-foreground/80 space-y-1">
          <li>• Use high contrast for better scanning</li>
          <li>• Maintain adequate quiet zone (margin)</li>
          <li>• Higher error correction = more reliable</li>
          <li>• Keep logo size under 20% for best results</li>
        </ul>
      </div>
    </div>
  )
}
