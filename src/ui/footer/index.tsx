import Link from 'next/link'

export default function Footer() {
	return (
		<footer className="bg-gray-900 text-sm text-white">
			{/* Top 5 Columns */}
			<div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-4 py-12 sm:grid-cols-3 md:grid-cols-5">
				{/* 1. Contact */}
				<div>
					<h4 className="mb-3 text-lg font-semibold">WinWebSEO</h4>
					<p className="text-gray-400">
						สร้างเว็บไซต์ WordPress และ Jamstack อย่างมืออาชีพ
					</p>
					<p className="mt-3 text-gray-400">Email: contact@winwebseo.com</p>
					<p className="text-gray-400">Tel: 083-771-6550 | จ-ศ 08:00-17.00</p>
				</div>

				{/* 2. Services */}
				<div>
					<h4 className="mb-3 font-semibold">Services</h4>
					<ul className="space-y-2 text-gray-400">
						<li>
							<Link href="/services/wordpress">WordPress Website</Link>
						</li>
						<li>
							<Link href="/services/seo">SEO Optimization</Link>
						</li>
						<li>
							<Link href="/services/maintenance">ดูแลเว็บไซต์</Link>
						</li>
					</ul>
				</div>

				{/* 3. Pages */}
				<div>
					<h4 className="mb-3 font-semibold">Pages</h4>
					<ul className="space-y-2 text-gray-400">
						<li>
							<Link href="/">หน้าแรก</Link>
						</li>
						<li>
							<Link href="/about">เกี่ยวกับเรา</Link>
						</li>
						<li>
							<Link href="/contact">ติดต่อเรา</Link>
						</li>
					</ul>
				</div>

				{/* 4. Package */}
				<div>
					<h4 className="mb-3 font-semibold">Package</h4>
					<ul className="space-y-2 text-gray-400">
						<li>
							<Link href="/packages/basic">Basic Plan</Link>
						</li>
						<li>
							<Link href="/packages/standard">Standard Plan</Link>
						</li>
						<li>
							<Link href="/packages/pro">Pro Plan</Link>
						</li>
					</ul>
				</div>

				{/* 5. Blog */}
				<div>
					<h4 className="mb-3 font-semibold">Blog</h4>
					<ul className="space-y-2 text-gray-400">
						<li>
							<Link href="/blog">บทความทั้งหมด</Link>
						</li>
						<li>
							<Link href="/blog/seo-tips">เทคนิค SEO</Link>
						</li>
						<li>
							<Link href="/blog/web-trends-2025">เทรนด์เว็บไซต์ 2025</Link>
						</li>
					</ul>
				</div>
			</div>

			{/* Bottom Bar */}
			<div className="border-t border-gray-700">
				<div className="mx-auto flex max-w-7xl flex-col items-center justify-between px-4 py-4 text-gray-400 md:flex-row">
					<div className="mb-2 md:mb-0">
						© {new Date().getFullYear()} WinWebSEO. All rights reserved.
					</div>

					{/* Footer Nav Placeholder */}
					<div className="hidden space-x-4 text-sm sm:block">
						<Link href="/privacy">Privacy</Link>
						<Link href="/terms">Terms</Link>
						<Link href="/sitemap">Sitemap</Link>
					</div>

					{/* Back to top */}
					<div>
						<a href="#" className="hover:text-white">
							↑ Back to Top
						</a>
					</div>
				</div>
			</div>
		</footer>
	)
}
