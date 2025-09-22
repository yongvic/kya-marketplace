'use client';

import { useState } from 'react';
import { motion, Variants } from 'framer-motion';
import { FiCheckCircle, FiXCircle } from 'react-icons/fi';
import { useTranslations } from 'next-intl';
import { ChevronDown } from 'lucide-react';

// A static matrix defining which features are available for each plan.
// The order corresponds to [Commercial, Academic, Student].
const featureValues = [
  [true, true, true],   // Feature 1
  [true, true, true],   // Feature 2
  [true, true, true],   // ...
  [true, true, true],
  [true, true, true],
  [true, true, true],
  [true, true, true],
  [true, false, true],
  [true, true, false],
  [true, false, false],
  [true, false, false],
  [true, false, false],  // Feature 12
];

const TarifsSection = () => {
  const t = useTranslations('TarifsSection');
  // State to manage the selected duration for the student plan (e.g., 'month', 'week', 'day').
  const [studentPlan, setStudentPlan] = useState('month');

  // Fetch feature titles and student prices from the internationalization provider.
  const featureTitles = (t.raw('features') as string[]) || [];
  const studentPrices: { [key: string]: string; } = t.raw('plans.student.prices');

  // Assemble the complete data structure for the pricing table.
  // This combines translated text with the static feature matrix.
  const featuresData = {
    headers: [
      {
        name: t('plans.commercial.name'),
        duration: t('plans.commercial.duration'),
        price: t('plans.commercial.price'),
      },
      {
        name: t('plans.academic.name'),
        duration: t('plans.academic.duration'),
        price: t('plans.academic.price'),
      },
      {
        name: t('plans.student.name'),
        duration: t('plans.student.options.' + studentPlan),
        price: studentPrices[studentPlan], // Price dynamically changes based on state.
      },
    ],
    rows: featureTitles.map((title, index) => ({
      title,
      values: featureValues[index] || [false, false, false], // Map to the corresponding feature row.
    })),
  };

  // Framer Motion variants for staggered animations.
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 100, damping: 15 },
    },
  };

  // A reusable component for the student plan duration selector.
  const StudentPlanSelector = ({ isMobile = false }) => (
    <div className="relative mt-1">
      <select
        className={`w-full appearance-none bg-white border border-gray-200 rounded-md py-2 pl-3 pr-10 text-sm ${isMobile ? 'text-gray-500' : 'text-gray-500'} focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500`}
        value={studentPlan}
        onChange={(e) => setStudentPlan(e.target.value)}
      >
        <option value="month">{t('plans.student.options.month')}</option>
        <option value="week">{t('plans.student.options.week')}</option>
        <option value="day">{t('plans.student.options.day')}</option>
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
        <ChevronDown size={16} />
      </div>
    </div>
  );

  return (
    <section className="py-16 md:py-20 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
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

        {/* Desktop Pricing Table (visible on lg screens and up) */}
        <motion.div
          className="hidden lg:block overflow-x-auto rounded-2xl shadow-xl"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          <div className="min-w-full inline-block align-middle bg-white rounded-2xl overflow-hidden">
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
                  {header.name === 'Student' || header.name === 'Étudiant' ? (
                    <StudentPlanSelector />
                  ) : (
                    <p className="text-sm text-gray-500 mt-1 h-9 flex items-center justify-center">{header.duration}</p>
                  )}
                  <p className="font-bold text-2xl text-gray-800 my-2">{header.price}</p>
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

        {/* Mobile Pricing Cards (hidden on lg screens and up) */}
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
              <div className="p-6 bg-gray-50/70 text-center">
                <h3 className="font-bold text-xl text-teal-700">{header.name}</h3>
                {header.name === 'Student' || header.name === 'Étudiant' ? (
                  <StudentPlanSelector isMobile={true} />
                ) : (
                  <p className="text-sm text-gray-500 mt-1">{header.duration}</p>
                )}
                <p className="font-bold text-2xl text-gray-800 my-2">{header.price}</p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  className="mt-4 w-full bg-teal-500 hover:bg-teal-600 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
                >
                  {t('ctaButton')}
                </motion.button>
              </div>

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