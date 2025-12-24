import React from 'react';
import { getPayload } from 'payload';
import config from '@/payload.config';
import Link from 'next/link';

// Hardcoded agent ID for testing (replace with real auth in production)
const AGENT_ID = 'YOUR_AGENT_ID_HERE';

export default async function AgentDashboard() {
  const payload = await getPayload({ config });
  const { docs: leads } = await payload.find({
    collection: 'leads',
    where: { agent: { equals: AGENT_ID } },
    depth: 2,
    limit: 100,
    sort: '-createdAt',
  });

  // Stats
  const totalLeads = leads.length;
  const newLeads = leads.filter((lead: any) => lead.status === 'new').length;
  const closedDeals = leads.filter((lead: any) => lead.status === 'closed').length;

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-8">Agent Dashboard</h1>
      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
        <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center border border-gray-100">
          <span className="text-gray-500 text-sm mb-2">Total Leads</span>
          <span className="text-4xl font-bold text-blue-700">{totalLeads}</span>
        </div>
        <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center border border-gray-100">
          <span className="text-gray-500 text-sm mb-2">New Leads</span>
          <span className="text-4xl font-bold text-green-600">{newLeads}</span>
        </div>
        <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center border border-gray-100">
          <span className="text-gray-500 text-sm mb-2">Closed Deals</span>
          <span className="text-4xl font-bold text-emerald-700">{closedDeals}</span>
        </div>
      </div>
      {/* Lead Table */}
      <div className="bg-white rounded-xl shadow p-6 border border-gray-100">
        <h2 className="text-xl font-semibold mb-4">My Leads</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client Name</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Property</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {leads.map((lead: any) => (
                <tr key={lead.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium text-gray-900">{lead.fullName}</td>
                  <td className="px-4 py-3">
                    <span className="inline-block px-2 py-1 rounded text-xs font-semibold bg-gray-100 text-gray-700">
                      {lead.status.charAt(0).toUpperCase() + lead.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    {lead.property && lead.property.title ? (
                      <Link href={`/properties/${lead.property.slug}`} className="text-blue-600 hover:underline">
                        {lead.property.title}
                      </Link>
                    ) : (
                      <span className="text-gray-400">N/A</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
