import { CollectionConfig } from 'payload'

export const Properties: CollectionConfig = {
  slug: 'properties',
  admin: {
    useAsTitle: 'title', // Shows the property title in the list view
    defaultColumns: ['title', 'status', 'price', 'type'],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'refId',
      label: 'Property ID / Reference',
      type: 'text',
      unique: true,
      required: true,
    },
    {
      name: 'status',
      type: 'select',
      options: [
        { label: 'Ready', value: 'ready' },
        { label: 'Off-plan', value: 'off-plan' },
        { label: 'Exclusive', value: 'exclusive' },
        { label: 'Hot Deal', value: 'hot-deal' },
      ],
      required: true,
    },
    {
      name: 'type',
      type: 'select',
      options: [
        { label: 'Apartment', value: 'apartment' },
        { label: 'Villa', value: 'villa' },
        { label: 'Townhouse', value: 'townhouse' },
      ],
      required: true,
    },
    {
      name: 'price',
      label: 'Price (AED)',
      type: 'number',
      required: true,
    },
    {
      type: 'row', // Aligns fields horizontally in the admin UI
      fields: [
        { name: 'bedrooms', type: 'number' },
        { name: 'bathrooms', type: 'number' },
        { name: 'size', label: 'Size (sqft)', type: 'number' },
      ],
    },
    {
      name: 'location',
      type: 'group', // Nests fields within a keyed object
      fields: [
        { name: 'community', type: 'text' },
        { name: 'building', type: 'text' },
        {
          name: 'emirate',
          type: 'select',
          defaultValue: 'dubai',
          options: [
            { label: 'Dubai', value: 'dubai' },
            { label: 'Abu Dhabi', value: 'abu-dhabi' },
            { label: 'Sharjah', value: 'sharjah' },
          ],
        },
      ],
    },
    {
      name: 'featuredImage',
      type: 'upload',
      relationTo: 'media', // Connects to your media collection
      required: true,
    },
    {
      name: 'amenities',
      type: 'array', // Create a repeatable list of features
      fields: [
        { name: 'amenity', type: 'text' },
      ],
    },
    {
      name: 'assignedAgent',
      type: 'relationship',
      relationTo: 'agents',
      hasMany: false,
      label: 'Assigned Agent',
    },
  ],
}