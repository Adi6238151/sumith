import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'sumithBenefits',
  type: 'document',
  title: 'Sumith ITS Benefits',
  fields: [
    defineField({
      name: 'heading',
      type: 'string',
      title: 'Main Heading',
      initialValue: "Why Choose Sumith’s ITS?",
    }),
    defineField({
      name: 'subtitle',
      type: 'string',
      title: 'Subtitle',
      initialValue: "Everything you need for a smarter, safer, more efficient fleet—automate, optimize, and grow with confidence.",
    }),
    defineField({
      name: 'benefits',
      type: 'array',
      title: 'Benefits',
      of: [
        {
          type: 'object',
          title: 'Benefit',
          fields: [
            {
              name: 'icon',
              type: 'string',
              title: 'Icon Name',
              description: 'Select matching Pi* icon for benefit card',
              options: {
                list: [
                  { title: 'Circuitry', value: 'PiCircuitry' },
                  { title: 'Monitor', value: 'PiMonitor' },
                  { title: 'Money', value: 'PiMoney' },
                  { title: 'Security Camera', value: 'PiSecurityCamera' },
                  { title: 'Seal Check', value: 'PiSealCheck' }
                ]
              }
            },
            {
              name: 'title',
              type: 'string',
              title: 'Title'
            },
            {
              name: 'desc',
              type: 'text',
              title: 'Description'
            }
          ]
        }
      ]
    }),
    defineField({
      name: 'seo',
      type: 'seoFields', // Provided by sanity-plugin-seofields
      title: 'SEO'
    })
  ],
})
