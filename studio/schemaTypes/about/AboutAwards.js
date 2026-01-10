export default {
  name: 'aboutAwards',
  title: 'About Awards Section',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Section Title',
      type: 'string',
      initialValue: 'AWARDS & RECOGNITION',
      validation: (Rule) => Rule.required()
    },
    {
      name: 'awards',
      title: 'Awards',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'title',
              title: 'Award Title',
              type: 'string',
              description: 'Main award text (e.g., "ISO CERTIFIED COMPANY")',
              validation: (Rule) => Rule.required()
            },
            {
              name: 'subtitle',
              title: 'Award Subtitle',
              type: 'string',
              description: 'Additional text (e.g., "9001:2015")',
            },
            {
              name: 'icon',
              title: 'Award Icon/Badge',
              type: 'image',
              description: 'Upload award badge with laurel wreath',
              validation: (Rule) => Rule.required(),
              options: {
                hotspot: true
              }
            },
            {
              name: 'order',
              title: 'Display Order',
              type: 'number',
              description: 'Order in which awards appear (lower number = first)',
              initialValue: 0
            }
          ],
          preview: {
            select: {
              title: 'title',
              subtitle: 'subtitle',
              media: 'icon'
            },
            prepare({ title, subtitle, media }) {
              return {
                title: title,
                subtitle: subtitle,
                media: media
              }
            }
          }
        }
      ],
      validation: (Rule) => Rule.required().min(1)
    }
  ],
  preview: {
    prepare() {
      return {
        title: 'Awards & Recognition Section'
      }
    }
  }
}
