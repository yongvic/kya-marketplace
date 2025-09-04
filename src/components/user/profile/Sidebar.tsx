import Image from 'next/image';
import { motion } from 'framer-motion';
import { ComponentType } from 'react';

interface SidebarProps {
  navItems: {
    id: string;
    label: string;
    icon: ComponentType<{ className?: string }>;
  }[];
  activeTab: string;
  setActiveTab: (id: string) => void;
}

const Sidebar = ({ navItems, activeTab, setActiveTab }: SidebarProps) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-4">
      <div className="flex items-center gap-4 p-4 border-b border-gray-100">
        <div className="relative">
          <Image
            width={64}
            height={64}
            src="/kya-soldesign.png"
            alt="User avatar"
            className="w-16 h-16 rounded-full object-cover border-4 border-gray-50"
          />
          <span className="absolute bottom-0 right-0 block h-4 w-4 rounded-full bg-green-400 border-2 border-white"></span>
        </div>
        <div>
          <p className="font-bold text-lg text-gray-800">John Doe</p>
          <p className="text-sm text-gray-500">john.doe@example.com</p>
        </div>
      </div>
      <nav className="mt-4">
        <ul>
          {navItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 text-left text-gray-600 rounded-lg transition-all duration-200 ease-in-out hover:bg-blue-50 hover:text-blue-600 ${activeTab === item.id ? 'bg-blue-50 text-blue-600 font-semibold' : ''
                  }`}
              >
                <item.icon className="w-5 h-5" />
                <span>{item.label}</span>
                {activeTab === item.id && (
                  <motion.div
                    layoutId="active-indicator"
                    className="absolute left-0 h-full w-1 bg-blue-600 rounded-r-full"
                    style={{ top: 0, bottom: 0, margin: 'auto 0' }}
                  />
                )}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
