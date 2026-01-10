export default {
  name: 'aboutMissionVision',
  title: 'About Mission & Vision',
  type: 'document',
  fields: [
    {
      name: 'mission',
      title: 'Mission Statement',
      type: 'text',
      rows: 5,
      description: 'Describe your company mission',
      validation: (Rule) => Rule.required().min(50).max(500)
    },
    {
      name: 'vision',
      title: 'Vision Statement',
      type: 'text',
      rows: 5,
      description: 'Describe your company vision',
      validation: (Rule) => Rule.required().min(50).max(500)
    }
  ],
  preview: {
    prepare() {
      return {
        title: 'Mission & Vision Section'
      }
    }
  }
}
