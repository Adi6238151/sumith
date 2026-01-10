export default {
  name: 'aboutCTA',
  title: 'About CTA Section',
  type: 'document',
  fields: [
    {
      name: 'heading',
      title: 'Heading',
      type: 'string',
      description: 'Main CTA text',
      initialValue: 'Looking for a reliable co-dev partner?',
      validation: (Rule) => Rule.required()
    },
    {
      name: 'buttonText',
      title: 'Button Text',
      type: 'string',
      initialValue: "Let's Work Together",
      validation: (Rule) => Rule.required()
    },
    {
      name: 'buttonLink',
      title: 'Button Link',
      type: 'string',
      initialValue: '/contact',
      validation: (Rule) => Rule.required()
    }
  ],
  preview: {
    prepare() {
      return {
        title: 'CTA Section'
      }
    }
  }
}
