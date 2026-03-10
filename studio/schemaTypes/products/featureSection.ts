import { defineType, defineField } from "sanity";

export const featureSection = defineType({
  name: "featureSection",
  title: "Feature Section",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Feature Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "image",
      title: "Feature Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "position",
      title: "Image Position",
      type: "string",
      options: {
        list: [
          { title: "Left", value: "left" },
          { title: "Right", value: "right" },
        ],
        layout: "radio",
      },
      initialValue: "left",
    }),
  ],
  preview: {
    select: {
      title: "title",
      media: "image",
    },
  },
});
