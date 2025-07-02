import Link from 'next/link'
import resolveUrl from '@/lib/resolveUrl'
import { stegaClean } from 'next-sanity'
import { cn } from '@/lib/utils'
import type { ComponentProps } from 'react'

export default function CTA({
	_type,
	_key,
	link,
	style,
	className,
	children,
	...rest
}: Sanity.CTA & ComponentProps<'a'>) {
	const props = {
		className: cn(stegaClean(style), className) || undefined,
		children:
			children || link?.label || link?.internal?.title || link?.external,
		...rest,
	}

	if (link?.type === 'internal' && link.internal)
		return (
			<Link
				href={resolveUrl(link.internal, {
					base: false,
					params: link.params,
				})}
				{...props}
			/>
		)

if (link?.type === 'external' && link.external) {
	const rel = link.nofollow ? 'noopener noreferrer nofollow' : 'noopener noreferrer'
	return <a href={stegaClean(link.external)} rel={rel} target="_blank" {...props} />
}

	return <div {...(props as ComponentProps<'div'>)} />
}
