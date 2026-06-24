import { motion } from 'framer-motion';
import { Heart, Target, User, Smile, TrendingUp, Star } from 'lucide-react';
import SuccessStoryCard from './SuccessStoryCard';
import ImpactMetricsStrip from './ImpactMetricsStrip';

export const SuccessStoriesSection = () => {
  // Child decorative images for header
  const headerBoyImage = "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&q=80&w=150";
  const headerGirlImage = "https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&q=80&w=150";

  // Story data
  const stories = [
    {
      id: 1,
      journeyBadge: "Aarav's Journey",
      badgeBgClass: "bg-emerald-50/70 border border-emerald-100",
      badgeTextClass: "text-[#2E7D32]",
      title: "From Limited Communication to Confident Expression",
      highlight: "Confident Expression",
      highlightColorClass: "text-[#2E7D32]",
      storyText: "Neuro Blooms helped Aarav open up in ways we never thought possible. Today, he communicates confidently and enjoys interactive play with everyone around him.",
      childImage: "https://images.unsplash.com/photo-1587654780291-39c9404d746b?auto=format&fit=crop&q=80&w=300",
      parentName: "Priya Sharma",
      parentRole: "Aarav's Mother",
      parentAvatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=100",
      rating: 5,
      improvementIcon: Target,
      improvementText: "Speech, Social Interaction, Confidence",
      improvementBgClass: "bg-[#E8F5E9]/50",
      improvementIconBgClass: "bg-emerald-100/60",
      improvementIconTextClass: "text-[#2E7D32]",
      improvementLabelClass: "text-[#3B8A4C]"
    },
    {
      id: 2,
      journeyBadge: "Ishita's Journey",
      badgeBgClass: "bg-blue-50/70 border border-blue-100",
      badgeTextClass: "text-blue-700",
      title: "From Struggles to Independence",
      highlight: "Independence",
      highlightColorClass: "text-blue-600",
      storyText: "The structured support and parent coaching gave Ishita the skills and confidence to become more independent in her daily routines. We're so grateful!",
      childImage: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&q=80&w=300",
      parentName: "Rahul Verma",
      parentRole: "Ishita's Father",
      parentAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100",
      rating: 5,
      improvementIcon: User,
      improvementText: "Daily Living Skills, Focus, Independence",
      improvementBgClass: "bg-blue-50/50",
      improvementIconBgClass: "bg-blue-100/60",
      improvementIconTextClass: "text-blue-700",
      improvementLabelClass: "text-blue-600"
    },
    {
      id: 3,
      journeyBadge: "Vihaan's Journey",
      badgeBgClass: "bg-purple-50/70 border border-purple-100",
      badgeTextClass: "text-purple-700",
      title: "From Sensory Challenges to Happy Learner",
      highlight: "Happy Learner",
      highlightColorClass: "text-purple-600",
      storyText: "Vihaan has made incredible progress. He's more calm, focused, and now loves learning new things every day. Neuro Blooms changed our lives!",
      childImage: "https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&q=80&w=300",
      parentName: "Neha Kapoor",
      parentRole: "Vihaan's Mother",
      parentAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100",
      rating: 5,
      improvementIcon: Smile,
      improvementText: "Sensory Processing, Attention, Learning",
      improvementBgClass: "bg-purple-50/50",
      improvementIconBgClass: "bg-purple-100/60",
      improvementIconTextClass: "text-purple-700",
      improvementLabelClass: "text-purple-600"
    }
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <section id="success-stories-section" className="relative py-6 sm:py-8 lg:py-10 bg-[#FFFFFF] overflow-hidden w-full flex flex-col justify-center min-h-[90vh] lg:min-h-0 lg:max-h-[950px]">
      
      {/* --- FLOATING DECORATIONS --- */}
      
      {/* Star outline (Left) */}
      <motion.svg
        viewBox="0 0 24 24"
        className="absolute top-[35%] left-[2%] w-6 h-6 opacity-35 text-[#8E24AA] pointer-events-none hidden lg:block"
        animate={{ y: [0, -3, 0], rotate: [0, 10, -10, 0] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" stroke="currentColor" strokeWidth="2" fill="none" />
      </motion.svg>

      {/* Heart outline (Top Center-Left) */}
      <motion.svg
        viewBox="0 0 100 100"
        className="absolute top-[8%] left-[26%] w-7 h-7 opacity-25 text-orange-400 pointer-events-none hidden lg:block"
        animate={{ y: [0, -4, 0], rotate: [0, 8, -8, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <path
          d="M50,85 C50,85 15,60 15,35 C15,15 35,10 50,30 C65,10 85,15 85,35 C85,60 50,85 50,85 Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="5"
          strokeLinecap="round"
        />
      </motion.svg>

      {/* Dotted curve + Paper plane (Top Center-Right) */}
      <div className="absolute top-[6%] left-[64%] w-32 h-20 opacity-20 hidden lg:block select-none pointer-events-none">
        <svg viewBox="0 0 160 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <path d="M10,65 Q80,15 140,45" stroke="#E67E22" strokeWidth="2" strokeLinecap="round" strokeDasharray="4 4" />
          <g transform="translate(140, 45) rotate(20) scale(0.6)">
            <path d="M0,0 L18,-5 L9,14 L7,8 L0,0 Z" fill="#E67E22" />
          </g>
        </svg>
      </div>

      {/* Floating heart on right side */}
      <motion.svg
        viewBox="0 0 100 100"
        className="absolute top-[38%] right-[2%] w-6 h-6 opacity-25 text-[#2E7D32] pointer-events-none hidden lg:block"
        animate={{ y: [0, 3, 0], rotate: [0, -5, 5, 0] }}
        transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <path
          d="M50,85 C50,85 15,60 15,35 C15,15 35,10 50,30 C65,10 85,15 85,35 C85,60 50,85 50,85 Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="5"
          strokeLinecap="round"
        />
      </motion.svg>

      {/* Main Container */}
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col space-y-5 sm:space-y-6 md:space-y-7 w-full">
        
        {/* HEADER AREA */}
        <div className="relative flex flex-col items-center text-center max-w-3xl mx-auto w-full">
          
          {/* DECORATIVE BOY (Top Left of Header) */}
          <div className="absolute left-[-15%] top-[-10px] hidden xl:block select-none pointer-events-none">
            <div className="relative w-16 h-16">
              <div className="absolute -inset-1 rounded-full border-2 border-dashed border-[#A5D6A7]/80 animate-[spin_40s_linear_infinite]"></div>
              <img 
                src={headerBoyImage} 
                alt="Boy Smiling decoration" 
                className="w-full h-full rounded-full object-cover border-4 border-white shadow-md"
              />
              <div className="absolute bottom-[-4px] right-[-4px] w-6 h-6 rounded-full bg-emerald-500 text-white border-2 border-white shadow flex items-center justify-center">
                <TrendingUp className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>

          {/* DECORATIVE GIRL (Top Right of Header) */}
          <div className="absolute right-[-15%] top-[-10px] hidden xl:block select-none pointer-events-none">
            <div className="relative w-16 h-16">
              <div className="absolute -inset-1 rounded-full border-2 border-dashed border-[#A5D6A7]/80 animate-[spin_45s_linear_infinite]"></div>
              <img 
                src={headerGirlImage} 
                alt="Girl Celebrating decoration" 
                className="w-full h-full rounded-full object-cover border-4 border-white shadow-md"
              />
              <div className="absolute bottom-[-4px] right-[-4px] w-6 h-6 rounded-full bg-amber-400 text-white border-2 border-white shadow flex items-center justify-center">
                <Star className="w-3.5 h-3.5 fill-current" />
              </div>
            </div>
          </div>

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#E8F5E9]/80 border border-[#A5D6A7]/40 text-[#2E7D32] rounded-full text-xs font-bold tracking-wide shadow-sm mb-2.5">
            <Heart className="h-3.5 w-3.5 text-[#3B8A4C] fill-[#3B8A4C]/10" />
            <span>Success Stories</span>
          </div>

          {/* Title */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-800 tracking-tight leading-[1.15] font-display">
            Real Stories,<br />
            Real <span className="bg-gradient-to-r from-[#3B8A4C] to-[#2E7D32] bg-clip-text text-transparent">Progress</span>
          </h2>

          {/* Subtitle */}
          <p className="text-xs sm:text-sm md:text-base text-slate-500 leading-relaxed max-w-[620px] font-normal mt-2">
            Every child's journey is unique. Here's how we've helped families create brighter tomorrows.
          </p>
        </div>

        {/* STORY CARDS GRID */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-3 gap-5 lg:gap-6 w-full"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
        >
          {stories.map((story) => {
            // Responsive layout: Card 1, 2 span 3 columns on tablet (2 per row), Card 3 spans 6 columns (full row)
            const gridSpan = story.id === 3 
              ? "col-span-1 md:col-span-6 lg:col-span-1" 
              : "col-span-1 md:col-span-3 lg:col-span-1";

            return (
              <motion.div 
                key={story.id} 
                className={gridSpan}
                variants={itemVariants}
              >
                <SuccessStoryCard {...story} />
              </motion.div>
            );
          })}
        </motion.div>

        {/* BOTTOM IMPACT STRIP */}
        <ImpactMetricsStrip />

        {/* BOTTOM DISCLAIMER */}
        <p className="text-[10px] font-semibold text-slate-400/80 text-center tracking-wide font-medium">
          *Results may vary for each child based on individual goals and needs.
        </p>

      </div>

    </section>
  );
};

export default SuccessStoriesSection;
