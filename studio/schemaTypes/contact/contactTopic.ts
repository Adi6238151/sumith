import { defineType } from 'sanity'

export default defineType({
  name: 'contactTopic',
  title: 'Contact Form Topics',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Topic Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
      description: 'The topic that will appear in the contact form dropdown',
    },
    {
      name: 'order',
      title: 'Display Order',
      type: 'number',
      initialValue: 0,
      description: 'Lower numbers appear first in the dropdown',
      validation: (Rule) => Rule.required().min(0),
    },
    {
      name: 'isActive',
      title: 'Active',
      type: 'boolean',
      initialValue: true,
      description: 'Uncheck to hide this topic from the contact form',
    },
  ],
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      title: 'title',
      order: 'order',
      active: 'isActive',
    },
    prepare({ title, order, active }) {
      return {
        title: title,
        subtitle: `Order: ${order} • ${active ? '✓ Active' : '✗ Inactive'}`,
      }
    },
  },
})
