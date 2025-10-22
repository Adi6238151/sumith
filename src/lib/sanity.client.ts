import { createClient } from 'next-sanity'

export const sanity = createClient({
  projectId: '9aprodaz', // replace with your real projectId
  dataset: 'production',
  apiVersion: '2023-10-01', // or latest version
  useCdn: true
})
