'use client'
import Link from 'next/link'
import resolveUrl from '@/lib/resolveUrl'
import { stegaClean } from 'next-sanity'
import { cn } from '@/lib/utils'
import type { ComponentProps } from 'react'

export function closeMenu() {
	const toggle = document.getElementById('header-toggle') as HTMLInputElement
	if (toggle) toggle.checked = false
}

export default function CTA({
	_type,
	_key,
	link,
	style,
	className,
	children,
	onClick,
	...rest
}: Sanity.CTA & ComponentProps<'a'>) {
	const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
		closeMenu()
		if (onClick) onClick(e)
	}

	const props = {
		className: cn(stegaClean(style), className) || undefined,
		children:
			children || link?.label || link?.internal?.title || link?.external,
		...rest,
		onClick: handleClick,
	}

	if (link?.type === 'internal' && link.internal) {
		return (
			<Link
				href={resolveUrl(link.internal, {
					base: false,
					params: link.params,
				})}
				{...props}
			/>
		)
	}

	if (link?.type === 'external' && link.external) {
		const rel = link.nofollow
			? 'noopener noreferrer nofollow'
			: 'noopener noreferrer'
		return (
			<a href={stegaClean(link.external)} rel={rel} target="_blank" {...props}>
				{props.children}
			</a>
		)
	}

	return <div className={props.className}>{props.children}</div>
}
