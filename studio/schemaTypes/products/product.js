// studio/schemaTypes/products/product.ts
import { defineType, defineField, defineArrayMember } from "sanity";

export const product = defineType({
  name: "product",
  title: "Product",
  type: "document",
  fields: [
    /* -----------------------------------------------------
     *  CARD / LISTING FIELDS
     * ----------------------------------------------------- */
    defineField({
      name: "name",
      title: "Product Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "name",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "categoryLabel",
      title: "Category label (card heading block)",
      type: "string",
      description:
        "e.g. Driver Information and Connected Vehicle Solutions, LCD, etc.",
    }),

    defineField({
      name: "excerpt",
      title: "Short teaser text for card",
      type: "text",
      rows: 3,
    }),

    defineField({
      name: "image",
      title: "Main product image",
      type: "image",
      options: { hotspot: true },
    }),

    /* -----------------------------------------------------
     *  CARD STYLING
     * ----------------------------------------------------- */
    defineField({
      name: "cardColor",
      title: "Card background color",
      type: "string",
      description: "Hex or CSS color for default card (e.g. #1D7DFF).",
    }),

    defineField({
      name: "hoverCardColor",
      title: "Card background color (hover)",
      type: "string",
      description: "Hex or CSS color when card is hovered.",
    }),

    defineField({
      name: "accentColor",
      title: "Accent color (Explore arrow, highlights)",
      type: "string",
    }),

    /* -----------------------------------------------------
     *  DETAIL PAGE (LEGACY / SIMPLE FIELDS)
     *  (Keep these if you rely on them elsewhere, or for simple pages)
     * ----------------------------------------------------- */
    defineField({
      name: "intro",
      title: "Intro paragraph (detail page)",
      type: "text",
      rows: 4,
    }),

    defineField({
      name: "featuresTitle",
      title: "Features heading",
      type: "string",
      initialValue: "Salient Features",
    }),

    defineField({
      name: "features",
      title: "Salient Features (Simple List)",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({
              name: "label",
              title: "Feature label",
              type: "string",
            }),
          ],
        }),
      ],
    }),

    defineField({
      name: "specifications",
      title: "Specifications (Simple Rich Text)",
      type: "array",
      of: [{ type: "block" }],
    }),

    /* -----------------------------------------------------
     *  DETAIL PAGE (ADVANCED PAGE BUILDER)
     *  ✅ SINGLE sections field with ALL section types
     * ----------------------------------------------------- */
    defineField({
      name: "sections",
      title: "Detail Page Sections (Page Builder)",
      description: "Add sections here to build the full detail page (Features, Specs, 3D Viewer, etc.)",
      type: "array",
      of: [
        defineArrayMember({ type: "featureSection" }),
        defineArrayMember({ type: "specSection" }),
        defineArrayMember({ type: "viewer3DSection" }), // ✅ Added 3D viewer
        // defineArrayMember({ type: "orderingSection" }),
        // defineArrayMember({ type: "trackersSection" }),
      ],
    }),

    defineField({
      name: "order",
      title: "Display order (List Page)",
      type: "number",
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "categoryLabel",
      media: "image",
    },
  },
});
