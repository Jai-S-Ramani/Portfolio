import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  BrainCircuit, 
  BarChart3, 
  Code2, 
  Terminal
} from 'lucide-react';
import { useTheme } from './ThemeContext';

interface SkillCategory {
  title: string;
  categoryTag: string;
  icon: React.ReactNode;
  description: string;
  skills: { name: string; level: string; highlight: string }[];
}

export const EditorialSkills: React.FC = () => {
  const { isDark } = useTheme();
  const [activeCategoryIndex, setActiveCategoryIndex] = useState(0);

  const categories: SkillCategory[] = [
    {
      title: 'AI & Machine Learning',
      categoryTag: 'MODELS & INFERENCE',
      icon: <BrainCircuit className="w-5 h-5" />,
      description: 'End-to-end predictive modeling, computer vision embeddings, and deep learning architectures.',
      skills: [
        { name: 'Python', level: 'Core', highlight: 'Primary language for ML, scrapers, and microservices' },
        { name: 'TensorFlow', level: 'Applied', highlight: 'Neural network training, loss optimization, model exports' },
        { name: 'OpenCV', level: 'Advanced', highlight: 'Face bounding boxes, eye blink detection, liveness anti-spoofing' },
        { name: 'Machine Learning', level: 'Expert', highlight: 'Regression, classification, clustering, dimensionality reduction' },
        { name: 'Deep Learning', level: 'Applied', highlight: 'CNNs, feature representations, 512-D vector cosine similarity' },
      ],
    },
    {
      title: 'Data Analytics',
      categoryTag: 'EXPLORATORY & BI',
      icon: <BarChart3 className="w-5 h-5" />,
      description: 'Transforming multi-source raw datasets into rigorous quantitative KPIs and business decisions.',
      skills: [
        { name: 'SQL', level: 'Advanced', highlight: 'Window functions, analytical indexing, complex subqueries, CTEs' },
        { name: 'Python', level: 'Core', highlight: 'Automated data munging, statistical analysis, cron extractors' },
        { name: 'Pandas', level: 'Expert', highlight: 'Vectorized series manipulation, rolling averages, dataframe joins' },
        { name: 'NumPy', level: 'Advanced', highlight: 'High-speed matrix operations, vector arithmetic, array transforms' },
        { name: 'Data Visualization', level: 'Proficient', highlight: 'Power BI, Tableau, Chart.js, Recharts, statistical distribution plots' },
      ],
    },
    {
      title: 'Development',
      categoryTag: 'FULL-STACK SYSTEMS',
      icon: <Code2 className="w-5 h-5" />,
      description: 'Engineering responsive reactive client interfaces and concurrent asynchronous microservices.',
      skills: [
        { name: 'React', level: 'Advanced', highlight: 'Declarative component architecture, custom hooks, state management' },
        { name: 'Next.js', level: 'Proficient', highlight: 'Server-side rendering, routing conventions, API handlers' },
        { name: 'Node.js', level: 'Advanced', highlight: 'Event-driven asynchronous I/O, Express microservices, WebSockets' },
        { name: 'Flask', level: 'Advanced', highlight: 'RESTful API endpoints, multithreaded daemon task schedulers' },
        { name: 'REST APIs', level: 'Expert', highlight: 'Contract-first API design, JWT auth, schema validation, rate-limiting' },
      ],
    },
    {
      title: 'Tools & Infrastructure',
      categoryTag: 'DEVOPS & DATABASES',
      icon: <Terminal className="w-5 h-5" />,
      description: 'Containerized deployment pipelines, distributed version control, and scalable database schemas.',
      skills: [
        { name: 'Git', level: 'Advanced', highlight: 'Branching strategies, semantic commits, rebase workflows' },
        { name: 'GitHub', level: 'Advanced', highlight: 'GitHub Actions, automated pytest CI/CD pipelines, code reviews' },
        { name: 'Docker', level: 'Applied', highlight: 'Docker Compose, containerized multi-service stacks, isolation' },
        { name: 'MongoDB', level: 'Advanced', highlight: 'Atlas document schemas, connection pooling, sub-30ms ping latency' },
        { name: 'PostgreSQL', level: 'Proficient', highlight: 'ACID transactions, relational schemas, foreign key constraints' },
      ],
    },
  ];

  return (
    <section 
      id="skills" 
      className={`py-24 px-4 sm:px-6 md:px-10 max-w-[1360px] mx-auto select-none font-sans border-t transition-colors duration-300 ${
        isDark ? 'border-[#1E3325]/80' : 'border-[#C7D4B8]/40'
      }`}
    >
      
      {/* SECTION HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-16">
        <div>
          <span className={`text-xs font-mono uppercase tracking-[0.2em] mb-3 block ${
            isDark ? 'text-[#34D399]' : 'text-[#858D7A]'
          }`}>
            03 // TECHNICAL ARSENAL
          </span>
          <h2 className={`text-4xl sm:text-6xl font-serif tracking-tight ${
            isDark ? 'text-[#F0F4EE]' : 'text-[#242722]'
          }`}>
            Skills & <span className={`italic font-normal ${isDark ? 'text-[#34D399]' : 'text-[#141514]'}`}>competencies.</span>
          </h2>
        </div>

        <p className={`text-sm max-w-md font-normal leading-relaxed ${
          isDark ? 'text-[#A3B899]' : 'text-[#858D7A]'
        }`}>
          Curated disciplines spanning quantitative mathematical modeling, deep learning architectures, and modern web application development.
        </p>
      </div>

      {/* CATEGORY SELECTOR TABS */}
      <div className={`flex flex-wrap items-center gap-2 mb-8 sm:mb-10 p-1.5 sm:p-2 rounded-2xl sm:rounded-3xl border max-w-fit shadow-sm transition-colors ${
        isDark ? 'border-[#1E3325] bg-[#0E1712]' : 'border-[#C7D4B8]/70 bg-white/70 backdrop-blur-md'
      }`}>
        {categories.map((cat, idx) => (
          <button
            key={cat.title}
            onClick={() => setActiveCategoryIndex(idx)}
            className={`min-h-[44px] flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs font-semibold tracking-tight transition-all cursor-pointer active:scale-95 ${
              activeCategoryIndex === idx
                ? isDark
                  ? 'bg-[#34D399] text-[#07100B] font-bold shadow-sm'
                  : 'bg-[#141514] text-[#F5F3E9] shadow-sm'
                : isDark
                  ? 'text-[#A3B899] hover:text-[#E8ECE6] hover:bg-[#14261C]'
                  : 'text-[#242722]/70 hover:text-[#141514] hover:bg-[#C7D4B8]/30'
            }`}
          >
            <span>{cat.title}</span>
          </button>
        ))}
      </div>

      {/* SKILLS DISPLAY DASHBOARD */}
      {(() => {
        const cat = categories[activeCategoryIndex];
        return (
          <motion.div
            key={cat.title}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className={`p-5 sm:p-8 lg:p-12 rounded-[28px] sm:rounded-[36px] border shadow-[0_16px_50px_rgba(0,0,0,0.2)] transition-colors duration-300 ${
              isDark
                ? 'border-[#1E3325] bg-gradient-to-br from-[#0E1712]/95 to-[#080E0A]/90'
                : 'border-[#C7D4B8]/70 bg-gradient-to-br from-white/95 to-[#F5F3E9]/80 backdrop-blur-xl'
            }`}
          >
            {/* Header Description */}
            <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 sm:pb-6 border-b mb-6 sm:mb-8 ${
              isDark ? 'border-[#1E3325]' : 'border-[#C7D4B8]/40'
            }`}>
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 ${
                  isDark ? 'bg-[#14261C] text-[#34D399]' : 'bg-[#141514] text-[#F5F3E9]'
                }`}>
                  {cat.icon}
                </div>
                <div>
                  <span className={`text-[10px] font-mono uppercase tracking-wider font-bold block ${
                    isDark ? 'text-[#34D399]' : 'text-[#858D7A]'
                  }`}>
                    {cat.categoryTag}
                  </span>
                  <h3 className={`text-xl sm:text-2xl font-serif font-bold ${
                    isDark ? 'text-[#F0F4EE]' : 'text-[#141514]'
                  }`}>
                    {cat.title}
                  </h3>
                </div>
              </div>

              <p className={`text-xs sm:text-sm max-w-md ${isDark ? 'text-[#A3B899]' : 'text-[#858D7A]'}`}>
                {cat.description}
              </p>
            </div>

            {/* Elegant Visual Skill Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
              {cat.skills.map((skill) => (
                <div
                  key={skill.name}
                  className={`p-4 sm:p-5 rounded-2xl sm:rounded-3xl border active:scale-[0.98] transition-all space-y-2 group ${
                    isDark
                      ? 'border-[#1E3325] bg-[#0A120D] hover:border-[#34D399]/40 hover:shadow-md'
                      : 'border-[#C7D4B8]/60 bg-white/90 hover:border-[#141514]/40 hover:shadow-md'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className={`text-base font-bold transition-colors ${
                      isDark ? 'text-[#F0F4EE] group-hover:text-white' : 'text-[#141514] group-hover:text-[#242722]'
                    }`}>
                      {skill.name}
                    </span>
                    <span className={`text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full border ${
                      isDark
                        ? 'border-[#1E3325] bg-[#14261C] text-[#34D399]'
                        : 'border-[#C7D4B8] bg-[#C7D4B8]/25 text-[#141514]'
                    }`}>
                      {skill.level}
                    </span>
                  </div>

                  <p className={`text-xs leading-relaxed pt-1 ${
                    isDark ? 'text-[#A3B899]' : 'text-[#242722]/70'
                  }`}>
                    {skill.highlight}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        );
      })()}

    </section>
  );
};
