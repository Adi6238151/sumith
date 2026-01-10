import { defineType } from 'sanity'

export default defineType({
  name: 'emailSettings',
  title: 'Email Settings',
  type: 'document',
  fields: [
    {
      name: 'recipientEmail',
      title: 'Recipient Email',
      type: 'string',
      description: 'Email address to receive contact form submissions',
      validation: (Rule) => Rule.required().email(),
    },
    {
      name: 'ccEmails',
      title: 'CC Email Addresses',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Additional email addresses to CC (optional)',
      validation: (Rule) => 
        Rule.custom((emails) => {
          if (!emails) return true
          const invalidEmails = (emails as string[]).filter(
            (email) => !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
          )
          return invalidEmails.length === 0 || 'All CC emails must be valid'
        }),
    },
    {
      name: 'replyToEmail',
      title: 'Reply-To Email',
      type: 'string',
      description: 'Email address for reply-to field',
      validation: (Rule) => Rule.email(),
    },
    {
      name: 'emailSubject',
      title: 'Email Subject',
      type: 'string',
      initialValue: 'New Contact Form Submission',
    },
    {
      name: 'autoReplyEnabled',
      title: 'Enable Auto-Reply',
      type: 'boolean',
      initialValue: false,
    },
    {
      name: 'autoReplySubject',
      title: 'Auto-Reply Subject',
      type: 'string',
      initialValue: 'Thank you for contacting us',
      hidden: ({ document }) => !document?.autoReplyEnabled,
    },
    {
      name: 'autoReplyMessage',
      title: 'Auto-Reply Message',
      type: 'text',
      rows: 5,
      hidden: ({ document }) => !document?.autoReplyEnabled,
    },
  ],
})
