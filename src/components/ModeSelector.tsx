"use client"

import type { InputMode } from "../lib/types"

type Props = {
  mode: InputMode
  onModeChange: (mode: InputMode) => void
}

const modes: { value: InputMode; label: string; icon: string }[] = [
  { value: "text", label: "Text / URL", icon: "📝" },
  { value: "vcard", label: "vCard", icon: "👤" },
  { value: "mecard", label: "MeCard", icon: "💳" },
  { value: "wifi", label: "Wi-Fi", icon: "📶" },
  { value: "crypto", label: "Crypto", icon: "₿" },
]

export default function ModeSelector({ mode, onModeChange }: Props) {
  return (
    <div className="flex flex-wrap gap-2">
      {modes.map((m) => (
        <button
          key={m.value}
          onClick={() => onModeChange(m.value)}
          className={`
            px-4 py-2 rounded-lg border transition-all font-medium
            ${
              mode === m.value
                ? "bg-primary text-primary-foreground border-primary"
                : "bg-surface hover:bg-surface-hover border-border text-foreground"
            }
          `}
        >
          <span className="mr-2">{m.icon}</span>
          {m.label}
        </button>
      ))}
    </div>
  )
}
