// qualityOfLifeTechnology.ts

export default {
  name: 'qualityOfLifeTechnology',
  title: 'Quality of Life Technology',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Main Title',
      type: 'string',
    },
    {
      name: 'tabs',
      title: 'Tabs',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'tabTitle', title: 'Tab Title', type: 'string' },
            {
              name: 'image',
              title: 'Tab Image',
              type: 'image',
              options: { hotspot: true },
            },
            {
              name: 'listItems',
              title: 'Bullet Points',
              type: 'array',
              of: [{ type: 'string' }]
            }
          ]
        }
      ]
    },
    {
      name: 'seo',
      title: 'SEO',
      type: 'object',
      fields: [
        {
          name: 'metaTitle',
          title: 'Meta Title',
          type: 'string',
          validation: (Rule: any) => Rule.required().error('Meta Title is required for good SEO'),
        },
        {
          name: 'metaDescription',
          title: 'Meta Description',
          type: 'text',
          rows: 3,
        },
        {
          name: 'metaKeywords',
          title: 'Meta Keywords',
          type: 'array',
          of: [{ type: 'string' }]
        },
        {
          name: 'seoImage',
          title: 'SEO Image',
          type: 'image',
          options: { hotspot: true }
        },
        {
          name: 'canonicalUrl',
          title: 'Canonical URL',
          type: 'url',
        },
        {
          name: 'noIndex',
          title: 'No Index',
          type: 'boolean',
          description: 'Prevent this page from appearing in search engine results',
        },
        {
          name: 'noFollow',
          title: 'No Follow',
          type: 'boolean',
          description: 'Prevent search engines from following links on this page',
        },
      ]
    }
  ]
}
