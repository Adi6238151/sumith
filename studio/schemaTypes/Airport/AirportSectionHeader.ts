// D:\Web\sumith\studio\schemaTypes\metro-rail\AirportSectionHeader.ts

import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'AirportSectionHeader',
  type: 'document',
  title: 'Airport Section Header',
  fields: [
    defineField({
      name: 'heading',
      type: 'string',
      title: 'Section Title',
      initialValue: "Flight Information Display Systems"
    }),
    defineField({
      name: 'paragraph',
      type: 'text',
      title: 'Subtitle',
      initialValue: "Sumith's Flight information display systems make up the heart of any airport, operating in crucial functions for both control rooms and passenger information."
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
