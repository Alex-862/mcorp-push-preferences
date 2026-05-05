'use client'

import Link from 'next/link'

interface PageHeaderProps {
  title: string
  backHref: string
}

export default function PageHeader({ title, backHref }: PageHeaderProps) {
  return (
    <div className="flex items-center gap-3 px-4 pt-14 pb-4 bg-white border-b border-gray-100">
      <Link
        href={backHref}
        className="flex items-center justify-center w-9 h-9 rounded-full hover:bg-gray-100 active:bg-gray-200 transition-colors -ml-1"
        aria-label="Go back"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5 text-gray-700">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
        </svg>
      </Link>
      <h1 className="text-lg font-bold text-gray-900">{title}</h1>
    </div>
  )
}
