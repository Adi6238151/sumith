export default {
  name: 'aboutPartners',
  title: 'About Partners Section',
  type: 'document',
  fields: [
    {
      name: 'partners',
      title: 'Partner Logos',
      type: 'array',
      description: 'Upload partner/client company logos',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'name',
              title: 'Partner Name',
              type: 'string',
              description: 'Company name for accessibility',
              validation: (Rule) => Rule.required()
            },
            {
              name: 'logo',
              title: 'Logo Image',
              type: 'image',
              description: 'Upload company logo (preferably white/transparent)',
              options: {
                hotspot: true
              },
              validation: (Rule) => Rule.required()
            },
            {
              name: 'order',
              title: 'Display Order',
              type: 'number',
              description: 'Order in which logo appears (optional)',
              initialValue: 0
            }
          ],
          preview: {
            select: {
              title: 'name',
              media: 'logo',
              order: 'order'
            },
            prepare(selection) {
              const { title, media, order } = selection
              return {
                title,
                subtitle: `Order: ${order || 0}`,
                media
              }
            }
          }
        }
      ]
    }
  ],
  preview: {
    prepare() {
      return {
        title: 'About Partners Section'
      }
    }
  }
}
