export default {
  name: 'aboutStats',
  title: 'About Stats Section',
  type: 'document',
  fields: [
    {
      name: 'stats',
      title: 'Statistics',
      type: 'array',
      description: 'Add 5 statistics to display',
      validation: (Rule) => Rule.max(5).min(1),
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'value',
              title: 'Value',
              type: 'string',
              description: 'e.g., "10+", "50+", "200+"',
              validation: (Rule) => Rule.required()
            },
            {
              name: 'label',
              title: 'Label',
              type: 'text',
              rows: 2,
              description: 'e.g., "years of production-ready games and art"',
              validation: (Rule) => Rule.required()
            }
          ],
          preview: {
            select: {
              value: 'value',
              label: 'label'
            },
            prepare(selection) {
              const { value, label } = selection
              return {
                title: value,
                subtitle: label
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
        title: 'About Stats Section'
      }
    }
  }
}
