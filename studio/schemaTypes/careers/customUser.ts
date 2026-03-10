export default {
  name: 'customUser',
  title: 'User',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Full Name',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'email',
      title: 'Email Address',
      type: 'string',
      validation: (Rule: any) => Rule.required().email(),
    },
    {
      name: 'passwordHash',
      title: 'Password Hash',
      type: 'string',
      hidden: true, // Only accessible via backend API, not in Studio UI
    },
    {
      name: 'role',
      title: 'Role',
      type: 'string',
      options: {
        list: [
          { title: 'Candidate', value: 'candidate' },
          { title: 'HR', value: 'hr' },
          { title: 'Admin', value: 'admin' },
        ]
      },
      initialValue: 'candidate',
      validation: (Rule: any) => Rule.required(),
    },
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'email',
      role: 'role'
    },
    prepare({ title, subtitle, role }: any) {
      return {
        title,
        subtitle: `${subtitle} | Role: ${role ? role.toUpperCase() : 'UNKNOWN'}`,
      }
    }
  }
}
