export default {
  name: 'jobPosting',
  title: 'Job Posting',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Job Title',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'department',
      title: 'Department',
      type: 'string',
      options: {
        list: [
          { title: 'Engineering', value: 'engineering' },
          { title: 'Sales', value: 'sales' },
          { title: 'Marketing', value: 'marketing' },
          { title: 'Human Resources', value: 'hr' },
          { title: 'Operations', value: 'operations' },
          { title: 'Other', value: 'other' }
        ]
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'location',
      title: 'Location',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'employmentType',
      title: 'Employment Type',
      type: 'string',
      options: {
        list: [
          { title: 'Full-time', value: 'full-time' },
          { title: 'Part-time', value: 'part-time' },
          { title: 'Contract', value: 'contract' },
          { title: 'Internship', value: 'internship' },
        ]
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'description',
      title: 'Job Description',
      type: 'text',
      rows: 5,
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'requirements',
      title: 'Requirements',
      type: 'array',
      of: [{ type: 'string' }],
    },
    {
      name: 'isActive',
      title: 'Is Active',
      type: 'boolean',
      initialValue: true,
      description: 'Toggle to hide this posting from the career page without deleting it.',
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'department',
      isActive: 'isActive'
    },
    prepare({ title, subtitle, isActive }: any) {
      return {
        title,
        subtitle: `${subtitle} | ${isActive ? 'Active' : 'Inactive'}`,
      }
    }
  }
}
