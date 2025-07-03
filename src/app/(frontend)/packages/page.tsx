import { client } from '@/sanity/lib/client'
import { groq } from 'next-sanity'
import { cn } from '@/lib/utils'

type PackageItem = {
	title: string
	price: string
	features?: string[]
	highlight?: boolean
	ctaLabel?: string
}

type PackagesPageData = {
	title: string
	intro: string
	packages: PackageItem[]
}

export const revalidate = 60 // Cache หน้าไว้ 60 วินาที

const query = groq`*[_type == "packagesPage"][0]{
  title,
  intro,
  packages[]{ title, price, features, highlight, ctaLabel }
}`

export default async function PackagesPage() {
	const data: PackagesPageData = await client.fetch(query)

	if (!data) {
		return (
			<p className="text-muted mt-20 text-center">
				กรุณาเพิ่มเนื้อหาใน Sanity Studio ก่อน
			</p>
		)
	}

	return (
		<section
			className="text-slate w-full px-4 py-16 sm:px-8 md:px-12"
			style={{
				background:
					'linear-gradient(to bottom right,rgb(12, 42, 107),rgb(108, 135, 185))',
			}}
		>
			<div className="mx-auto mb-12 max-w-2xl text-center text-white">
				<h2 className="mb-2 text-3xl font-bold">{data.title}</h2>
				<p className="opacity-90">{data.intro}</p>
			</div>

			<div className="grid items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-4">
				{data.packages.map((pkg) => (
					<div
						key={pkg.title}
						className={cn(
							'flex h-full flex-col justify-between rounded-xl bg-white/10 p-6 text-left shadow-xl backdrop-blur-sm',
							pkg.highlight && 'relative',
						)}
					>
						{pkg.highlight && (
							<div className="absolute top-4 right-4 flex gap-1">
								{Array.from({ length: 5 }).map((_, i) => (
									<svg
										key={i}
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 24 24"
										fill="#E09C30"
										className="h-4 w-4"
									>
										<path d="M12 2l2.9 6.6L22 9.3l-5 4.9L18.2 21 12 17.3 5.8 21 7 14.2 2 9.3l7.1-0.7L12 2z" />
									</svg>
								))}
							</div>
						)}

						<div className="mt-8 text-white">
							<h3 className="mb-1 text-xl font-bold">{pkg.title}</h3>
							<p className="mb-3 text-2xl font-semibold">฿{pkg.price}</p>
							<ul className="mb-4 list-disc space-y-1 pl-5 text-sm opacity-90">
								{pkg.features?.map((f, i) => <li key={i}>{f}</li>)}
							</ul>
						</div>

						{pkg.ctaLabel && (
							<button className="mt-auto rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 px-4 py-2 text-sm font-semibold text-white shadow-md transition-transform duration-200 hover:scale-105 hover:brightness-110">
								{pkg.ctaLabel}
							</button>
						)}
					</div>
				))}
			</div>
		</section>
	)
}
