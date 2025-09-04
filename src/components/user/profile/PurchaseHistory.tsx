
'use client';

import { useState } from 'react';
import { Search, FileText } from 'lucide-react';
import { useTranslations } from 'next-intl';

const mockLicenses = [
  { id: 'KYA-PRO-001', software: 'SolDesign', purchaseDate: '2024-08-15', expiryDate: '2025-08-15', status: 'active' },
  { id: 'KYA-SOP-002', software: 'SOP', purchaseDate: '2024-07-20', expiryDate: '2025-07-20', status: 'active' },
  { id: 'KYA-PRO-003', software: 'SolDesign', purchaseDate: '2023-06-01', expiryDate: '2024-06-01', status: 'expired' },
  { id: 'KYA-DEV-004', software: 'DevSuite', purchaseDate: '2024-05-10', expiryDate: '2025-05-10', status: 'active' },
  { id: 'KYA-SOP-005', software: 'SOP', purchaseDate: '2022-11-30', expiryDate: '2023-11-30', status: 'expired' },
];

const PurchaseHistory = () => {
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const t = useTranslations('ProfilePage.purchaseHistory');

  const filteredLicenses = mockLicenses
    .filter(license => filter === 'all' || license.status === filter)
    .filter(license => 
      license.software.toLowerCase().includes(searchTerm.toLowerCase()) ||
      license.id.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const StatusPill = ({ status }: { status: string }) => {
    const baseClasses = "px-3 py-1 text-xs font-medium rounded-full inline-block";
    if (status === 'active') {
      return <span className={`bg-green-100 text-green-800 ${baseClasses}`}>{t('statusActive')}</span>;
    }
    return <span className={`bg-red-100 text-red-800 ${baseClasses}`}>{t('statusExpired')}</span>;
  };

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-1">{t('title')}</h2>
      <p className="text-gray-500 mb-8">{t('subtitle')}</p>

      <div className="flex flex-col md:flex-row gap-4 justify-between mb-6">
        <div className="relative w-full md:max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input 
            type="text" 
            placeholder={t('searchPlaceholder')}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <select 
            className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-blue-500 focus:border-blue-500"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">{t('filterAll')}</option>
            <option value="active">{t('filterActive')}</option>
            <option value="expired">{t('filterExpired')}</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('tableHeaderSoftware')}</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('tableHeaderLicenseKey')}</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('tableHeaderExpiry')}</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('tableHeaderStatus')}</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('tableHeaderAction')}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredLicenses.map(license => (
              <tr key={license.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-gray-900">{license.software}</div>
                    <div className="text-sm text-gray-500">{t('purchasedOn')} {license.purchaseDate}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-mono">{license.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{license.expiryDate}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <StatusPill status={license.status} />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button className="text-blue-600 hover:text-blue-800 flex items-center gap-1">
                    <FileText size={16} />
                    {t('actionDetails')}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {filteredLicenses.length === 0 && (
        <div className="text-center py-12">
            <p className="text-gray-500">{t('noResults')}</p>
        </div>
      )}
    </div>
  );
};

export default PurchaseHistory;
