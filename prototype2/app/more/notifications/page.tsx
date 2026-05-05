'use client'

import { useState, useEffect, useCallback } from 'react'
import PageHeader from '@/components/PageHeader'
import Toggle from '@/components/Toggle'

type CategoryId = 'account' | 'security' | 'marketing'
type Preferences = Record<CategoryId, boolean>

const CATEGORIES = [
  {
    id: 'account' as CategoryId,
    name: 'Account Activity',
    description: 'Includes transaction updates, payment confirmations, and account status changes.',
    examples: [
      'Your payment of £120.00 to BT has been confirmed.',
      'Your direct debit of £850.00 has been processed.',
    ],
    impact: 'You will no longer receive transaction confirmations, payment updates, or account status alerts.',
    securityWarning: false,
  },
  {
    id: 'security' as CategoryId,
    name: 'Security & Verification',
    description: 'Includes unusual activity alerts, transaction approval requests, and authentication messages.',
    examples: [
      'Unusual sign-in detected on your account. Tap to review.',
      'Please approve your payment of £500.00 to J. Smith.',
    ],
    impact: 'You will no longer receive security alerts, approval requests, or authentication messages.',
    securityWarning: true,
  },
  {
    id: 'marketing' as CategoryId,
    name: 'Marketing & Promotions',
    description: 'Includes product offers, campaign messaging, and engagement updates from MATTHEWS CORP.',
    examples: [
      'You could save £200 on your energy bills — find out how.',
      'Your MATTHEWS CORP Rewards points are ready to use.',
    ],
    impact: 'You will no longer receive product offers, promotional messages, or engagement updates.',
    securityWarning: false,
  },
]

const DEFAULT_PREFS: Preferences = { account: true, security: true, marketing: false }
const PREFS_KEY = 'mcorp2_notification_prefs'
const DEVICE_KEY = 'mcorp2_device_notifications_disabled'

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
  const [pendingDisable, setPendingDisable] = useState<CategoryId | null>(null)
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

  const applyUpdate = useCallback(
    async (categoryId: CategoryId, newValue: boolean, previousPrefs: Preferences) => {
      const updatedPrefs: Preferences = { ...previousPrefs, [categoryId]: newValue }
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
    [simulateErrors]
  )

  const handleToggleTap = (categoryId: CategoryId) => {
    if (loadingId || deviceDisabled) return
    setError(null)

    if (prefs[categoryId]) {
      // Disabling — show inline confirmation first, do not save yet
      setPendingDisable(categoryId)
    } else {
      // Enabling — no confirmation needed, update immediately
      setPendingDisable(null)
      void applyUpdate(categoryId, true, prefs)
    }
  }

  const handleConfirmDisable = useCallback(() => {
    if (!pendingDisable) return
    const categoryId = pendingDisable
    const snapshot = prefs
    setPendingDisable(null)
    void applyUpdate(categoryId, false, snapshot)
  }, [pendingDisable, prefs, applyUpdate])

  const handleCancelDisable = () => {
    setPendingDisable(null)
  }

  const handleDeviceToggle = (disabled: boolean) => {
    setDeviceDisabled(disabled)
    setPendingDisable(null)
    try {
      localStorage.setItem(DEVICE_KEY, String(disabled))
    } catch {}
  }

  if (!mounted) return null

  const interactionBlocked = loadingId !== null || deviceDisabled || pendingDisable !== null

  return (
    <div>
      <PageHeader title="Notifications" backHref="/more" />

      <div className="px-4 py-4 space-y-4">

        {/* Device-level disabled banner */}
        {deviceDisabled && (
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
            <p className="text-sm font-semibold text-amber-800 mb-0.5">Push notifications are off</p>
            <p className="text-xs text-amber-700 leading-snug">
              Notifications are disabled on this device. Enable them in your device settings to receive any push notifications.
            </p>
          </div>
        )}

        {/* Preference update error */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4">
            <p className="text-sm font-semibold text-red-800 mb-0.5">Update failed</p>
            <p className="text-xs text-red-700">{error}</p>
          </div>
        )}

        {/* Category list */}
        <div className="bg-white rounded-xl divide-y divide-gray-100">
          {CATEGORIES.map((cat) => {
            const isPending = pendingDisable === cat.id
            const isLoading = loadingId === cat.id

            return (
              <div key={cat.id} className="px-4 py-4">

                {/* Category header row */}
                <div className="flex items-start gap-4">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-900">{cat.name}</p>
                    <p className="text-xs text-gray-500 mt-0.5 leading-snug">{cat.description}</p>
                  </div>
                  <Toggle
                    enabled={prefs[cat.id]}
                    onChange={() => handleToggleTap(cat.id)}
                    disabled={interactionBlocked && !isPending}
                    loading={isLoading}
                  />
                </div>

                {/* Illustrative examples — always visible, read-only */}
                <div className="mt-3">
                  <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide mb-1.5">
                    Example notifications
                  </p>
                  <div className="space-y-1.5">
                    {cat.examples.map((example, i) => (
                      <div key={i} className="flex items-start gap-2 bg-gray-50 rounded-lg px-3 py-2">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-3.5 h-3.5 text-gray-400 flex-shrink-0 mt-0.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
                        </svg>
                        <p className="text-xs text-gray-500 leading-snug">{example}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Inline disable confirmation — shown only for the pending category */}
                {isPending && (
                  <div className="mt-4 space-y-3">

                    {/* Standard impact message */}
                    <div className="bg-gray-50 border border-gray-200 rounded-xl p-3">
                      <p className="text-xs text-gray-700 leading-snug">{cat.impact}</p>
                    </div>

                    {/* Security & Verification additional warning — visually distinct */}
                    {cat.securityWarning && (
                      <div className="bg-amber-50 border border-amber-300 rounded-xl p-3">
                        <div className="flex items-start gap-2">
                          <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5">
                            <path fillRule="evenodd" d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75Zm0 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" clipRule="evenodd" />
                          </svg>
                          <div>
                            <p className="text-xs font-semibold text-amber-800 mb-0.5">Important security notice</p>
                            <p className="text-xs text-amber-700 leading-snug">
                              Turning off Security &amp; Verification notifications may mean you miss critical fraud alerts, unusual activity warnings, and authentication requests needed to access your account.
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Confirm / Cancel actions */}
                    <div className="flex gap-2">
                      <button
                        onClick={handleCancelDisable}
                        className="flex-1 py-2.5 text-sm font-semibold text-gray-700 bg-gray-100 rounded-xl hover:bg-gray-200 active:bg-gray-300 transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleConfirmDisable}
                        className="flex-1 py-2.5 text-sm font-semibold text-white bg-blue-700 rounded-xl hover:bg-blue-800 active:bg-blue-900 transition-colors"
                      >
                        Turn off
                      </button>
                    </div>
                  </div>
                )}

              </div>
            )
          })}
        </div>

        <p className="text-xs text-gray-400 px-1 leading-snug">
          Changes take effect immediately. Each category may contain multiple notification types that cannot be managed individually.
        </p>

        {/* Prototype controls */}
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
