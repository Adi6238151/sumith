import { defineField, defineType } from 'sanity'
import { PackageIcon } from '@sanity/icons'

export const product = defineType({
  name: 'product',
  title: 'Product',
  type: 'document',
  icon: PackageIcon,
  fields: [
    // ========== BASIC INFO ==========
    defineField({
      name: 'productName',
      title: 'Product Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: 'modelNumbers',
      title: 'Model Numbers',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'List of model numbers (e.g., 1222, 233232)',
    }),

    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'productName',
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: 'shortDescription',
      title: 'Short Description',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.required().max(200),
    }),

    defineField({
      name: 'longDescription',
      title: 'Long Description',
      type: 'blockContent',
    }),

    // ========== IMAGES ==========
    defineField({
      name: 'featuredImage',
      title: 'Featured Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: 'productImages',
      title: 'Product Gallery Images',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          },
        },
      ],
    }),

    // ========== FEATURES ==========
    defineField({
      name: 'features',
      title: 'Features',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'featureTitle',
              type: 'string',
              title: 'Feature Title',
              validation: (rule) => rule.required(),
            },
            {
              name: 'featureDescription',
              type: 'text',
              title: 'Feature Description',
              rows: 3,
              validation: (rule) => rule.required(),
            },
            {
              name: 'icon',
              type: 'image',
              title: 'Feature Icon (Optional)',
            },
          ],
        },
      ],
    }),

    // ========== SPECIFICATIONS ==========
    defineField({
      name: 'specifications',
      title: 'Specifications',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'label',
              type: 'string',
              title: 'Specification Label',
              validation: (rule) => rule.required(),
            },
            {
              name: 'value',
              type: 'string',
              title: 'Specification Value',
              validation: (rule) => rule.required(),
            },
          ],
        },
      ],
    }),

    // ========== SUPPORT ==========
    defineField({
      name: 'support',
      title: 'Support Information',
      type: 'object',
      fields: [
        {
          name: 'supportText',
          type: 'blockContent',
          title: 'Support Content',
        },
        {
          name: 'downloadLinks',
          type: 'array',
          title: 'Download Links',
          of: [
            {
              type: 'object',
              fields: [
                {
                  name: 'linkTitle',
                  type: 'string',
                  title: 'Link Title',
                  validation: (rule) => rule.required(),
                },
                {
                  name: 'linkUrl',
                  type: 'url',
                  title: 'Link URL',
                  validation: (rule) => rule.required(),
                },
                {
                  name: 'fileType',
                  type: 'string',
                  title: 'File Type',
                  options: {
                    list: [
                      { title: 'PDF', value: 'PDF' },
                      { title: 'Document', value: 'Document' },
                      { title: 'Manual', value: 'Manual' },
                      { title: 'Datasheet', value: 'Datasheet' },
                      { title: 'Guide', value: 'Guide' },
                    ],
                  },
                },
              ],
            },
          ],
        },
      ],
    }),

    // ========== ORDERING ==========
    defineField({
      name: 'ordering',
      title: 'Ordering Information',
      type: 'object',
      fields: [
        {
          name: 'price',
          type: 'number',
          title: 'Price (USD)',
        },
        {
          name: 'availability',
          type: 'string',
          title: 'Availability Status',
          options: {
            list: [
              { title: 'In Stock', value: 'In Stock' },
              { title: 'Out of Stock', value: 'Out of Stock' },
              { title: 'Coming Soon', value: 'Coming Soon' },
            ],
          },
          validation: (rule) => rule.required(),
        },
        {
          name: 'orderingText',
          type: 'blockContent',
          title: 'Ordering Details',
        },
      ],
    }),

    // ========== SEO (INTEGRATED) ==========
    defineField({
      name: 'seo',
      title: 'SEO Settings',
      type: 'object',
      fields: [
        {
          name: 'metaTitle',
          title: 'Meta Title',
          type: 'string',
          description: 'Title for search engines (50-60 characters)',
          validation: (rule) =>
            rule.max(60).warning('Titles should be under 60 characters'),
        },
        {
          name: 'metaDescription',
          title: 'Meta Description',
          type: 'text',
          rows: 3,
          description: 'Description for search engines (150-160 characters)',
          validation: (rule) =>
            rule.max(160).warning('Descriptions should be under 160 characters'),
        },
        {
          name: 'metaKeywords',
          title: 'Meta Keywords',
          type: 'array',
          of: [{ type: 'string' }],
          description: 'Keywords related to this product',
        },
        {
          name: 'ogImage',
          title: 'Open Graph Image',
          type: 'image',
          description: 'Image shown when shared on social media',
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'productName',
      media: 'featuredImage',
      availability: 'ordering.availability',
    },
    prepare(selection: any) {
      const { title, availability } = selection
      return {
        title,
        subtitle: `Status: ${availability || 'Not set'}`,
        media: selection.media,
      }
    },
  },
})
