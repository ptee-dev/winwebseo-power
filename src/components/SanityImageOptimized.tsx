'use client'

import Image from 'next/image'
import { urlFor } from '@/sanity/lib/image'
import type { SanityImageSource } from '@sanity/image-url/lib/types/types'

type Props = {
  image: SanityImageSource
  alt?: string
  width?: number
  height?: number
  className?: string
  sizes?: string
  priority?: boolean
}

export default function SanityImageOptimized({
  image,
  alt = '',
  width = 800,
  height = 600,
  className = '',
  sizes = '(max-width: 768px) 100vw, 800px',
  priority = false,
}: Props) {
  const url = urlFor(image as Sanity.Image)
    .width(width)
    .height(height)
    .quality(80)
    .auto('format') // 👈 ทำให้รองรับ webp / avif ตาม browser
    .url()

  return (
    <Image
      src={url}
      alt={alt}
      width={width}
      height={height}
      className={className}
      loading={priority ? 'eager' : 'lazy'}
      priority={priority}
      sizes={sizes}
    />
  )
}
