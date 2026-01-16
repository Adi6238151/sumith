// /schemas/aboutTimeline.ts
import { defineType, defineField } from "sanity"

export default defineType({
  name: "aboutTimeline",
  title: "About – Company Journey",
  type: "document",
  fields: [
    defineField({
      name: "heading",
      title: "Section Heading",
      type: "string",
      description: "Main title above the timeline, e.g. “Our Journey So Far”.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "eyebrow",
      title: "Eyebrow / Label",
      type: "string",
      description: "Small label above heading, e.g. “SINCE 2010”.",
    }),
    defineField({
      name: "intro",
      title: "Intro Text",
      type: "text",
      rows: 3,
      description: "Short description for this section.",
    }),
    defineField({
      name: "timelineItems",
      title: "Timeline Items",
      type: "array",
      of: [
        defineField({
          name: "timelineItem",
          title: "Timeline Item",
          type: "object",
          fields: [
            defineField({
              name: "year",
              title: "Year / Label",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "title",
              title: "Headline",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "summary",
              title: "Summary",
              type: "text",
              rows: 3,
            }),
            defineField({
              name: "highlight",
              title: "Key Metric / Highlight",
              type: "string",
              description: "Optional short highlight, e.g. “First 1000 buses deployed”.",
            }),
          ],
          preview: {
            select: { title: "title", subtitle: "year" },
          },
        }),
      ],
      validation: (Rule) => Rule.min(2).required(),
    }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "object",
      fields: [
        defineField({
          name: "title",
          title: "SEO Title",
          type: "string",
        }),
        defineField({
          name: "description",
          title: "SEO Description",
          type: "text",
          rows: 2,
        }),
      ],
    }),
  ],
  preview: {
    select: { title: "heading" },
    prepare(selection) {
      return {
        title: selection.title || "About – Company Journey",
      }
    },
  },
})
