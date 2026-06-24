import React from 'react';
import { motion } from 'framer-motion';
import Container from '../../../components/common/Container';
import CategoryCard from './CategoryCard';

export const CategoriesSection = ({ onSelectCategory }) => {
  const categoriesList = [
    { title: 'Autism', iconName: 'Brain', filterName: 'Autism' },
    { title: 'ADHD', iconName: 'Zap', filterName: 'ADHD' },
    { title: 'Developmental Delay', iconName: 'Hourglass', filterName: 'Development' },
    { title: 'Speech Development', iconName: 'MessageSquare', filterName: 'Speech' },
    { title: 'Parent Coaching', iconName: 'Users', filterName: 'Parenting' },
    { title: 'Learning Disabilities', iconName: 'BookOpen', filterName: 'Learning' },
    { title: 'Positive Parenting', iconName: 'HeartHandshake', filterName: 'Parenting' },
    { title: 'Early Intervention', iconName: 'Sprout', filterName: 'Early Intervention' },
    { title: 'Child Nutrition', iconName: 'Apple', filterName: 'Development' },
    { title: 'Success Stories', iconName: 'Star', filterName: 'All' },
  ];

  const handleCategoryClick = (filterName) => {
    onSelectCategory(filterName);
    // Smooth scroll back to top of listing/articles
    const element = document.getElementById('articles-listing-anchor');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Stagger animation container
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
  };

  return (
    <section className="py-16 bg-white w-full overflow-hidden select-none">
      <Container>
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-800 font-display tracking-tight">
            Explore by Category
          </h2>
          <p className="text-slate-500 text-sm font-medium">
            Browse our curated collections of resources and guides tailored to your specific needs.
          </p>
        </div>

        {/* 5-Column Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-40px' }}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-5"
        >
          {categoriesList.map((cat, idx) => (
            <motion.div key={idx} variants={itemVariants} className="flex">
              <CategoryCard
                title={cat.title}
                iconName={cat.iconName}
                onClick={() => handleCategoryClick(cat.filterName)}
              />
            </motion.div>
          ))}
        </motion.div>

      </Container>
    </section>
  );
};

export default CategoriesSection;
