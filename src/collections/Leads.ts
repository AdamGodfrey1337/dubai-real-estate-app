import type { CollectionConfig } from 'payload';

export const Leads: CollectionConfig = {
  slug: 'leads',
  hooks: {
    afterChange: [
      async ({ doc, req, operation }) => {
        if (operation !== 'create' || !doc.property) return;

        // Fetch the property with assigned agent
        const property = await req.payload.findByID({
          collection: 'properties',
          id: doc.property,
          depth: 2,
          overrideAccess: false,
          req,
        });

        // Get the assigned agent ID from the property
        const agentId = property?.assignedAgent;
        if (!agentId) return;

        // Fetch the agent document
        const agent = await req.payload.findByID({
          collection: 'agents',
          id: agentId,
          depth: 0,
          overrideAccess: false,
          req,
        });

        // Log WhatsApp and message
        if (agent?.whatsapp) {
          console.log(`Agent WhatsApp: ${agent.whatsapp}`);
        }
        console.log(`New Lead for ${property.title}`);

        // --- Optional: Email notification example ---
        // Uncomment and configure if you have Resend or Nodemailer
        /*
        // Using Resend (https://resend.com/docs/send-with-nodejs)
        import { Resend } from 'resend';
        const resend = new Resend(process.env.RESEND_API_KEY);
        await resend.emails.send({
          from: 'noreply@yourdomain.com',
          to: agent.email, // Make sure agent has an email field
          subject: `New Lead for ${property.title}`,
          html: `<p>You have a new lead for <b>${property.title}</b>.</p>`
        });

        // Using Nodemailer (https://nodemailer.com/about/)
        import nodemailer from 'nodemailer';
        const transporter = nodemailer.createTransport({
          service: 'gmail', // or your email provider
          auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
          },
        });
        await transporter.sendMail({
          from: 'noreply@yourdomain.com',
          to: agent.email,
          subject: `New Lead for ${property.title}`,
          html: `<p>You have a new lead for <b>${property.title}</b>.</p>`
        });
        */
      },
    ],
  },
  admin: {
    useAsTitle: 'fullName',
    defaultColumns: ['fullName', 'email', 'phone', 'status', 'property', 'agent'],
    views: {
      // Kanban view for status, fallback to list if Kanban not supported
      list: {
        columns: ['fullName', 'status', 'property', 'agent'],
        groupBy: 'status',
      },
    },
  },
  fields: [
    {
      name: 'fullName',
      type: 'text',
      label: 'Full Name',
      required: true,
    },
    {
      name: 'email',
      type: 'email',
      required: true,
    },
    {
      name: 'phone',
      type: 'text',
    },
    {
      name: 'message',
      type: 'textarea',
    },
    {
      name: 'property',
      type: 'relationship',
      relationTo: 'properties',
      hasMany: false,
      label: 'Property',
    },
    {
      name: 'agent',
      type: 'relationship',
      relationTo: 'agents',
      hasMany: false,
      label: 'Agent',
    },
    {
      name: 'status',
      type: 'select',
      options: [
        { label: 'New', value: 'new' },
        { label: 'Contacted', value: 'contacted' },
        { label: 'Viewing', value: 'viewing' },
        { label: 'Negotiating', value: 'negotiating' },
        { label: 'Closed', value: 'closed' },
        { label: 'Lost', value: 'lost' },
      ],
      defaultValue: 'new',
      required: true,
    },
  ],
};
