
'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

interface ResourceCardProps {
  title: string;
  category: string;
  description: string;
  link: string;
  imageUrl: string;
}

const ResourceCard: React.FC<ResourceCardProps> = ({ title, category, description, link, imageUrl }) => {
  return (
    <motion.div
      whileHover={{ y: -5, boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.1)' }}
      transition={{ duration: 0.3 }}
      className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg"
    >
      <Link href={link} target="_blank" rel="noopener noreferrer">
        <div className="relative h-48 w-full">
          <Image
            src={imageUrl}
            alt={title}
            fill
            style={{ objectFit: 'cover' }}
            className="transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <div className="p-6">
          <p className="text-sm text-kya-green dark:text-kya-green font-semibold mb-2">{category}</p>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{title}</h3>
          <p className="text-gray-600 dark:text-gray-300 text-base">{description}</p>
        </div>
      </Link>
    </motion.div>
  );
};

export default ResourceCard;
