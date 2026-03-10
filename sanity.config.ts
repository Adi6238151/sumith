import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import seofields from 'sanity-plugin-seofields'
import { schema } from './studio/schemaTypes'
import { structure } from './studio/schemaTypes/structure'
import { apiVersion, dataset, projectId } from './src/sanity/env'

export default defineConfig({
  name: 'default',
  title: 'Sumith Studio (Standalone)',
  projectId: '9aprodaz',
  dataset: 'production',
  basePath: '/', 
  schema,
  plugins: [
    structureTool({ structure }),
    seofields(),
    visionTool({ defaultApiVersion: apiVersion }),
  ],
})
