import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'busSolutionImageRow',
  type: 'document',
  title: 'Bus Solution Image Row',
  fields: [
    defineField({
      name: 'images',
      type: 'array',
      title: 'Images and Captions',
      of: [
        {
          type: 'object',
          name: 'imageWithCaption',
          title: 'Image With Caption',
          fields: [
            defineField({ name: 'title', type: 'string', title: 'Image Title' }),
            defineField({ name: 'image', type: 'image', title: 'Image File' }),
            defineField({ name: 'alt', type: 'string', title: 'Image Alt Text' }),
            defineField({ name: 'caption', type: 'text', title: 'Caption (Below Image)' }),
          ],
          preview: {
            select: { title: 'title', media: 'image' }
          }
        }
      ]
    }),
    defineField({
      name: 'seo',
      type: 'seoFields',
      title: 'SEO'
    })
  ],
  preview: {
    select: { title: 'title' }
  }
})
