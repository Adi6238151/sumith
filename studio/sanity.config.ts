'use client'

/**
 * This configuration is used to for the Sanity Studio that’s mounted on the `\src\app\studio\[[...tool]]\page.tsx` route
 */
import {apiVersion} from '../src/sanity/env'
import {visionTool} from '@sanity/vision'
import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import seofields from 'sanity-plugin-seofields'

// Go to https://www.sanity.io/docs/api-versioning to learn how API versioning works
import {schema} from './schemaTypes' 
import {structure} from './schemaTypes/structure'

export default defineConfig({
  basePath: '/studio',
  projectId : '9aprodaz',
  dataset :  'production',
  // Add and edit the content schema in the './sanity/schemaTypes' folder
  schema,
  plugins: [
    structureTool({structure}),
     seofields(),
    // Vision is for querying with GROQ from inside the Studio
    // https://www.sanity.io/docs/the-vision-plugin
    visionTool({defaultApiVersion: apiVersion}),
  ],
})
