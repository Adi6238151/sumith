console.log('[Sanity] PROJECT ID:', process.env.NEXT_PUBLIC_SANITY_PROJECT_ID)
console.log('[Sanity] DATASET:', process.env.NEXT_PUBLIC_SANITY_DATASET)


import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './src/sanity/schemaTypes' // Updated path

export default defineConfig({
  name: 'default',
  title: 'sumith',
  
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  
  basePath: '/studio',
  
  plugins: [structureTool(), visionTool()],
  
  schema: {
    types: schemaTypes,
  },
})
