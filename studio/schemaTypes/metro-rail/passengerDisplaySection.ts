import { defineType, defineField } from "sanity";

export default defineType({
  name: "passengerDisplaySection",
  type: "document",
  title: "Passenger Information Display Section",
  fields: [
    defineField({
      name: "heading",
      type: "string",
      title: "Main Heading",
    }),
    defineField({
      name: "description",
      type: "text",
      title: "Description",
    }),
    defineField({
      name: "displays",
      type: "array",
      title: "Display Info Cards",
      of: [
        {
          type: "object",
          name: "display",
          title: "Display Info",
          fields: [
            defineField({ name: "image", type: "image", title: "Image" }),
            defineField({ name: "caption", type: "string", title: "Image Caption" }),
          ],
        },
      ],
    }),
    defineField({ name: "seo", type: "seoFields", title: "SEO" }),
  ],
});
