import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'solution',
  title: 'Solutions (Our Solutions Section)',
  type: 'document',

  fields: [
    defineField({
      name: 'title',
      title: 'Solution Title',
      type: 'string',
      description: 'Use line breaks in frontend for multi-line titles',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'theme',
      title: 'Theme',
      type: 'string',
      options: {
        list: [
          { title: 'Blue', value: 'blue' },
          { title: 'Green', value: 'green' },
        ],
        layout: 'radio',
      },
      initialValue: 'blue',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'image',
      title: 'Solution Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'imagePosition',
      title: 'Image Position',
      type: 'string',
      options: {
        list: [
          { title: 'Left', value: 'left' },
          { title: 'Right', value: 'right' },
        ],
        layout: 'radio',
      },
      initialValue: 'left',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'exploreLink',
      title: 'Explore Link',
      type: 'string',
      description: 'Relative URL (e.g. /solutions/connected-vehicle)',
      validation: (Rule) =>
        Rule.required().regex(/^\/.*/, {
          name: 'relative-url',
          invert: false,
        }),
    }),

    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Lower number appears first',
      validation: (Rule) => Rule.required().integer(),
    }),
  ],

  orderings: [
    {
      title: 'Order Ascending',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],

  preview: {
    select: {
      title: 'title',
      media: 'image',
      theme: 'theme',
    },
    prepare({ title, media, theme }) {
      return {
        title,
        subtitle: `Theme: ${theme}`,
        media,
      }
    },
  },
})
