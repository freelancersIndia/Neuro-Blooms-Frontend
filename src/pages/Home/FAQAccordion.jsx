import React, { useState } from 'react';
import { 
  Users, 
  ClipboardList, 
  UserCheck, 
  Home, 
  UsersRound, 
  ShieldCheck, 
  IndianRupee 
} from 'lucide-react';
import FAQItem from './FAQItem';

const FAQ_DATA = [
  {
    id: 1,
    icon: Users,
    question: "What age groups do you work with?",
    answer: "We work with children from 18 months to 18 years. Our programs are age-appropriate and customized to meet each child's unique needs at every stage of development.",
    themeColor: "green"
  },
  {
    id: 2,
    icon: ClipboardList,
    question: "How do I know which program is right for my child?",
    answer: "We conduct a detailed initial developmental assessment to understand your child's strengths and areas of need. Based on the findings, we recommend the most suitable therapy or program.",
    themeColor: "orange"
  },
  {
    id: 3,
    icon: UserCheck,
    question: "How long does therapy take to show results?",
    answer: "Every child's progress is unique. However, parents typically begin noticing positive improvements in focus, communication, or independence within 8 to 12 weeks of consistent sessions.",
    themeColor: "blue"
  },
  {
    id: 4,
    icon: Home,
    question: "Do you provide therapy at home?",
    answer: "Yes, we offer home-based therapy in select areas, in-clinic sessions, as well as online coaching to fit your family's schedule and provide care in the child's natural environment.",
    themeColor: "purple"
  },
  {
    id: 5,
    icon: UsersRound,
    question: "How are parents involved in the therapy process?",
    answer: "Parents are an integral part of our team! We offer dedicated parent coaching sessions, carry-over activities for home, and regular updates to help you support your child's progress.",
    themeColor: "gold"
  },
  {
    id: 6,
    icon: ShieldCheck,
    question: "Is your approach evidence-based?",
    answer: "Absolutely. All our developmental programs, occupational therapy, and speech interventions are backed by scientific research, clinical studies, and proven therapies.",
    themeColor: "teal"
  },
  {
    id: 7,
    icon: IndianRupee,
    question: "Do you accept insurance or offer payment plans?",
    answer: "We accept major insurance providers and offer flexible payment packages, monthly installments, and therapy plans to make our services accessible to all families.",
    themeColor: "pink"
  }
];

export const FAQAccordion = () => {
  // First item is expanded by default
  const [openIndex, setOpenIndex] = useState(0);

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <div className="flex flex-col gap-3.5 w-full">
      {FAQ_DATA.map((faq, index) => (
        <FAQItem
          key={faq.id}
          faq={faq}
          isOpen={openIndex === index}
          onToggle={() => handleToggle(index)}
        />
      ))}
    </div>
  );
};

export default FAQAccordion;
