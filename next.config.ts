import { createClient, groq } from 'next-sanity'
import { projectId, dataset, apiVersion } from '@/sanity/lib/env'
import { BLOG_DIR } from '@/lib/env'
import { supportedLanguages } from '@/lib/i18n'
import type { NextConfig } from 'next'

const staticClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false, // ปิด CDN เพื่อให้ดึงข้อมูล redirect แบบ real-time
})

const nextConfig = {
  reactStrictMode: true,

  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
      },
    ],
  },

  async redirects() {
    const sanityRedirects = await staticClient.fetch<
      { source: string; destination: string; permanent: boolean }[]
    >(
      groq`*[_type == 'redirect']{
        source,
        'destination': select(
          destination.type == 'internal' =>
            select(
              destination.internal->._type == 'blog.post' => '/${BLOG_DIR}/',
              '/'
            ) + destination.internal->.metadata.slug.current,
          destination.external
        ),
        permanent
      }`
    )

    return [
      {
        source: '/',
        destination: '/home',
        permanent: true,
      },
      ...sanityRedirects,
    ]
  },

  async rewrites() {
    if (!supportedLanguages?.length) return []

    return [
      {
        source: `/:lang/${BLOG_DIR}/:slug`,
        destination: `/${BLOG_DIR}/:lang/:slug`,
      },
    ]
  },

  env: {
    SC_DISABLE_SPEEDY: 'false',
  },
} satisfies NextConfig

export default nextConfig
