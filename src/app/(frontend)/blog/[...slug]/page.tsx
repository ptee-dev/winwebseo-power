import { notFound } from 'next/navigation'
import Modules from '@/ui/modules'
import processMetadata from '@/lib/processMetadata'
import { client } from '@/sanity/lib/client'
import { fetchSanityLive } from '@/sanity/lib/fetch'
import { groq } from 'next-sanity'
import { BLOG_DIR } from '@/lib/env'
import {
	IMAGE_QUERY,
	MODULES_QUERY,
	TRANSLATIONS_QUERY,
} from '@/sanity/lib/queries'
import { languages, type Lang } from '@/lib/i18n'
import errors from '@/lib/errors'

// ✅ Page รับ params แบบ Promise แล้ว resolve ก่อนใช้งาน
export default async function Page({ params }: Props) {
	const resolvedParams = await params
	const post = await getPost(resolvedParams)
	if (!post) notFound()
	return <Modules modules={post.modules} post={post} />
}

// ✅ generateMetadata ก็ต้อง await params เช่นกัน
export async function generateMetadata({ params }: Props) {
	const resolvedParams = await params
	const post = await getPost(resolvedParams)
	if (!post) notFound()
	return processMetadata(post)
}

export async function generateStaticParams() {
	const slugs = await client.fetch<string[]>(
		groq`*[_type == 'blog.post' && defined(metadata.slug.current)].metadata.slug.current`,
	)

	return slugs.map((slug) => ({ slug: slug.split('/') }))
}

async function getPost(params: ResolvedParams) {
	const blogTemplateExists = await fetchSanityLive<boolean>({
		query: groq`count(*[_type == 'global-module' && path == '${BLOG_DIR}/']) > 0`,
	})

	if (!blogTemplateExists) throw new Error(errors.missingBlogTemplate)

	const { slug, lang } = processSlug(params)

	return await fetchSanityLive<Sanity.BlogPost & { modules: Sanity.Module[] }>({
		query: groq`*[
			_type == 'blog.post'
			&& metadata.slug.current == $slug
			${lang ? `&& language == '${lang}'` : ''}
		][0]{
			...,
			body[]{
				...,
				_type == 'image' => {
					${IMAGE_QUERY},
					asset->
				}
			},
			'readTime': length(string::split(pt::text(body), ' ')) / 200,
			'headings': body[style in ['h2', 'h3']]{
				style,
				'text': pt::text(@)
			},
			categories[]->,
			authors[]->,
			metadata {
				...,
				'ogimage': image.asset->url + '?w=1200'
			},
			'modules': (
				*[_type == 'global-module' && path == '*'].before[]{ ${MODULES_QUERY} }
				+ *[_type == 'global-module' && path == '${BLOG_DIR}/'].before[]{ ${MODULES_QUERY} }
				+ *[_type == 'global-module' && path == '${BLOG_DIR}/'].after[]{ ${MODULES_QUERY} }
				+ *[_type == 'global-module' && path == '*'].after[]{ ${MODULES_QUERY} }
			),
			${TRANSLATIONS_QUERY},
		}`,
		params: { slug },
	})
}

// ✅ types ที่ถูกต้อง
type ResolvedParams = { slug: string[] }

type Props = {
	params: Promise<ResolvedParams>
}

function processSlug(params: ResolvedParams) {
	const lang = languages.includes(params.slug[0] as Lang)
		? params.slug[0]
		: undefined

	const slug = params.slug.join('/')

	return {
		slug: lang ? slug.replace(new RegExp(`^${lang}/`), '') : slug,
		lang,
	}
}
