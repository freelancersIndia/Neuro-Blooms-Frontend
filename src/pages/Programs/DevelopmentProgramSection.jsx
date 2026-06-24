import React from 'react';
import { motion } from 'framer-motion';
import { ShieldAlert } from 'lucide-react';

export const DevelopmentProgramSection = () => {
  return (
    <div className="space-y-6">
      {/* Flagship Badge */}
      <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 border border-emerald-100/60 text-[#3B8A4C] rounded-full text-xs font-bold uppercase tracking-wider">
        <span className="w-1.5 h-1.5 rounded-full bg-[#3B8A4C] animate-pulse" />
        <span>FLAGSHIP PROGRAM</span>
      </div>

      {/* Heading */}
      <h3 className="text-3xl sm:text-4xl font-extrabold text-slate-800 font-display tracking-tight leading-tight">
        Neuro Blooms <br className="hidden sm:inline" />
        Development Program
      </h3>

      {/* Description */}
      <div className="space-y-4 text-slate-600 text-sm sm:text-base leading-relaxed font-normal">
        <p>
          A holistic child development program that addresses developmental delays, speech concerns, behavioral challenges, learning difficulties, ADHD, Autism and related developmental needs.
        </p>
        <p className="font-medium text-slate-700 border-l-4 border-[#3B8A4C] pl-4 italic">
          Every child receives a personalized intervention plan developed through developmental assessment and ongoing monitoring.
        </p>
      </div>

      {/* Therapist & Child Image */}
      <motion.div
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.3 }}
        className="relative aspect-video rounded-3xl overflow-hidden border-6 border-white shadow-xl bg-slate-50 mt-8"
      >
        <img
          src="/images/faq/therapist_child_faq.png"
          alt="Therapist working with a child during development assessment"
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=500';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 to-transparent" />
      </motion.div>
    </div>
  );
};

export default DevelopmentProgramSection;
