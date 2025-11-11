"use client"

import { useState, useEffect } from "react"

type Props = {
  onPayloadChange: (payload: string) => void
}

export default function ModeTextUrl({ onPayloadChange }: Props) {
  const [text, setText] = useState("")

  useEffect(() => {
    onPayloadChange(text)
  }, [text, onPayloadChange])

  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="text-input" className="block text-sm font-medium mb-2">
          Text or URL
        </label>
        <textarea
          id="text-input"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter Text or URL..."
          rows={4}
          className="w-full px-3 py-2 border border-border rounded-lg bg-surface focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      <div className="bg-surface-hover border border-border rounded-lg p-3">
        <div className="text-xs font-medium text-foreground mb-1">Encoded String Preview</div>
        <div className="text-sm font-mono break-all">{text || "(empty)"}</div>
      </div>
    </div>
  )
}
