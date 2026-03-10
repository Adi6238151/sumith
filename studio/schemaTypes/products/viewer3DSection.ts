import { defineType, defineField } from "sanity";

export default defineType({
  name: "viewer3DSection",
  title: "3D Viewer Section",
  type: "object",
  fields: [
    /* ─────────────────────────────
       Layout Control
    ───────────────────────────── */
    defineField({
      name: "useHeroLayout",
      title: "Use Hero-style Layout (Teltonika)",
      type: "boolean",
      description:
        "Enable Teltonika-style hero layout (title + subtitle + buttons on left, 3D model on right)",
      initialValue: true,
    }),

    /* ─────────────────────────────
       Text Content
    ───────────────────────────── */
    defineField({
      name: "title",
      title: "Main Title",
      type: "string",
      initialValue: "TELTONIKA DASHCAM",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "description",
      title: "Subtitle / Description",
      type: "text",
      rows: 3,
      initialValue: "Road video monitoring solution",
    }),

    defineField({
      name: "alternateTitle",
      title: "Alternate Title (Generic View)",
      type: "string",
      initialValue: "360° Product View",
      hidden: ({ parent }) => parent?.useHeroLayout,
    }),

    defineField({
      name: "alternateDescription",
      title: "Alternate Description (Generic View)",
      type: "text",
      rows: 3,
      initialValue: "Rotate, zoom, and explore the product in 3D",
      hidden: ({ parent }) => parent?.useHeroLayout,
    }),

    /* ─────────────────────────────
       Buttons
    ───────────────────────────── */
    defineField({
      name: "primaryButton",
      title: "Primary Button (ORDER NOW)",
      type: "object",
      fields: [
        defineField({
          name: "label",
          type: "string",
          initialValue: "ORDER NOW",
        }),
        defineField({
          name: "url",
          type: "url",
          title: "Button Link",
        }),
      ],
      hidden: ({ parent }) => !parent?.useHeroLayout,
    }),

    defineField({
      name: "secondaryButton",
      title: "Secondary Button (PRODUCT VIDEO)",
      type: "object",
      fields: [
        defineField({
          name: "label",
          type: "string",
          initialValue: "PRODUCT VIDEO",
        }),
        defineField({
          name: "url",
          type: "url",
          title: "Video URL (YouTube / MP4)",
        }),
      ],
      hidden: ({ parent }) => !parent?.useHeroLayout,
    }),

    /* ─────────────────────────────
       3D Model Settings
    ───────────────────────────── */
    defineField({
      name: "modelFile",
      title: "3D Model File (GLB format)",
      type: "file",
      description:
        "⚠️ Upload GLB/GLTF only. Convert STEP to GLB before uploading.",
      options: {
        accept: ".glb,.gltf",
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "modelScale",
      title: "Model Scale",
      type: "number",
      initialValue: 1,
      validation: (Rule) => Rule.min(0.1).max(10),
    }),

    defineField({
      name: "autoRotate",
      title: "Enable Auto Rotation",
      type: "boolean",
      initialValue: true,
    }),

    defineField({
      name: "backgroundColor",
      title: "Background Color",
      type: "string",
      options: {
        list: [
          { title: "White", value: "#ffffff" },
          { title: "Light Gray", value: "#f8fafc" },
          { title: "Dark", value: "#1e293b" },
        ],
      },
      initialValue: "#ffffff",
    }),
  ],

  preview: {
    select: {
      title: "title",
      fileName: "modelFile.asset.originalFilename",
    },
    prepare({ title, fileName }) {
      return {
        title: title || "3D Viewer Section",
        subtitle: fileName ? `📦 ${fileName}` : "No model uploaded",
      };
    },
  },
});
