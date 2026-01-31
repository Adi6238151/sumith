import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'viewer3DSection',
  title: '3D Viewer Section',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Section Title',
      type: 'string',
      initialValue: '360° Product View',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      initialValue: 'Rotate, zoom, and explore the product in 3D',
    }),
    defineField({
      name: 'modelFile',
      title: '3D Model File (GLB format)',
      type: 'file',
      description: '⚠️ Upload GLB file only. Convert STEP to GLB first using online converters.',
      options: {
        accept: '.glb,.gltf', // This already restricts file types
      },
      validation: (Rule) => Rule.required(), // ✅ Simplified validation - just check if file exists
    }),
    defineField({
      name: 'modelScale',
      title: 'Model Scale',
      type: 'number',
      description: 'Adjust the size of the 3D model (default: 1)',
      initialValue: 1,
      validation: (Rule) => Rule.min(0.1).max(10),
    }),
    defineField({
      name: 'autoRotate',
      title: 'Enable Auto Rotation',
      type: 'boolean',
      description: 'Automatically rotate the model',
      initialValue: true,
    }),
    defineField({
      name: 'backgroundColor',
      title: 'Background Color',
      type: 'string',
      description: 'Background color for the 3D viewer (optional)',
      options: {
        list: [
          { title: 'Light Gray', value: '#f8fafc' },
          { title: 'White', value: '#ffffff' },
          { title: 'Dark', value: '#1e293b' },
          { title: 'Blue Gradient', value: 'gradient-blue' },
        ],
      },
      initialValue: '#f8fafc',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      fileName: 'modelFile.asset.originalFilename',
    },
    prepare({ title, fileName }) {
      return {
        title: title || '3D Viewer Section',
        subtitle: fileName ? `📦 ${fileName}` : 'No model uploaded',
      };
    },
  },
});
