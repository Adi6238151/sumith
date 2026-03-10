import { defineType, defineField, defineArrayMember } from "sanity";

export const specSection = defineType({
  name: "specSection",
  title: "Specifications Section",
  type: "object",
  fields: [
    defineField({
      name: "items",
      title: "Specification Groups",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "specGroup",
          title: "Spec Group",
          fields: [
            defineField({
              name: "title",
              title: "Group Title (e.g. Power, Physical specification)",
              type: "string",
            }),
            defineField({
              name: "specs",
              title: "Specifications",
              type: "array",
              of: [
                defineArrayMember({
                  type: "object",
                  fields: [
                    { name: "label", type: "string", title: "Label (e.g., Input voltage range)" },
                    { name: "value", type: "string", title: "Value (e.g., 9 – 36 V)" },
                  ],
                }),
              ],
            }),
          ],
          preview: {
            select: {
              title: "title",
            },
          },
        }),
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: "Product Specifications",
      };
    },
  },
});
