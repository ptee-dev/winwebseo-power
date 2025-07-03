'use client'
import { Menu, X } from 'lucide-react'

export default function Toggle() {
	return (
		<label className="cursor-pointer [grid-area:toggle] md:hidden">
			<input id="header-toggle" type="checkbox" hidden />

			<Menu className="header-open:hidden text-ink h-6 w-6" />
			<X className="header-closed:hidden text-ink h-6 w-6" />
		</label>
	)
}
