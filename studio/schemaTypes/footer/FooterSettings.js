export default {
  name: 'footerSettings',
  title: 'Footer Settings',
  type: 'document',
  fields: [
    {
      name: 'heading',
      title: 'Main Heading',
      type: 'string',
      initialValue: "Let's Talk.",
      validation: (Rule) => Rule.required()
    },
    {
      name: 'locations',
      title: 'Office Locations',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'city', title: 'City/Country', type: 'string', validation: (Rule) => Rule.required() },
            { name: 'companyName', title: 'Company Name', type: 'string' },
            { name: 'addressLine1', title: 'Address Line 1', type: 'string' },
            { name: 'addressLine2', title: 'Address Line 2', type: 'string' },
            { name: 'addressLine3', title: 'Address Line 3', type: 'string' },
            { name: 'addressLine4', title: 'Address Line 4', type: 'string' },
            { name: 'email', title: 'Email', type: 'string', validation: (Rule) => Rule.email() },
            { name: 'phone', title: 'Phone', type: 'string' }
          ],
          preview: {
            select: { title: 'city', subtitle: 'companyName' }
          }
        }
      ],
      validation: (Rule) => Rule.required().min(1)
    },
    {
      name: 'navigationLinks',
      title: 'Navigation Links',
      type: 'object',
      fields: [
        {
          name: 'primaryLinks',
          title: 'Primary Links (Left Column)',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                { name: 'label', title: 'Label', type: 'string', validation: (Rule) => Rule.required() },
                { name: 'href', title: 'URL', type: 'string', validation: (Rule) => Rule.required() },
                {
                  name: 'count',
                  title: 'Count (Optional)',
                  type: 'string',
                  description: 'Small number displayed next to link (e.g., "12")'
                }
              ],
              preview: {
                select: { title: 'label', subtitle: 'href' }
              }
            }
          ]
        },
        {
          name: 'secondaryLinks',
          title: 'Secondary Links (Right Column)',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                { name: 'label', title: 'Label', type: 'string', validation: (Rule) => Rule.required() },
                { name: 'href', title: 'URL', type: 'string', validation: (Rule) => Rule.required() },
                {
                  name: 'count',
                  title: 'Count (Optional)',
                  type: 'string',
                  description: 'Small number displayed next to link'
                },
                {
                  name: 'showArrow',
                  title: 'Show Arrow',
                  type: 'boolean',
                  description: 'Display arrow icon next to link',
                  initialValue: false
                }
              ],
              preview: {
                select: { title: 'label', subtitle: 'href' }
              }
            }
          ]
        }
      ]
    },
    {
      name: 'socialLinks',
      title: 'Social Media Links',
      type: 'object',
      fields: [
        {
          name: 'facebook',
          title: 'Facebook URL',
          type: 'url',
          validation: (Rule) =>
            Rule.uri({
              scheme: ['http', 'https']
            })
        },
        {
          name: 'instagram',
          title: 'Instagram URL',
          type: 'url',
          validation: (Rule) =>
            Rule.uri({
              scheme: ['http', 'https']
            })
        },
        {
          name: 'twitter',
          title: 'Twitter/X URL',
          type: 'url',
          validation: (Rule) =>
            Rule.uri({
              scheme: ['http', 'https']
            })
        },
        {
          name: 'linkedin',
          title: 'LinkedIn URL',
          type: 'url',
          validation: (Rule) =>
            Rule.uri({
              scheme: ['http', 'https']
            })
        },
        {
          name: 'behance',
          title: 'Behance URL',
          type: 'url',
          validation: (Rule) =>
            Rule.uri({
              scheme: ['http', 'https']
            })
        }
      ]
    },
    {
      name: 'copyright',
      title: 'Copyright Text',
      type: 'string',
      initialValue: 'Copyright ©2026 Sumith Electronics Pvt Ltd. All Rights Reserved.',
      validation: (Rule) => Rule.required()
    },
    {
      name: 'footerLinks',
      title: 'Footer Bottom Links',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'label', title: 'Label', type: 'string', validation: (Rule) => Rule.required() },
            { name: 'href', title: 'URL', type: 'string', validation: (Rule) => Rule.required() }
          ],
          preview: {
            select: { title: 'label', subtitle: 'href' }
          }
        }
      ],
      description: 'Links displayed at bottom (e.g., Terms, Sitemap)'
    },
    {
      name: 'seo',
      title: 'SEO Settings',
      type: 'object',
      description: 'SEO settings for footer structured data',
      fields: [
        { name: 'organizationName', title: 'Organization Name', type: 'string', initialValue: 'Sumith Electronics' },
        { name: 'organizationDescription', title: 'Organization Description', type: 'text', rows: 3 },
        { name: 'foundingYear', title: 'Founding Year', type: 'string' },
        { name: 'email', title: 'Contact Email', type: 'string' },
        { name: 'phone', title: 'Contact Phone', type: 'string' }
      ]
    },
    // NEW: footer video (Earth zoom)
    {
      name: 'footerVideo',
      title: 'Footer Earth Zoom Video',
      type: 'object',
      fields: [
        {
          name: 'file',
          title: 'Video File',
          type: 'file',
          options: {
            accept: 'video/mp4,video/webm'
          },
          description: 'Upload a 16:9 video that zooms from Earth to the office location.'
        },
        {
          name: 'alt',
          title: 'Video Description',
          type: 'string',
          description: 'Short description for accessibility / SEO.'
        }
      ]
    }
  ],
  preview: {
    prepare() {
      return {
        title: 'Footer Settings'
      };
    }
  }
};
