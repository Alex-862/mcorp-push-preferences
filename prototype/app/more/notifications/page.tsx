'use client'

import { useState, useEffect, useCallback } from 'react'
import PageHeader from '@/components/PageHeader'
import Toggle from '@/components/Toggle'

const CATEGORIES = [
  {
    id: 'account' as const,
    name: 'Account Activity',
    description: 'Transaction updates, payment confirmations, and account status changes.',
  },
  {
    id: 'security' as const,
    name: 'Security & Verification',
    description: 'Unusual activity alerts, transaction approvals, and authentication messages.',
  },
  {
    id: 'marketing' as const,
    name: 'Marketing & Promotions',
    description: 'Product offers, campaign messaging, and engagement prompts.',
  },
]

type CategoryId = 'account' | 'security' | 'marketing'
type Preferences = Record<CategoryId, boolean>

const DEFAULT_PREFS: Preferences = { account: true, security: true, marketing: false }
const PREFS_KEY = 'mcorp_notification_prefs'
const DEVICE_KEY = 'mcorp_device_notifications_disabled'

function loadPrefs(): Preferences {
  try {
    const stored = localStorage.getItem(PREFS_KEY)
    if (stored) return { ...DEFAULT_PREFS, ...JSON.parse(stored) }
  } catch {}
  return { ...DEFAULT_PREFS }
}

function savePrefs(prefs: Preferences) {
  try {
    localStorage.setItem(PREFS_KEY, JSON.stringify(prefs))
  } catch {}
}

export default function NotificationsPage() {
  const [prefs, setPrefs] = useState<Preferences>(DEFAULT_PREFS)
  const [loadingId, setLoadingId] = useState<CategoryId | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [deviceDisabled, setDeviceDisabled] = useState(false)
  const [simulateErrors, setSimulateErrors] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setPrefs(loadPrefs())
    setDeviceDisabled(localStorage.getItem(DEVICE_KEY) === 'true')
    setMounted(true)
  }, [])

  const handleToggle = useCallback(
    async (categoryId: CategoryId, newValue: boolean) => {
      if (loadingId) return

      const previousPrefs = prefs
      const updatedPrefs: Preferences = { ...prefs, [categoryId]: newValue }

      setPrefs(updatedPrefs)
      setLoadingId(categoryId)
      setError(null)

      await new Promise((r) => setTimeout(r, 500))

      if (simulateErrors) {
        setPrefs(previousPrefs)
        setError('Unable to update preference. Please try again.')
      } else {
        savePrefs(updatedPrefs)
      }

      setLoadingId(null)
    },
    [prefs, loadingId, simulateErrors]
  )

  const handleDeviceToggle = (disabled: boolean) => {
    setDeviceDisabled(disabled)
    try {
      localStorage.setItem(DEVICE_KEY, String(disabled))
    } catch {}
  }

  if (!mounted) return null

  return (
    <div>
      <PageHeader title="Notifications" backHref="/more" />

      <div className="px-4 py-4 space-y-4">

        {deviceDisabled && (
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
            <p className="text-sm font-semibold text-amber-800 mb-0.5">Push notifications are off</p>
            <p className="text-xs text-amber-700 leading-snug">
              Notifications are disabled on this device. Enable them in your device settings to receive any push notifications.
            </p>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4">
            <p className="text-sm font-semibold text-red-800 mb-0.5">Update failed</p>
            <p className="text-xs text-red-700">{error}</p>
          </div>
        )}

        <div className="bg-white rounded-xl divide-y divide-gray-100">
          {CATEGORIES.map((cat) => (
            <div key={cat.id} className="flex items-center gap-4 px-4 py-4">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-900">{cat.name}</p>
                <p className="text-xs text-gray-500 mt-0.5 leading-snug">{cat.description}</p>
              </div>
              <Toggle
                enabled={prefs[cat.id]}
                onChange={(val) => handleToggle(cat.id, val)}
                disabled={loadingId !== null || deviceDisabled}
                loading={loadingId === cat.id}
              />
            </div>
          ))}
        </div>

        <p className="text-xs text-gray-400 px-1 leading-snug">
          Changes take effect immediately. Turning off a category stops all notifications in that group. Notification categories may contain multiple notification types that cannot be individually managed.
        </p>

        <div className="border border-dashed border-gray-300 rounded-xl p-4 space-y-3">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Prototype controls</p>

          <label className="flex items-center justify-between cursor-pointer">
            <span className="text-sm text-gray-600">Simulate device notifications off</span>
            <input
              type="checkbox"
              checked={deviceDisabled}
              onChange={(e) => handleDeviceToggle(e.target.checked)}
              className="h-4 w-4 accent-blue-700"
            />
          </label>

          <label className="flex items-center justify-between cursor-pointer">
            <span className="text-sm text-gray-600">Simulate API error on update</span>
            <input
              type="checkbox"
              checked={simulateErrors}
              onChange={(e) => setSimulateErrors(e.target.checked)}
              className="h-4 w-4 accent-blue-700"
            />
          </label>
        </div>

      </div>
    </div>
  )
}
