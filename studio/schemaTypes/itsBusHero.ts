import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'itsBusHero',
  type: 'document',
  title: 'ITS Bus Hero',
  fields: [
    defineField({
   name: 'tilesTitle',
   type: 'string',
   title: 'Tiles Area Title',
   initialValue: "ONE BOX, ONE SOLUTION"
}),
    defineField({
      name: 'features',
      type: 'array',
      title: 'Features',
      of: [
        {
          type: 'object',
          name: 'feature',
          title: 'Feature',
          fields: [
            defineField({ name: 'label', type: 'string', title: 'Label' }),
            defineField({ name: 'icon', type: 'image', title: 'Icon Image' }),
          ],
          preview: {
            select: { title: 'label', media: 'icon' },
          }
        }
      ],
    }),
    defineField({
      name: 'image',
      type: 'image',
      title: 'Bus Image'
    }),
    defineField({
      name: 'seo',
      type: 'seoFields',
      title: 'SEO'
    }),
  ],
  preview: {
    select: { title: 'title' }
  }
})
