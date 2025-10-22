import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'scopeOfWorkTiles',
  type: 'document',
  title: 'Scope of Work Tiles',
  fields: [
    defineField({
      name: 'heading',
      type: 'string',
      title: 'Section Title',
    }),
    defineField({
      name: 'tiles',
      type: 'array',
      title: 'Tiles',
      of: [
        {
          type: 'object',
          name: 'tile',
          title: 'Tile',
          fields: [
            defineField({ name: 'title', type: 'string', title: 'Tile Text' })
          ]
        }
      ]
    }),
    defineField({ name: 'seo', type: 'seoFields', title: 'SEO' })
  ]
});
