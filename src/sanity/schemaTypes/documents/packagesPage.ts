import { defineType, defineField } from 'sanity'

export default defineType({
	name: 'packagesPage',
	title: 'Packages Page',
	type: 'document',
	fields: [
		defineField({ name: 'title', type: 'string', title: 'หัวเรื่องหลัก' }),
		defineField({ name: 'intro', type: 'text', title: 'ข้อความแนะนำ' }),
		defineField({
			name: 'packages',
			title: 'รายการแพ็กเกจ',
			type: 'array',
			of: [
				{
					type: 'object',
					fields: [
						{ name: 'title', type: 'string', title: 'ชื่อแพ็กเกจ' },
						{ name: 'price', type: 'string', title: 'ราคา (เช่น 4,900)' },
						{
							name: 'features',
							type: 'array',
							of: [{ type: 'string' }],
							title: 'ฟีเจอร์',
						},
						{
							name: 'highlight',
							type: 'boolean',
							title: 'เป็นแพ็กเกจยอดนิยม?',
						},
						{ name: 'ctaLabel', type: 'string', title: 'ข้อความปุ่ม CTA' },
					],
				},
			],
		}),
	],
})
