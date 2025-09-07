'use client';

// CORRECTION : Importer le type "Variants"
import { motion, Variants } from 'framer-motion';
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
      values: featureValues[index] || [false, false, false],
    })),
  };

  // CORRECTION : Appliquer le type Variants
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  // CORRECTION : Appliquer le type Variants
  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 100, damping: 15 },
    },
  };

  return (
    <section className="py-16 md:py-20 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Titre */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            {t('title')}
          </h2>
          <p className="mt-3 text-gray-600 max-w-2xl mx-auto text-base md:text-lg">
            {t('subtitle')}
          </p>
        </motion.div>

        {/* ----- VUE DESKTOP (TABLEAU) ----- */}
        <motion.div
          className="hidden lg:block overflow-x-auto rounded-2xl shadow-xl"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          <div className="min-w-full inline-block align-middle bg-white rounded-2xl overflow-hidden">
            {/* En-tête du tableau */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-4 gap-6 bg-gray-50/70 border-b border-gray-200 p-6"
            >
              <div className="col-span-1 flex items-center font-bold text-xl text-teal-700">
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

            {/* Lignes du tableau */}
            {featuresData.rows.map((row, rowIndex) => (
              <motion.div
                key={rowIndex}
                variants={itemVariants}
                className="grid grid-cols-4 gap-6 items-center p-5 border-b border-gray-100 last:border-b-0 hover:bg-gray-50 transition-colors duration-200"
              >
                <div className="col-span-1 text-left text-gray-800 font-medium">
                  {row.title}
                </div>
                {row.values.map((value, colIndex) => (
                  <div key={colIndex} className="col-span-1 flex justify-center">
                    {value ? (
                      <FiCheckCircle className="text-teal-500 text-2xl" />
                    ) : (
                      <FiXCircle className="text-red-400 text-2xl" />
                    )}
                  </div>
                ))}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ----- VUE MOBILE & TABLETTE (CARTES) ----- */}
        <motion.div
          className="block lg:hidden space-y-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {featuresData.headers.map((header, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-white rounded-2xl shadow-xl overflow-hidden"
            >
              {/* En-tête de la carte */}
              <div className="p-6 bg-gray-50/70 text-center">
                <h3 className="font-bold text-xl text-teal-700">{header.name}</h3>
                <p className="text-sm text-gray-500 mt-1">{header.duration}</p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  className="mt-4 w-full bg-teal-500 hover:bg-teal-600 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
                >
                  {t('ctaButton')}
                </motion.button>
              </div>

              {/* Liste des fonctionnalités de la carte */}
              <div className="p-6 space-y-4">
                {featuresData.rows.map((row, rowIndex) => (
                  <div key={rowIndex} className="flex justify-between items-center text-sm">
                    <span className="text-gray-700">{row.title}</span>
                    {row.values[index] ? (
                      <FiCheckCircle className="text-teal-500 text-xl flex-shrink-0" />
                    ) : (
                      <FiXCircle className="text-red-400 text-xl flex-shrink-0" />
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};

export default TarifsSection;