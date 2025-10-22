import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'heroSection',
  title: 'Hero Section',
  type: 'document',
  fields: [
    defineField({
      name: 'headline',
      title: 'Main Heading',
      type: 'string'
    }),
    defineField({
      name: 'badge',
      title: 'Badge Text',
      type: 'string'
    }),
    defineField({
      name: 'solutions',
      title: 'Solutions List (Animated)',
      type: 'array',
      of: [{type: 'string'}]
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text'
    }),
    defineField({
      name: 'button1Text',
      title: 'Primary Button Text',
      type: 'string'
    }),
    defineField({
      name: 'button2Text',
      title: 'Secondary Button Text',
      type: 'string'
    }),
    defineField({
      name: 'stats',
      title: 'Stats',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          {name: 'number', type: 'string', title: 'Stat Number (e.g. "15+")'},
          {name: 'label', type: 'string', title: 'Stat Label (e.g. "Years Experience")'}
        ]
      }]
    }),
    defineField({
      name: 'backgroundImage',
      title: 'Background Image',
      type: 'image',
      options: {hotspot: true}
    }),
     defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seoFields',
    }),
  ]
})
