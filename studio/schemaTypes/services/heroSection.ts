import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'servicesHero',
  title: 'Services – Hero',
  type: 'document',
  fields: [
    defineField({
      name: 'tag',
      title: 'Top tag',
      type: 'string',
      description: 'Small pill text above heading (e.g. AL Total Care)',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subheading',
      title: 'Subheading',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'backgroundImage',
      title: 'Background image (desktop)',
      type: 'image',
      options: {hotspot: true},
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'backgroundImageMobile',
      title: 'Background image (mobile)',
      type: 'image',
      options: {hotspot: true},
    }),
    defineField({
      name: 'ctaLabel',
      title: 'CTA label',
      type: 'string',
    }),
    defineField({
      name: 'ctaUrl',
      title: 'CTA URL',
      type: 'url',
    }),
    defineField({
      name: 'sortOrder',
      title: 'Sort order',
      type: 'number',
      initialValue: 1,
    }),
  ],
})
