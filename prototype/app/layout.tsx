import type { Metadata } from 'next'
import './globals.css'
import BottomNav from '@/components/BottomNav'

export const metadata: Metadata = {
  title: 'MATTHEWS CORP',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="phone-frame">
          <div className="flex-1 overflow-y-auto pb-16">
            {children}
          </div>
          <BottomNav />
        </div>
      </body>
    </html>
  )
}
