import React from 'react';
import Link from 'next/link';
import { getPayload } from 'payload';
import config from '@/payload.config';
import { getMediaUrl } from '@/utilities/getMediaUrl';

export default async function PropertiesPage() {
  const payload = await getPayload({ config });
  const { docs: properties } = await payload.find({
    collection: 'properties',
    depth: 2,
    limit: 100,
    sort: '-createdAt',
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Properties</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {properties.map((property: any) => (
          <div
            key={property.id}
            className="bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden flex flex-col"
          >
            {property.featuredImage && (
              <img
                src={getMediaUrl(property.featuredImage)}
                alt={property.title}
                className="w-full h-48 object-cover"
              />
            )}
            <div className="p-4 flex-1 flex flex-col">
              <h2 className="text-xl font-semibold mb-2">{property.title}</h2>
              <div className="text-lg text-green-700 font-bold mb-2">
                AED {property.price?.toLocaleString()}
              </div>
              <div className="mb-4 text-gray-600">
                {property.bedrooms ?? property.bedrooms === 0 ? `${property.bedrooms} Bedroom${property.bedrooms !== 1 ? 's' : ''}` : 'N/A'}
              </div>
              <Link
                href={`/properties/${property.slug}`}
                className="mt-auto inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
