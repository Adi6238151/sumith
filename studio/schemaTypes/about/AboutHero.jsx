export default {
  name: 'aboutPage',
  title: 'About Page',
  type: 'document',
  fields: [
    {
      name: 'hero',
      title: 'Hero Section',
      type: 'object',
      fields: [
        {
          name: 'kicker',
          title: 'Kicker Text (Small text above title)',
          type: 'string',
          description: 'e.g., "ABOUT"',
          initialValue: 'ABOUT'
        },
        {
          name: 'title',
          title: 'Main Title',
          type: 'string',
          description: 'e.g., "SUMITH ELECTRONICS"',
          validation: Rule => Rule.required()
        },
        {
          name: 'subtitle',
          title: 'Subtitle / Description',
          type: 'text',
          rows: 4,
          description: 'Main description text below the title'
        },
        {
          name: 'backgroundImage',
          title: 'Background Image',
          type: 'image',
          description: 'Full-screen background image for the hero section',
          options: {
            hotspot: true
          },
          validation: Rule => Rule.required()
        },
        {
          name: 'ctaLabel',
          title: 'CTA Button Text',
          type: 'string',
          description: 'e.g., "Book a Discovery Call"',
          initialValue: 'Book a Discovery Call'
        },
        {
          name: 'ctaHref',
          title: 'CTA Button Link',
          type: 'string',
          description: 'e.g., "/contact" or "https://example.com"',
          initialValue: '/contact'
        }
      ]
    }
  ],
  preview: {
    select: {
      title: 'hero.title',
      media: 'hero.backgroundImage'
    },
    prepare(selection) {
      const { title, media } = selection
      return {
        title: title || 'About Page',
        subtitle: 'Hero Section',
        media
      }
    }
  }
}
