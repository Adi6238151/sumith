    import { defineType, defineField } from 'sanity'

    export default defineType({
    name: 'customerLogoGrid',
    type: 'document',
    title: 'Customer Logo Grid',
    fields: [
        defineField({
        name: 'heading',
        type: 'string',
        title: 'Main Heading',
        initialValue: "Our Customers & Partners"
        }),
        defineField({
        name: 'oems',
        type: 'array',
        title: 'OEMs',
        of: [
            {
            type: 'object',
            fields: [
                { name: 'name', type: 'string', title: 'Name' },
                { name: 'logo', type: 'image', title: 'Logo Image' }
            ]
            }
        ]
        }),
        defineField({
        name: 'otherSegments',
        type: 'array',
        title: 'Other Segments',
        of: [
            {
            type: 'object',
            fields: [
                { name: 'name', type: 'string', title: 'Name' },
                { name: 'logo', type: 'image', title: 'Logo Image' }
            ]
            }
        ]
        }),
        defineField({
        name: 'seo',
        type: 'seoFields',
        title: 'SEO'
        })
    ]
    })
