export default {
  name: 'jobApplication',
  title: 'Job Application',
  type: 'document',
  fields: [
    {
      name: 'candidate',
      title: 'Candidate',
      type: 'reference',
      to: [{ type: 'customUser' }],
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'job',
      title: 'Job Posting',
      type: 'reference',
      to: [{ type: 'jobPosting' }],
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'resume',
      title: 'Resume',
      type: 'file',
      options: {
        accept: '.pdf,.doc,.docx',
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'Pending', value: 'pending' },
          { title: 'Under Review', value: 'review' },
          { title: 'Interviewing', value: 'interviewing' },
          { title: 'Rejected', value: 'rejected' },
          { title: 'Hired', value: 'hired' },
        ]
      },
      initialValue: 'pending',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'appliedDate',
      title: 'Applied Date',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    },
  ],
  preview: {
    select: {
      title: 'candidate.name',
      subtitle: 'job.title',
      status: 'status'
    },
    prepare({ title, subtitle, status }: any) {
      return {
        title: `${title || 'Unknown'} - ${status.toUpperCase()}`,
        subtitle: `Applied for: ${subtitle || 'Unknown'}`,
      }
    }
  }
}
