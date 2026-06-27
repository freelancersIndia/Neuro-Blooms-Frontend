import React from 'react';
import { motion } from 'framer-motion';
import { Target, Activity, Users, TrendingUp, Calendar, FileText, Check, X } from 'lucide-react';
import Container from '../../../../components/common/Container';

export const ProgramComparisonSection = () => {
  const comparisonData = [
    {
      category: 'Focus',
      icon: Target,
      iconColor: 'text-blue-500 bg-blue-50',
      traditional: 'Focus on symptoms',
      neuro: 'Root Cause Focused',
    },
    {
      category: 'Treatment',
      icon: Activity,
      iconColor: 'text-[#3B8A4C] bg-emerald-50',
      traditional: 'Fragmented therapies',
      neuro: 'Integrated Care',
    },
    {
      category: 'Parent Role',
      icon: Users,
      iconColor: 'text-purple-500 bg-purple-50',
      traditional: 'Limited parent involvement',
      neuro: 'Strong Parent Partnership',
    },
    {
      category: 'Outcomes',
      icon: TrendingUp,
      iconColor: 'text-orange-500 bg-orange-50',
      traditional: 'No measurable outcomes',
      neuro: 'Outcome Driven',
    },
    {
      category: 'Monitoring',
      icon: Calendar,
      iconColor: 'text-pink-500 bg-pink-50',
      traditional: 'Irregular follow-ups',
      neuro: 'Regular Monitoring',
    },
    {
      category: 'Plans',
      icon: FileText,
      iconColor: 'text-teal-500 bg-teal-50',
      traditional: 'One-size-fit-all plans',
      neuro: 'Personalized Plans',
    },
  ];

  return (
    <section className="relative py-20 bg-white overflow-hidden w-full">
      {/* Decorative Blob */}
      <div className="absolute top-[20%] right-0 w-[30%] h-[35%] bg-amber-100/10 rounded-full filter blur-3xl pointer-events-none z-0" />
      
      <Container className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center max-w-6xl mx-auto">
          
          {/* Left Column: Heading and Image */}
          <div className="lg:col-span-4 space-y-8 flex flex-col justify-center">
            <div className="space-y-4 text-center lg:text-left">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-800 font-display tracking-tight leading-tight">
                Why Parents Choose <br />
                Our Programs?
              </h2>
              <div className="h-1 w-12 bg-amber-400 rounded-full mt-2 mx-auto lg:mx-0" />
            </div>

            {/* Mother and Child Hugging Image */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="relative aspect-square sm:aspect-video lg:aspect-[4/5] rounded-3xl overflow-hidden border-6 border-white shadow-xl bg-purple-50"
            >
              <img
                src="/images/testimonials/father_child.png"
                alt="Happy mother hugging her child"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = 'https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&q=80&w=400';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-purple-900/20 via-transparent to-transparent" />
            </motion.div>
          </div>

          {/* Right Column: Comparison Table */}
          <div className="lg:col-span-8 w-full flex flex-col justify-center">
            <div className="bg-slate-50/50 rounded-3xl p-4 sm:p-6 md:p-8 border border-slate-100/80 shadow-lg space-y-4">
              
              {/* Table Header */}
              <div className="grid grid-cols-12 gap-2 sm:gap-4 items-center pb-4 border-b border-slate-200/80 px-2 sm:px-4">
                <div className="col-span-4 text-xs sm:text-sm font-extrabold text-slate-400 uppercase tracking-wider">
                  Category
                </div>
                <div className="col-span-4 text-center">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-red-50 border border-red-100 text-red-700 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-wider">
                    <X className="h-3 w-3" /> Traditional
                  </span>
                </div>
                <div className="col-span-4 text-center">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 border border-emerald-100 text-[#2E7D32] rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-wider">
                    <Check className="h-3 w-3" /> Neuro Blooms
                  </span>
                </div>
              </div>

              {/* Table Rows */}
              <div className="space-y-3">
                {comparisonData.map((row, idx) => {
                  const Icon = row.icon;
                  return (
                    <motion.div
                      key={idx}
                      whileHover={{ scale: 1.01, x: 2 }}
                      className="grid grid-cols-12 gap-2 sm:gap-4 items-center p-3.5 bg-white rounded-2xl border border-slate-100 shadow-2xs transition-all duration-200"
                    >
                      {/* Category */}
                      <div className="col-span-4 flex items-center gap-2">
                        <div className={`p-2 rounded-xl shrink-0 ${row.iconColor}`}>
                          <Icon className="h-4.5 w-4.5" />
                        </div>
                        <span className="text-xs sm:text-sm font-bold text-slate-800 font-display">
                          {row.category}
                        </span>
                      </div>

                      {/* Traditional Approach */}
                      <div className="col-span-4 text-center px-1 sm:px-2">
                        <span className="text-xs sm:text-sm text-slate-500 font-medium leading-tight">
                          {row.traditional}
                        </span>
                      </div>

                      {/* Neuro Blooms Approach */}
                      <div className="col-span-4 text-center px-1 sm:px-2 bg-emerald-50/40 rounded-xl py-2 border border-emerald-100/30">
                        <span className="text-xs sm:text-sm text-[#2E7D32] font-extrabold leading-tight flex items-center justify-center gap-1">
                          <Check className="h-3.5 w-3.5 shrink-0 hidden sm:inline" />
                          {row.neuro}
                        </span>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

            </div>
          </div>

        </div>
      </Container>
    </section>
  );
};

export default ProgramComparisonSection;
