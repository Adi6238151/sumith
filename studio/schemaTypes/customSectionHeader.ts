import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'customSectionHeader',
  type: 'document',
  title: 'Custom Section Header',
  fields: [
    defineField({
      name: 'heading',
      type: 'string',
      title: 'Header Title',
      initialValue: "Sumith's Intelligent Transportation System"
    }),
    defineField({
      name: 'paragraph',
      type: 'text',
      title: 'Subtitle/Paragraph',
      initialValue: "Take a Ride to a Safe, Green, Fun, and Comfortable Tomorrow\nA Complete ITS Solution For Public Transport Buses and Fleet Management"
    }),
    defineField({
      name: 'icon',
      type: 'string',
      title: 'Bus Icon (emoji or SVG tag)',
      initialValue: "🚍",
      description: "Paste bus emoji or SVG markup (optional)."
    }),
    defineField({
      name: 'seo',
      type: 'seoFields',
      title: 'SEO'
    })
  ],
  preview: {
    select: { title: 'heading' }
  }
})
