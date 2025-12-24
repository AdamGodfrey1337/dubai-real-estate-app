import type { CollectionConfig } from 'payload';

export const Agents: CollectionConfig = {
  slug: 'agents',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'position', 'phone', 'whatsapp', 'reraNumber'],
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      label: 'Full Name',
      required: true,
    },
    {
      name: 'position',
      type: 'text',
      label: 'Position',
    },
    {
      name: 'phone',
      type: 'text',
      label: 'Phone',
    },
    {
      name: 'whatsapp',
      type: 'text',
      label: 'WhatsApp',
    },
    {
      name: 'reraNumber',
      type: 'text',
      label: 'RERA Number',
    },
    {
      name: 'profilePhoto',
      type: 'upload',
      relationTo: 'media',
      label: 'Profile Photo',
    },
  ],
};
