import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'solutionCarousel',
  type: 'document',
  title: 'Solution Carousel',
  fields: [
    defineField({
      name: 'slides',
      type: 'array',
      title: 'Slides',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'label', type: 'string', title: 'Label' }, // must be present
            { name: 'title', type: 'string', title: 'Title' },
            { name: 'description', type: 'text', title: 'Description' },
            { name: 'image', type: 'image', title: 'Slide Image' },
          ]
        }
      ]
    }),
    // 🟢 ADD THIS BLOCK for SEO fields (must be at top-level)
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seoFields', // Provided by sanity-plugin-seofields
    }),
  ]
})
