import { defineType, defineField } from "sanity";

export default defineType({
  name: "safetyTabSection",
  type: "document",
  title: "Safety Tabbed Section",
  fields: [
    defineField({
      name: "tabs",
      type: "array",
      title: "Tabs",
      of: [
        {
          type: "object",
          name: "tab",
          title: "Tab",
          fields: [
            defineField({ name: "tabTitle", type: "string", title: "Tab Title" }),
            defineField({ name: "title", type: "string", title: "Section Title" }),
            defineField({ name: "description", type: "text", title: "Description" }),
            defineField({ name: "image", type: "image", title: "Image" }),
          ],
        },
      ],
    }),
    defineField({ name: "seo", type: "seoFields", title: "SEO" }),
  ],
});
    