
'use client';

import { UploadCloud, User, Mail } from 'lucide-react';
import { useTranslations } from 'next-intl';

const ProfileDetails = () => {
  const t = useTranslations('ProfilePage.profileDetails');

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-1">{t('title')}</h2>
      <p className="text-gray-500 mb-8">{t('subtitle')}</p>

      <div className="flex items-center gap-6 mb-8">
        <img
          src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
          alt="User avatar"
          className="w-24 h-24 rounded-full object-cover"
        />
        <div className="flex gap-4">
            <label htmlFor="avatar-upload" className="cursor-pointer bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition-colors flex items-center gap-2">
                <UploadCloud size={18} />
                {t('changeAvatar')}
            </label>
            <input type="file" id="avatar-upload" className="hidden" />
            <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors">
                {t('removeAvatar')}
            </button>
        </div>
      </div>

      <form className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">{t('usernameLabel')}</label>
                <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input type="text" id="username" defaultValue="John Doe" className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" />
                </div>
            </div>
            <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">{t('emailLabel')}</label>
                <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input type="email" id="email" defaultValue="john.doe@example.com" readOnly className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500 cursor-not-allowed" />
                </div>
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

export default ProfileDetails;
