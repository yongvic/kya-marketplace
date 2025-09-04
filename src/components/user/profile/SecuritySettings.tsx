
'use client';

import { KeyRound, Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import { useTranslations } from 'next-intl';

const SecuritySettings = () => {
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const t = useTranslations('ProfilePage.securitySettings');

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-1">{t('title')}</h2>
      <p className="text-gray-500 mb-8">{t('subtitle')}</p>

      <form className="space-y-6 max-w-md">
        <div>
            <label htmlFor="current-password" className="block text-sm font-medium text-gray-700 mb-1">{t('currentPasswordLabel')}</label>
            <div className="relative">
                <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input type={showCurrent ? 'text' : 'password'} id="current-password" className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" />
                <button type="button" onClick={() => setShowCurrent(!showCurrent)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700">
                    {showCurrent ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
            </div>
        </div>
        <div>
            <label htmlFor="new-password" className="block text-sm font-medium text-gray-700 mb-1">{t('newPasswordLabel')}</label>
            <div className="relative">
                <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input type={showNew ? 'text' : 'password'} id="new-password" className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" />
                <button type="button" onClick={() => setShowNew(!showNew)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700">
                    {showNew ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
            </div>
        </div>
        <div>
            <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700 mb-1">{t('confirmPasswordLabel')}</label>
            <div className="relative">
                <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input type={showConfirm ? 'text' : 'password'} id="confirm-password" className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" />
                <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700">
                    {showConfirm ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
            </div>
        </div>
        
        <div className="pt-4 flex justify-end">
            <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-700 transition-transform hover:scale-105">
                {t('saveButton')}
            </button>
        </div>
      </form>
    </div>
  );
};

export default SecuritySettings;
