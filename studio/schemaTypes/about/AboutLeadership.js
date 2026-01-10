export default {
  name: 'aboutLeadership',
  title: 'About Leadership Section',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Section Title',
      type: 'string',
      initialValue: 'MEET OUR LEADERSHIP',
      validation: (Rule) => Rule.required()
    },
    {
      name: 'members',
      title: 'Team Members',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'name',
              title: 'Name',
              type: 'string',
              description: 'Team member full name',
              validation: (Rule) => Rule.required()
            },
            {
              name: 'photo',
              title: 'Photo',
              type: 'image',
              description: 'Professional headshot photo',
              validation: (Rule) => Rule.required(),
              options: {
                hotspot: true
              }
            },
            {
              name: 'order',
              title: 'Display Order',
              type: 'number',
              description: 'Order in which members appear (lower number = first)',
              initialValue: 0
            }
          ],
          preview: {
            select: {
              title: 'name',
              media: 'photo',
              order: 'order'
            },
            prepare({ title, media, order }) {
              return {
                title: title,
                subtitle: `Order: ${order}`,
                media: media
              }
            }
          }
        }
      ],
      validation: (Rule) => Rule.required().min(1)
    },
    {
      name: 'ctaText',
      title: 'CTA Button Text',
      type: 'string',
      initialValue: 'Join Our Team',
      validation: (Rule) => Rule.required()
    },
    {
      name: 'ctaLink',
      title: 'CTA Button Link',
      type: 'string',
      initialValue: '/careers',
      validation: (Rule) => Rule.required()
    }
  ],
  preview: {
    prepare() {
      return {
        title: 'Leadership Section'
      }
    }
  }
}
