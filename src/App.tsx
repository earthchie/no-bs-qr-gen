"use client"

import { useState } from "react"
import type { InputMode, QRConfig } from "./lib/types"
import { defaultQRConfig } from "./lib/config"
import ModeSelector from "./components/ModeSelector"
import ModeTextUrl from "./components/ModeTextUrl"
import ModeVCard from "./components/ModeVCard"
import ModeMeCard from "./components/ModeMeCard"
import ModeWifi from "./components/ModeWifi"
import ModeCrypto from "./components/ModeCrypto"
import CustomizePanel from "./components/CustomizePanel"
import PreviewCard from "./components/PreviewCard"
import { Toast, useToast } from "./components/Toast"

function App() {
  const [mode, setMode] = useState<InputMode>("text")
  const [payload, setPayload] = useState("")
  const [config, setConfig] = useState<QRConfig>(defaultQRConfig)
  const { toasts, addToast, removeToast } = useToast()

  const handleReset = () => {
    setConfig(defaultQRConfig)
    addToast("Settings reset to defaults", "success")
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-surface">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-foreground" style={{ color: "#F08" }}>No BS QR Code Generator</h1>
          <p className="text-foreground mt-1">No BS / No Ads / Just QR Codes</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Left Column - Inputs & Customization */}
          <div className="space-y-6">
            <div className="bg-surface border border-border rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Input Mode</h2>
              <ModeSelector mode={mode} onModeChange={setMode} />

              <div className="mt-6">
                {mode === "text" && <ModeTextUrl onPayloadChange={setPayload} />}
                {mode === "vcard" && <ModeVCard onPayloadChange={setPayload} />}
                {mode === "mecard" && <ModeMeCard onPayloadChange={setPayload} />}
                {mode === "wifi" && <ModeWifi onPayloadChange={setPayload} addToast={addToast} />}
                {mode === "crypto" && <ModeCrypto onPayloadChange={setPayload} addToast={addToast} />}
              </div>
            </div>

            <CustomizePanel config={config} onConfigChange={setConfig} onReset={handleReset} />
          </div>

          {/* Right Column - Preview & Actions */}
          <div>
            <PreviewCard payload={payload} config={config} addToast={addToast} />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-surface mt-16 py-8">
        <div className="container mx-auto px-4 text-center text-foreground">
          <p className="flex items-center justify-center gap-2">
            <a href="https://github.com/earthchie" target="_blank" rel="noopener noreferrer">&copy; {new Date().getFullYear()} @earthchie</a>
          </p>
        </div>
      </footer>

      {/* Toast Container */}
      <div className="fixed bottom-4 right-4 z-50 space-y-2">
        {toasts.map((toast) => (
          <Toast key={toast.id} {...toast} onClose={() => removeToast(toast.id)} />
        ))}
      </div>
    </div>
  )
}

export default App
