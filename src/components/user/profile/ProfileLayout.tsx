'use client';

import { useState } from 'react';
import Sidebar from './Sidebar';
import ProfileDetails from './ProfileDetails';
import SecuritySettings from './SecuritySettings';
import PurchaseHistory from './PurchaseHistory';
import { User, KeyRound, History } from 'lucide-react';
import { useTranslations } from 'next-intl';

type NavItem = 'profile' | 'security' | 'history';

const ProfileLayout = () => {
  const [activeTab, setActiveTab] = useState<NavItem>('profile');
  const t = useTranslations('ProfilePage.sidebar');

  const navItems = [
    { id: 'profile', label: t('profile'), icon: User },
    { id: 'security', label: t('security'), icon: KeyRound },
    { id: 'history', label: t('history'), icon: History },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'profile':
        return <ProfileDetails />;
      case 'security':
        return <SecuritySettings />;
      case 'history':
        return <PurchaseHistory />;
      default:
        return <ProfileDetails />;
    }
  };

  return (
    <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="lg:grid lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-3">
          <Sidebar
            navItems={navItems}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
        </div>
        <div className="lg:col-span-9 mt-8 lg:mt-0">
          <div className="bg-white rounded-2xl shadow-lg transition-all duration-300">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileLayout;
