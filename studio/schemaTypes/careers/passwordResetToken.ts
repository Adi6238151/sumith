export default {
  name: 'passwordResetToken',
  title: 'Password Reset Token',
  type: 'document',
  fields: [
    {
      name: 'user',
      title: 'User',
      type: 'reference',
      to: [{ type: 'customUser' }],
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'token',
      title: 'Hashed Token',
      type: 'string',
      hidden: true, // Internal only
    },
    {
      name: 'expiresAt',
      title: 'Expiration Date',
      type: 'datetime',
      validation: (Rule: any) => Rule.required(),
    },
  ],
  preview: {
    select: {
      title: 'user.name',
      subtitle: 'expiresAt',
    },
    prepare({ title, subtitle }: any) {
      return {
        title: title ? `Reset Token for ${title}` : 'Reset Token',
        subtitle: `Expires: ${new Date(subtitle).toLocaleString()}`,
      }
    }
  }
}
