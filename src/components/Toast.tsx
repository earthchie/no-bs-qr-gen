"use client"

import { useState, useEffect, useCallback } from "react"
import { X, CheckCircle2, AlertCircle } from "lucide-react"

export type ToastType = "success" | "error"

export type ToastProps = {
  id: string
  message: string
  type: ToastType
  onClose: () => void
}

export function Toast({ message, type, onClose }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose()
    }, 4000)

    return () => clearTimeout(timer)
  }, [onClose])

  return (
    <div
      className={`
        flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg border
        min-w-[300px] max-w-[400px] animate-in slide-in-from-right
        ${
          type === "success"
            ? "bg-green-50 dark:bg-green-900/20 border-green-300 dark:border-green-700"
            : "bg-red-50 dark:bg-red-900/20 border-red-300 dark:border-red-700"
        }
      `}
      role="alert"
      aria-live="polite"
    >
      {type === "success" ? (
        <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0" />
      ) : (
        <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0" />
      )}
      <span
        className={`flex-1 text-sm font-medium ${
          type === "success" ? "text-green-800 dark:text-green-200" : "text-red-800 dark:text-red-200"
        }`}
      >
        {message}
      </span>
      <button
        onClick={onClose}
        className="text-muted hover:text-foreground transition-colors"
        aria-label="Close notification"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  )
}

export function useToast() {
  const [toasts, setToasts] = useState<ToastProps[]>([])

  const addToast = useCallback((message: string, type: ToastType) => {
    const id = Math.random().toString(36).substr(2, 9)
    setToasts((prev) => [...prev, { id, message, type, onClose: () => {} }])
  }, [])

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id))
  }, [])

  return {
    toasts: toasts.map((toast) => ({ ...toast, onClose: () => removeToast(toast.id) })),
    addToast,
    removeToast,
  }
}
