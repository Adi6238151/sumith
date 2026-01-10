export default {
  name: 'aboutTechPartners',
  title: 'About Technology Partners',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Section Title',
      type: 'string',
      description: 'Main heading for the section',
      initialValue: 'TECHNOLOGY & INNOVATION PARTNERS',
      validation: (Rule) => Rule.required()
    },
    {
      name: 'partners',
      title: 'Technology Partners',
      type: 'array',
      description: 'Upload technology partner logos',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'name',
              title: 'Partner Name',
              type: 'string',
              description: 'Company/Technology name',
              validation: (Rule) => Rule.required()
            },
            {
              name: 'logo',
              title: 'Logo',
              type: 'image',
              description: 'Upload partner logo',
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
        title: 'Technology Partners Section'
      }
    }
  }
}
