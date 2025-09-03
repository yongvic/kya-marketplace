'use client';

import { motion } from 'framer-motion';
import { FiCheckCircle, FiXCircle } from 'react-icons/fi';
import { useTranslations } from 'next-intl';

// Valeurs des fonctionnalités : [Commercial, Academic, Student]
const featureValues = [
  [true, false, true],
  [true, true, false],
  [true, false, false],
  [true, false, false],
  [true, false, false],
  [true, true, true],
  [true, true, true],
  [true, true, true],
  [true, true, true],
  [true, true, true],
  [true, true, true],
  [true, true, true],
];


const TarifsSection = () => {
  const t = useTranslations('TarifsSection');

  // ✅ Utilisation de t.raw() pour récupérer le tableau de fonctionnalités
  const featureTitles = (t.raw('features') as string[]) || [];

  const featuresData = {
    headers: [
      {
        name: t('plans.commercial.name'),
        duration: t('plans.commercial.duration'),
      },
      {
        name: t('plans.academic.name'),
        duration: t('plans.academic.duration'),
      },
      {
        name: t('plans.student.name'),
        duration: t('plans.student.duration'),
      },
    ],
    rows: featureTitles.map((title, index) => ({
      title,
      values: featureValues[index] || [false, false, false], // protection contre index out of bounds
    })),
  };

  type FeatureRow = (typeof featuresData.rows)[number];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (delay: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 80,
        damping: 15,
        delay,
      } as const,
    }),
  };

  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Titre */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            {t('title')}
          </h2>
          <p className="mt-3 text-gray-600 max-w-2xl mx-auto text-lg">
            {t('subtitle')}
          </p>
        </motion.div>

        {/* Tableau */}
        <motion.div
          className="overflow-x-auto rounded-2xl shadow-lg"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          <div className="min-w-full inline-block align-middle bg-white rounded-2xl overflow-hidden">
            {/* En-tête */}
            <motion.div
              custom={0}
              variants={itemVariants}
              className="grid grid-cols-4 gap-6 bg-gray-50 border-b border-gray-200 p-6"
            >
              <div className="col-span-1 text-left font-bold text-xl text-teal-700">
                {t('featureColumnHeader')}
              </div>
              {featuresData.headers.map((header, index) => (
                <div key={index} className="col-span-1 text-center">
                  <h3 className="font-bold text-xl text-teal-700">{header.name}</h3>
                  <p className="text-sm text-gray-500 mt-1">{header.duration}</p>
                  <motion.button
                    whileHover={{ scale: 1.05, boxShadow: '0 10px 20px rgba(20, 184, 166, 0.15)' }}
                    whileTap={{ scale: 0.98 }}
                    className="mt-4 w-full bg-teal-500 hover:bg-teal-600 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
                  >
                    {t('ctaButton')}
                  </motion.button>
                </div>
              ))}
            </motion.div>

            {/* Lignes des fonctionnalités */}
            {featuresData.rows.map((row: FeatureRow, rowIndex: number) => (
              <motion.div
                key={rowIndex}
                custom={0.1 + rowIndex * 0.08}
                variants={itemVariants}
                className="grid grid-cols-4 gap-6 items-center p-5 border-b border-gray-100 hover:bg-gray-25 transition-colors duration-200"
              >
                <div className="col-span-1 text-left text-gray-800 font-medium">
                  {row.title}
                </div>
                {row.values.map((value: boolean, colIndex: number) => (
                  <div key={colIndex} className="col-span-1 flex justify-center">
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                    >
                      {value ? (
                        <FiCheckCircle className="text-teal-500 text-2xl" />
                      ) : (
                        <FiXCircle className="text-red-500 text-2xl" />
                      )}
                    </motion.span>
                  </div>
                ))}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TarifsSection;