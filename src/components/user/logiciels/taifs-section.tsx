'use client';

import { motion } from 'framer-motion';
import { FiCheckCircle, FiXCircle } from 'react-icons/fi';

// Données des fonctionnalités
const featuresData = {
  headers: ['Essentiel', 'Pro', 'Entreprise'] as const,
  rows: [
    {
      title: 'Génération de rapport général en PDF imagé',
      values: [true, true, true] as const,
    },
    {
      title: 'Génération de rapport général avec l\'offre financière',
      values: [false, true, true] as const,
    },
    {
      title: 'Évaluation financière du système dimensionné',
      values: [false, true, true] as const,
    },
    {
      title: 'Dimensionnement des sections de câbles',
      values: [true, true, true] as const,
    },
    {
      title: 'Ajout de nouveaux composants (modules, batteries, onduleurs)',
      values: [true, true, true] as const,
    },
    {
      title: 'Téléchargement des données météo de toute localité',
      values: [true, true, true] as const,
    },
  ],
};

// Typage des lignes
type FeatureRow = typeof featuresData.rows[number];

const TarifsSection = () => {
  // Animation du conteneur
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  // Animation des éléments (avec delay personnalisé via `custom`)
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (delay: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring' as const,
        stiffness: 80,
        damping: 15,
        delay,
      },
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
          className="text-center mb-14"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
            Des Fonctionnalités Puissantes à Votre Portée
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Comparez nos offres et trouvez celle qui correspond parfaitement à vos besoins.
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
            {/* En-têtes */}
            <motion.div
              custom={0}
              variants={itemVariants}
              className="grid grid-cols-4 gap-4 bg-white border-b border-gray-200"
            >
              <div className="p-6 text-left font-semibold text-xl text-gray-800 self-end">
                Fonctionnalités
              </div>
              {featuresData.headers.map((header, index) => (
                <div key={index} className="p-6">
                  <h3 className="text-2xl font-bold text-teal-600">{header}</h3>
                  <motion.button
                    whileHover={{ scale: 1.05, boxShadow: '0 10px 20px rgba(20, 184, 166, 0.15)' }}
                    whileTap={{ scale: 0.98 }}
                    className="mt-3 w-full bg-teal-50 text-teal-700 font-semibold py-3 px-5 rounded-xl border border-teal-100 hover:bg-teal-100 transition-colors duration-200"
                  >
                    En profiter
                  </motion.button>
                </div>
              ))}
            </motion.div>

            {/* Lignes */}
            {featuresData.rows.map((row: FeatureRow, rowIndex: number) => (
              <motion.div
                key={rowIndex}
                custom={0.1 + rowIndex * 0.08} // ← delay personnalisé
                variants={itemVariants}
                className="grid grid-cols-4 gap-4 items-center p-6 border-b border-gray-100 hover:bg-gray-50 transition-colors duration-200"
              >
                <div className="text-left font-medium text-gray-800">{row.title}</div>
                {row.values.map((value: boolean, valueIndex: number) => (
                  <div key={valueIndex} className="flex justify-center">
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                    >
                      {value ? (
                        <FiCheckCircle className="text-teal-500 text-2xl" />
                      ) : (
                        <FiXCircle className="text-gray-300 text-2xl" />
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