// app/(frontend)/layout.tsx
import Root from '@/ui/Root'
import { NuqsAdapter } from 'nuqs/adapters/next/app'
import SkipToContent from '@/ui/SkipToContent'
import Announcement from '@/ui/Announcement'
import Header from '@/ui/header'
import Footer from '@/ui/footer'
import VisualEditingControls from '@/ui/VisualEditingControls'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import '@/styles/app.css'

export const metadata = {
	title: 'WinWebSEO',
	description: 'รับทำเว็บไซต์ WordPress',
}

export default function FrontendLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<Root>
			<body className="bg-canvas text-ink antialiased">
				<NuqsAdapter>
					<SkipToContent />
					<Announcement />
					<Header />
					<main id="main-content" role="main" tabIndex={-1}>
						{children}
					</main>
					<Footer />
					<VisualEditingControls />
				</NuqsAdapter>
				<Analytics />
				<SpeedInsights />
			</body>
		</Root>
	)
}
