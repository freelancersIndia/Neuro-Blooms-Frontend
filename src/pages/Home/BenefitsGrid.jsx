import React from 'react';
import { motion } from 'framer-motion';
import { Lightbulb, Users, Shield, Heart, TrendingUp } from 'lucide-react';
import BenefitCard from './BenefitCard';

const LeafIcon = ({ className }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M17 8C8 10 5 16 5 21C5 21 8.5 19.5 12 17C15.5 14.5 17 11 17 8Z" />
    <path d="M19 4C13.5 5.5 11 9.5 10 13C12.5 11.5 15.5 9 17 7.5C18.5 6 19 4 19 4Z" opacity="0.7" />
  </svg>
);

export const BenefitsGrid = () => {
  const benefits = [
    {
      id: 1,
      icon: Lightbulb,
      title: "Practical Strategies",
      description: "Learn simple, effective techniques you can use every day.",
      accentClass: "bg-emerald-500",
      iconBgClass: "bg-emerald-50",
      iconTextClass: "text-emerald-600",
      colSpan: "col-span-1 md:col-span-2 lg:col-span-1"
    },
    {
      id: 2,
      icon: Users,
      title: "Deeper Understanding",
      description: "Understand your child's needs, strengths, and behaviors better.",
      accentClass: "bg-orange-500",
      iconBgClass: "bg-orange-50",
      iconTextClass: "text-orange-600",
      colSpan: "col-span-1 md:col-span-2 lg:col-span-1"
    },
    {
      id: 3,
      icon: Shield,
      title: "Confidence Building",
      description: "Feel confident in supporting your child's growth and handling challenges.",
      accentClass: "bg-blue-500",
      iconBgClass: "bg-blue-50",
      iconTextClass: "text-blue-600",
      colSpan: "col-span-1 md:col-span-2 lg:col-span-1"
    },
    {
      id: 4,
      icon: Heart,
      title: "Stronger Connection",
      description: "Build a stronger bond through positive interaction and communication.",
      accentClass: "bg-purple-500",
      iconBgClass: "bg-purple-50",
      iconTextClass: "text-purple-600",
      colSpan: "col-span-1 md:col-span-3 lg:col-span-1"
    },
    {
      id: 5,
      icon: TrendingUp,
      title: "Better Outcomes",
      description: "Consistent support at home leads to faster progress and lasting results.",
      accentClass: "bg-amber-500",
      iconBgClass: "bg-amber-50",
      iconTextClass: "text-amber-600",
      colSpan: "col-span-1 md:col-span-3 lg:col-span-1"
    }
  ];

  // Container animation
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="flex flex-col space-y-5 lg:space-y-6 w-full">
      
      {/* Centered Heading */}
      <div className="flex items-center justify-center gap-3 text-center">
        <LeafIcon className="w-5 h-5 md:w-6 md:h-6 text-[#A5D6A7] rotate-[-45deg] hidden xs:block" />
        <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-800 tracking-tight font-display">
          What You'll Gain as a Parent
        </h3>
        <LeafIcon className="w-5 h-5 md:w-6 md:h-6 text-[#A5D6A7] scale-x-[-1] rotate-[45deg] hidden xs:block" />
      </div>

      {/* Grid wrapper */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-5 gap-4 lg:gap-5"
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
      >
        {benefits.map((benefit) => (
          <motion.div 
            key={benefit.id} 
            className={benefit.colSpan}
            variants={itemVariants}
          >
            <BenefitCard 
              icon={benefit.icon}
              title={benefit.title}
              description={benefit.description}
              accentClass={benefit.accentClass}
              iconBgClass={benefit.iconBgClass}
              iconTextClass={benefit.iconTextClass}
            />
          </motion.div>
        ))}
      </motion.div>

    </div>
  );
};

export default BenefitsGrid;
