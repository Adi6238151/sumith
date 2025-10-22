// D:\Web\sumith\studio\schemaTypes\metro-rail\metroRailSectionHeader.ts

import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'metroRailSectionHeader',
  type: 'document',
  title: 'Metro Rail Section Header',
  fields: [
    defineField({
      name: 'heading',
      type: 'string',
      title: 'Section Title',
      initialValue: "TCMS: Train Control and Management System"
    }),
    defineField({
      name: 'paragraph',
      type: 'text',
      title: 'Subtitle',
      initialValue: "Sumith's Train Control and Management System (TCMS) provides centralised control and monitoring of all key train sub-systems."
    }),
    defineField({
      name: 'image',
      type: 'image',
      title: 'Header Image (Right Side)'
    }),
    defineField({
      name: 'seo',
      type: 'seoFields',
      title: 'SEO'
    }),
  ],
  preview: {
    select: { title: 'heading', media: 'image' }
  }
})
