'use client'

interface ToggleProps {
  enabled: boolean
  onChange: (value: boolean) => void
  disabled?: boolean
  loading?: boolean
}

export default function Toggle({ enabled, onChange, disabled, loading }: ToggleProps) {
  const isDisabled = disabled || loading

  return (
    <button
      role="switch"
      aria-checked={enabled}
      disabled={isDisabled}
      onClick={() => !isDisabled && onChange(!enabled)}
      className={[
        'relative inline-flex h-7 w-12 flex-shrink-0 items-center rounded-full transition-colors duration-200',
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2',
        enabled ? 'bg-blue-700' : 'bg-gray-300',
        isDisabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer',
      ].join(' ')}
    >
      <span
        className={[
          'inline-block h-5 w-5 transform rounded-full bg-white shadow-sm transition-transform duration-200',
          enabled ? 'translate-x-6' : 'translate-x-1',
        ].join(' ')}
      />
    </button>
  )
}
