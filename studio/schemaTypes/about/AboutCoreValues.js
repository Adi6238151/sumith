export default {
  name: 'aboutCoreValues',
  title: 'About Core Values Section',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Section Title',
      type: 'string',
      description: 'Main heading for the section',
      initialValue: 'CORE VALUES',
      validation: (Rule) => Rule.required()
    },
    {
      name: 'values',
      title: 'Core Values',
      type: 'array',
      description: 'Add 3 core values',
      validation: (Rule) => Rule.max(6).min(1),
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'title',
              title: 'Value Title',
              type: 'string',
              description: 'e.g., "Innovation", "Excellence", "Transparency"',
              validation: (Rule) => Rule.required()
            },
            {
              name: 'description',
              title: 'Description',
              type: 'text',
              rows: 4,
              description: 'Brief description of this value',
              validation: (Rule) => Rule.required()
            },
            {
              name: 'icon',
              title: 'Icon',
              type: 'image',
              description: 'Upload icon/image for this value',
              options: {
                hotspot: true
              },
              validation: (Rule) => Rule.required()
            }
          ],
          preview: {
            select: {
              title: 'title',
              subtitle: 'description',
              media: 'icon'
            }
          }
        }
      ]
    }
  ],
  preview: {
    prepare() {
      return {
        title: 'Core Values Section'
      }
    }
  }
}
