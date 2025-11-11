"use client"

import { useState, useEffect } from "react"
import { buildWifiPayload } from "../lib/buildPayload"
import type { WifiEncryption } from "../lib/types"
import { AlertCircle } from "lucide-react"

type Props = {
  onPayloadChange: (payload: string) => void
  addToast: (message: string, type: "success" | "error") => void
}

export default function ModeWifi({ onPayloadChange, addToast }: Props) {
  const [data, setData] = useState({
    ssid: "MyWiFi",
    password: "password123",
    encryption: "WPA2" as WifiEncryption,
    hidden: false,
  })

  const [warning, setWarning] = useState("")

  useEffect(() => {
    // Validate: warn if encryption selected but no password
    if (data.encryption !== "nopass" && !data.password) {
      setWarning("Password required for secured network")
    } else {
      setWarning("")
    }

    const payload = buildWifiPayload(data)
    onPayloadChange(payload)
  }, [data, onPayloadChange])

  const updateField = <K extends keyof typeof data>(field: K, value: (typeof data)[K]) => {
    setData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">Network Name (SSID)</label>
        <input
          type="text"
          value={data.ssid}
          onChange={(e) => updateField("ssid", e.target.value)}
          placeholder="MyWiFi"
          className="w-full px-3 py-2 border border-border rounded-lg bg-surface"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Encryption</label>
        <select
          value={data.encryption}
          onChange={(e) => updateField("encryption", e.target.value as WifiEncryption)}
          className="w-full px-3 py-2 border border-border rounded-lg bg-surface"
        >
          <option value="WPA">WPA</option>
          <option value="WPA2">WPA2</option>
          <option value="WEP">WEP</option>
          <option value="nopass">None (Open)</option>
        </select>
      </div>

      {data.encryption !== "nopass" && (
        <div>
          <label className="block text-sm font-medium mb-1">Password</label>
          <input
            type="text"
            value={data.password}
            onChange={(e) => updateField("password", e.target.value)}
            placeholder="password123"
            className="w-full px-3 py-2 border border-border rounded-lg bg-surface"
          />
        </div>
      )}

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="hidden"
          checked={data.hidden}
          onChange={(e) => updateField("hidden", e.target.checked)}
          className="w-4 h-4 rounded border-border"
        />
        <label htmlFor="hidden" className="text-sm">
          Hidden Network
        </label>
      </div>

      {warning && (
        <div className="flex items-start gap-2 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-300 dark:border-yellow-700 rounded-lg p-3">
          <AlertCircle className="w-4 h-4 text-yellow-600 dark:text-yellow-400 mt-0.5 flex-shrink-0" />
          <span className="text-sm text-yellow-800 dark:text-yellow-200">{warning}</span>
        </div>
      )}

      <div className="bg-surface-hover border border-border rounded-lg p-3">
        <div className="text-xs font-medium text-foreground mb-1">Wi-Fi String Preview</div>
        <pre className="text-xs font-mono whitespace-pre-wrap break-all text-foreground/80">
          {buildWifiPayload(data)}
        </pre>
      </div>
    </div>
  )
}
