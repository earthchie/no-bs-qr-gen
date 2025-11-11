"use client"

import { useState, useEffect } from "react"
import { buildMeCardPayload } from "../lib/buildPayload"

type Props = {
  onPayloadChange: (payload: string) => void
}

export default function ModeMeCard({ onPayloadChange }: Props) {
  const [data, setData] = useState({
    name: "John Doe",
    phone: "+66123456789",
    email: "john@example.com",
    website: "https://example.com",
    address: "123 Main St",
    note: "",
  })

  useEffect(() => {
    const payload = buildMeCardPayload(data)
    onPayloadChange(payload)
  }, [data, onPayloadChange])

  const updateField = (field: keyof typeof data, value: string) => {
    setData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">Name</label>
        <input
          type="text"
          value={data.name}
          onChange={(e) => updateField("name", e.target.value)}
          className="w-full px-3 py-2 border border-border rounded-lg bg-surface"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Phone</label>
          <input
            type="tel"
            value={data.phone}
            onChange={(e) => updateField("phone", e.target.value)}
            className="w-full px-3 py-2 border border-border rounded-lg bg-surface"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            value={data.email}
            onChange={(e) => updateField("email", e.target.value)}
            className="w-full px-3 py-2 border border-border rounded-lg bg-surface"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Website</label>
        <input
          type="url"
          value={data.website}
          onChange={(e) => updateField("website", e.target.value)}
          className="w-full px-3 py-2 border border-border rounded-lg bg-surface"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Address</label>
        <input
          type="text"
          value={data.address}
          onChange={(e) => updateField("address", e.target.value)}
          className="w-full px-3 py-2 border border-border rounded-lg bg-surface"
        />
      </div>

      <div className="bg-surface-hover border border-border rounded-lg p-3">
        <div className="text-xs font-medium text-foreground mb-1">MeCard Preview</div>
        <pre className="text-xs font-mono whitespace-pre-wrap break-all text-foreground/80">
          {buildMeCardPayload(data)}
        </pre>
      </div>
    </div>
  )
}
