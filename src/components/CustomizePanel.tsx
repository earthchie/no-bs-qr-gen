"use client"

import type React from "react"

import { useState } from "react"
import type { QRConfig, ErrorCorrectionLevel, DotStyle } from "../lib/types"
import { colorThemes } from "../lib/config"
import { Upload, X } from "lucide-react"

type Props = {
  config: QRConfig
  onConfigChange: (config: QRConfig) => void
  onReset: () => void
}

export default function CustomizePanel({ config, onConfigChange, onReset }: Props) {
  const [customColor1, setCustomColor1] = useState("#000000")
  const [customColor2, setCustomColor2] = useState("#FFFFFF")
  const [customAngle, setCustomAngle] = useState(135)

  const updateConfig = <K extends keyof QRConfig>(key: K, value: QRConfig[K]) => {
    onConfigChange({ ...config, [key]: value })
  }

  const handleThemeChange = (themeName: string) => {
    const theme = colorThemes.find((t) => t.name === themeName)
    if (theme) {
      if (theme.name === "Custom") {
        updateConfig("theme", {
          ...theme,
          type: "gradient",
          color1: customColor1,
          color2: customColor2,
          angle: customAngle,
        })
      } else {
        updateConfig("theme", theme)
      }
    }
  }

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file && (file.type === "image/png" || file.type === "image/svg+xml")) {
      updateConfig("logo", {
        file,
        size: config.logo?.size || 18,
        backgroundShape: config.logo?.backgroundShape || "none",
        whiteKnockout: config.logo?.whiteKnockout || false,
      })
    }
  }

  const handleRemoveLogo = () => {
    updateConfig("logo", undefined)
  }

  return (
    <div className="bg-surface border border-border rounded-lg p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Customization</h2>
        <button onClick={onReset} className="text-sm text-primary hover:underline cursor-pointer">
          Reset to Defaults
        </button>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Resolution (px)</label>
        <input
          type="number"
          value={config.width}
          onChange={(e) => {
            const size = Math.max(256, Math.min(4096, Number.parseInt(e.target.value) || 1000))
            onConfigChange({ ...config, width: size, height: size })
          }}
          min="256"
          max="4096"
          className="w-full px-3 py-2 border border-border rounded-lg bg-surface"
        />
        <div className="text-xs text-foreground/70 mt-1">Square size (256-4096)</div>
      </div>

      {/* Background */}
      <div>
        <label className="block text-sm font-medium mb-2">Background</label>
        <div className="flex items-center gap-3">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={config.backgroundTransparent}
              onChange={(e) => updateConfig("backgroundTransparent", e.target.checked)}
              className="w-4 h-4 rounded"
            />
            <span className="text-sm">Transparent</span>
          </label>
          {!config.backgroundTransparent && (
            <input
              type="color"
              value={config.backgroundColor}
              onChange={(e) => updateConfig("backgroundColor", e.target.value)}
              className="w-12 h-9 border border-border rounded-lg cursor-pointer"
            />
          )}
        </div>
      </div>

      {/* Theme Presets */}
      <div>
        <label className="block text-sm font-medium mb-2">Foreground Theme</label>
        <div className="grid grid-cols-2 gap-2">
          {colorThemes.map((theme) => (
            <button
              key={theme.name}
              onClick={() => handleThemeChange(theme.name)}
              className={`px-3 py-2 rounded-lg border text-sm cursor-pointer transition-all ${
                config.theme.name === theme.name
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-surface hover:bg-surface-hover border-border"
              }`}
            >
              {theme.name}
            </button>
          ))}
        </div>

        {config.theme.name === "Custom" && (
          <div className="mt-4 space-y-4 p-4 bg-surface-hover rounded-lg border border-border">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium">Color 1</label>
                <div className="relative">
                  <input
                    type="color"
                    value={customColor1}
                    onChange={(e) => {
                      setCustomColor1(e.target.value)
                      updateConfig("theme", { ...config.theme, type: "gradient", color1: e.target.value })
                    }}
                    className="w-full h-12 border border-border rounded-lg cursor-pointer"
                  />
                  <div className="mt-2 text-xs text-foreground/70 font-mono text-center">{customColor1}</div>
                </div>
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium">Color 2</label>
                <div className="relative">
                  <input
                    type="color"
                    value={customColor2}
                    onChange={(e) => {
                      setCustomColor2(e.target.value)
                      updateConfig("theme", { ...config.theme, type: "gradient", color2: e.target.value })
                    }}
                    className="w-full h-12 border border-border rounded-lg cursor-pointer"
                  />
                  <div className="mt-2 text-xs text-foreground/70 font-mono text-center">{customColor2}</div>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">Gradient Angle</label>
                <span className="text-sm font-mono text-foreground/80 bg-surface px-2 py-1 rounded border border-border">
                  {customAngle}°
                </span>
              </div>
              <input
                type="range"
                value={customAngle}
                onChange={(e) => {
                  setCustomAngle(Number.parseInt(e.target.value))
                  updateConfig("theme", { ...config.theme, type: "gradient", angle: Number.parseInt(e.target.value) })
                }}
                min="0"
                max="360"
                className="w-full"
              />
              <div className="flex justify-between text-xs text-foreground/50">
                <span>0°</span>
                <span>90°</span>
                <span>180°</span>
                <span>270°</span>
                <span>360°</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Error Correction */}
      <div>
        <label className="block text-sm font-medium mb-2">Error Correction</label>
        <div className="grid grid-cols-4 gap-2">
          {(["L", "M", "Q", "H"] as ErrorCorrectionLevel[]).map((level) => (
            <button
              key={level}
              onClick={() => updateConfig("errorCorrectionLevel", level)}
              className={`px-3 py-2 rounded-lg border text-sm cursor-pointer ${
                config.errorCorrectionLevel === level
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-surface hover:bg-surface-hover border-border"
              }`}
            >
              {level}
            </button>
          ))}
        </div>
        <div className="text-xs text-foreground/70 mt-1">Higher = more error tolerance, larger QR</div>
      </div>

      {/* Quiet Zone */}
      <div>
        <label className="block text-sm font-medium mb-2">Quiet Zone (Margin): {config.quietZone}px</label>
        <input
          type="range"
          value={config.quietZone}
          onChange={(e) => updateConfig("quietZone", Number.parseInt(e.target.value))}
          min="0"
          max="64"
          className="w-full"
        />
      </div>

      {/* Dot Style */}
      <div>
        <label className="block text-sm font-medium mb-2">Dot Style</label>
        <div className="grid grid-cols-3 gap-2">
          {(["square", "rounded", "dots"] as DotStyle[]).map((style) => (
            <button
              key={style}
              onClick={() => updateConfig("dotStyle", style)}
              className={`px-3 py-2 rounded-lg border text-sm capitalize cursor-pointer ${
                config.dotStyle === style
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-surface hover:bg-surface-hover border-border"
              }`}
            >
              {style}
            </button>
          ))}
        </div>
      </div>

      {/* Logo Upload */}
      <div>
        <label className="block text-sm font-medium mb-2">Logo Upload</label>
        <label className="flex items-center justify-center gap-2 px-4 py-3 border-2 border-dashed border-border rounded-lg cursor-pointer hover:bg-surface-hover transition-colors">
          <Upload className="w-5 h-5 text-foreground" />
          <span className="text-sm">{config.logo ? config.logo.file.name : "Upload PNG or SVG"}</span>
          <input type="file" accept="image/png,image/svg+xml" onChange={handleLogoUpload} className="hidden" />
        </label>

        {config.logo && (
          <div className="mt-3 space-y-3 p-3 bg-surface-hover rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-foreground">Logo Settings</span>
              <button
                onClick={handleRemoveLogo}
                className="flex items-center gap-1 px-2 py-1 text-xs text-red-600 bg-red-50 hover:bg-red-100 dark:bg-red-950/50 dark:hover:bg-red-950 border border-red-200 dark:border-red-900 rounded transition-colors cursor-pointer"
                title="Remove logo"
              >
                <X className="w-3 h-3" />
                Remove
              </button>
            </div>

            <div>
              <label className="block text-xs text-foreground/70 mb-1">Logo Size: {config.logo.size}%</label>
              <input
                type="range"
                value={config.logo.size}
                onChange={(e) => updateConfig("logo", { ...config.logo!, size: Number.parseInt(e.target.value) })}
                min="5"
                max="30"
                className="w-full"
              />
            </div>

            <div>
              <label className="block text-xs text-foreground/70 mb-1">Background Shape</label>
              <div className="flex gap-2">
                {(["none", "circle", "rounded"] as const).map((shape) => (
                  <button
                    key={shape}
                    onClick={() => updateConfig("logo", { ...config.logo!, backgroundShape: shape })}
                    className={`flex-1 px-2 py-1 rounded border text-xs cursor-pointer capitalize ${
                      config.logo!.backgroundShape === shape
                        ? "bg-primary text-primary-foreground border-primary"
                        : "bg-surface border-border"
                    }`}
                  >
                    {shape}
                  </button>
                ))}
              </div>
            </div>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={config.logo.whiteKnockout}
                onChange={(e) => updateConfig("logo", { ...config.logo!, whiteKnockout: e.target.checked })}
                className="w-3 h-3 rounded"
              />
              <span className="text-xs">White knockout behind logo</span>
            </label>
          </div>
        )}
      </div>
    </div>
  )
}
