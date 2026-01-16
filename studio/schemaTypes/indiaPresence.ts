import { defineType, defineField } from "sanity"

export default defineType({
  name: "indiaPresence",
  title: "India Presence",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Section Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "subtitle",
      title: "Subtitle",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "states",
      title: "States",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "stateId",
              title: "State ID (SVG)",
              type: "string",
              description: "Must match SVG path ID: IN-TG, IN-KA, IN-MH, IN-AP, IN-TN, IN-KL, etc.",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "name",
              title: "State Name",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "heading",
              title: "Project Heading",
              type: "string",
            }),
            defineField({
              name: "bullets",
              title: "Highlights",
              type: "array",
              of: [{ type: "string" }],
            }),
          ],
          preview: {
            select: { title: "name", subtitle: "stateId" },
          },
        },
      ],
    }),
  ],
  preview: {
    select: { title: "title" },
  },
})
