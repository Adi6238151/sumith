export default {
  name: 'aboutTestimonials',
  title: 'About Testimonials Section',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Section Title',
      type: 'string',
      initialValue: 'TRUSTED BY INDUSTRY LEADERS',
      validation: (Rule) => Rule.required()
    },
    {
      name: 'testimonials',
      title: 'Testimonials',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'quote',
              title: 'Quote',
              type: 'text',
              rows: 6,
              validation: (Rule) => Rule.required()
            },
            {
              name: 'name',
              title: 'Name',
              type: 'string',
              validation: (Rule) => Rule.required()
            },
            {
              name: 'role',
              title: 'Role/Title',
              type: 'string',
              validation: (Rule) => Rule.required()
            }
          ],
          preview: {
            select: {
              title: 'name',
              subtitle: 'role'
            }
          }
        }
      ]
    }
  ],
  preview: {
    prepare() {
      return {
        title: 'Testimonials Section'
      }
    }
  }
}
