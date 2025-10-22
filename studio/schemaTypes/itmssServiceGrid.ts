import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'itmssServiceGrid',
  type: 'document',
  title: 'ITMS Services Grid',
  fields: [
    defineField({
      name: 'heading',
      type: 'string',
      title: 'Main Heading',
      initialValue: "Next-Gen ITMS—Every Solution, One Platform"
    }),
    defineField({
      name: 'services',
      type: 'array',
      title: 'Services',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'name',
              type: 'string',
              title: 'Service Name'
            },
            {
              name: 'icon',
              type: 'string',
              title: 'Icon Name',
              options: {
                list: [
                  { title: "Dashboard", value: "MdDashboard" },
                  { title: "Credit Card", value: "MdCreditCard" },
                  { title: "Phone iPhone", value: "MdPhoneIphone" },
                  { title: "People", value: "MdPeopleAlt" },
                  { title: "Display", value: "MdDisplaySettings" },
                  { title: "Cloud", value: "MdCloud" },
                  { title: "Camera", value: "MdCamera" },
                  { title: "Settings Input", value: "MdSettingsInputComponent" },
                  { title: "Map", value: "MdMap" }
                ]
              }
            },
            {
              name: 'badge',
              type: 'string',
              title: 'Badge (Optional)'
            }
          ]
        }
      ]
    }),
    defineField({
      name: 'seo',
      type: 'seoFields',   // 🔥 Add this line
      title: 'SEO'
    })
  ]
})
