// productHero.ts
import { defineType, defineField } from "sanity";

export default defineType({
  name: "productHero",
  title: "Product Hero",
  type: "document",
  fields: [
    defineField({
      name: "label",
      title: "Label (SOLUTIONS)",
      type: "string",
      description: "Small label above main heading",
    }),
    defineField({
      name: "title",
      title: "Main Title",
      type: "string",
    }),
    defineField({
      name: "subtitle",
      title: "Subtitle",
      type: "string",
    }),
    defineField({
      name: "heroImage",
      title: "Hero Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "backgroundColor",
      title: "Background Color",
      type: "string",
      description: "Hex (default #020824 for dark navy blue)",
    }),
  ],
});
