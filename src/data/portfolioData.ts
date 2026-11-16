import type { Project, Experience, TechItem, Achievement } from '../types';

export const PERSONAL_INFO = {
  name: "Jai S Ramani",
  handle: "jaisramani",
  role: "Data Analyst | AI & ML Engineer",
  location: "Bangalore, India",
  timeZone: "Asia/Kolkata",
  taglines: [
    "Data Analyst",
    "AI & ML Engineer",
    "Predictive Systems Architect",
    "Quantitative Problem Solver"
  ],
  bio: "Analytical and results-driven undergraduate with hands-on expertise in data analytics, business intelligence, and database querying. Proficient in transforming raw, multi-source datasets into actionable insights using SQL, Python (Pandas, NumPy), Excel, Power BI, and Tableau. Experienced in building automated data extraction pipelines, time-series analysis, statistical KPI tracking, and interactive dashboards, complemented by strong foundations in applied machine learning and predictive modeling.",
  availability: "Seeking to drive data-informed business decisions through rigorous exploratory analysis & quantitative problem-solving",
  email: "jaisramani05@gmail.com",
  github: "https://github.com/Jai-S-Ramani",
  linkedin: "https://linkedin.com/in/jai-s-ramani-2948532bb",
  resume: "/Jai_S_Ramani_Resume.pdf",
  twitter: "https://x.com",
  stats: [
    { label: "Pytest Pass Rate", value: "100% (59/59)" },
    { label: "Retail Marketplaces", value: "18 Feeds" },
    { label: "Amazon Regions", value: "5 Global" },
    { label: "MongoDB Ping", value: "< 30ms" },
  ]
};

export const PROJECTS: Project[] = [
  {
    id: "price-pilot",
    title: "PricePilot",
    tagline: "Price Intelligence & Cross-Marketplace Arbitrage Platform",
    category: "AI & Data Analytics",
    description: "End-to-end price intelligence & arbitrage platform tracking time-series product data across 5 Amazon regions and benchmarking prices against 18 retail marketplaces (Flipkart, Croma, Blinkit, Walmart).",
    impact: "Engineered a 6-engine analytics suite leveraging 30-day moving averages, price volatility modeling, and promotional bank offers to generate Deal Quality Scores, price-drop forecasts, and real-time BUY / WAIT signals.",
    architectureNotes: [
      "Multithreaded daemon scheduler in Flask for autonomous polling, SQLite/CSV extraction pipelines, and real-time alerts via HTML Email, Discord Webhooks, and Telegram Bots",
      "Interactive time-series dashboard utilizing Chart.js and GSAP with inline sparklines, split-basket cost optimization, and multi-currency normalization across 7 fiat currencies",
      "Containerized with Docker & Docker Compose; maintained a 100% pass rate across 59 automated unit and integration tests with pytest covering scrapers, REST endpoints, and export pipelines"
    ],
    metrics: [
      { label: "Retail Benchmarks", value: "18 Marketplaces" },
      { label: "Amazon Regions", value: "5 Regions" },
      { label: "Pytest Pass Rate", value: "100% (59 Tests)" }
    ],
    tags: ["Python", "Flask", "SQLite", "Pandas", "Docker", "Chart.js", "GSAP", "Pytest"],
    featured: true,
    year: "2025",
    githubUrl: "https://github.com/Jai-S-Ramani/PricePilot"
  },
  {
    id: "samyukt",
    title: "Samyukt",
    tagline: "Cloud Version Control Platform with 3-Layer Semantic Merge Engine",
    category: "Systems & Cloud",
    description: "Cloud-native version control platform featuring a 3-layer semantic merge engine (text-level diff, AST structural parsing, and AI behavioral analysis) to automate code conflict resolution.",
    impact: "Engineered database schemas and indexing across 6 core entities in MongoDB Atlas / Mongoose with connection pooling and automated exponential backoff reconnection maintaining sub-30ms ping latency.",
    architectureNotes: [
      "3-layer semantic merge engine executing text-level diff, AST structural parsing, and AI behavioral analysis to resolve concurrent branch divergence",
      "Real-time collaborative pipelines using WebSockets & CRDT concepts, enabling multi-user live presence tracking, cursor synchronization, and conflict-free concurrent editing",
      "Containerized frontend/backend with Docker & Nginx reverse proxy, implementing automated test suites via 15+ Supertest integration specs and 10+ Playwright E2E flows with 100% pass rate"
    ],
    metrics: [
      { label: "Network Latency", value: "< 30ms Ping" },
      { label: "Merge Engine", value: "3-Layer AST" },
      { label: "Integration Specs", value: "15+ Supertest" }
    ],
    tags: ["React 19", "Node.js", "Express", "MongoDB", "WebSockets", "Docker", "Nginx", "Playwright"],
    featured: true,
    year: "2025",
    githubUrl: "https://github.com/Jai-S-Ramani/Samyukt"
  },
  {
    id: "presence-iq",
    title: "PresenceIQ",
    tagline: "Automated AI Facial Recognition Attendance & Spatial Document Management",
    category: "Computer Vision",
    description: "Automated AI facial recognition attendance platform built with Django REST, React, OpenCV, and InsightFace, implementing role-based access control (RBAC) across 4 user tiers.",
    impact: "Architected 7 MongoDB collections for users, enrollments, sessions, biometric face data, attendance logs, and audit trails to enable scalable document management.",
    architectureNotes: [
      "Modular REST APIs across 3 core services for JWT authentication, class management, and automated facial recognition attendance logging",
      "High-precision facial embedding vectors extracted via InsightFace and OpenCV with edge inference verification",
      "Integrated PDF/Excel reporting, attendance analytics visualizations, and bulk roster ingestion, validating the system with 20 student test profiles across live sessions"
    ],
    metrics: [
      { label: "User Tiers", value: "4 RBAC Levels" },
      { label: "Mongo Collections", value: "7 Schemas" },
      { label: "Live Validation", value: "20 Student Profiles" }
    ],
    tags: ["Django REST", "React", "MongoDB", "OpenCV", "InsightFace", "Python", "JWT"],
    featured: true,
    year: "2024",
    githubUrl: "https://github.com/Jai-S-Ramani/PresenceIQ-AI-Driven-Web-Based-Automated-Attendance-System"
  }
];

export const EXPERIENCES: Experience[] = [
  {
    company: "Visvesvaraya Technological University",
    role: "Bachelor of Engineering in Artificial Intelligence & Machine Learning",
    period: "2023 — 2027",
    location: "Bangalore, Karnataka, India",
    type: "Degree Program",
    description: "Undergraduate student specializing in Artificial Intelligence, Machine Learning, and Big Data Analytics with an algorithmic systems foundation.",
    highlights: [
      "Relevant Coursework: Data Structures & Algorithms, Database Management Systems, Machine Learning, Object-Oriented Programming.",
      "Hands-on expertise transforming multi-source datasets into actionable business intelligence using SQL, Python (Pandas, NumPy), Excel, Power BI, and Tableau.",
      "Architected autonomous scraping and predictive analysis platforms with real-time anomaly detection."
    ],
    technologies: ["Python", "SQL", "Pandas", "NumPy", "Power BI", "Tableau", "Machine Learning", "Java"]
  },
  {
    company: "The Kingdom College",
    role: "Higher Secondary Education (Class XII)",
    period: "2022 — 2023",
    location: "Bangalore, Karnataka, India",
    type: "Pre-University",
    description: "Completed higher secondary curriculum with focused coursework in Physics, Chemistry, Mathematics, and Computer Science.",
    highlights: [
      "Demonstrated strong mathematical foundation in discrete mathematics, calculus, and linear algebra.",
      "Developed foundational computer programming and algorithmic problem-solving competencies."
    ],
    technologies: ["Mathematics", "Computer Science", "Algorithms", "Physics"]
  }
];

export const TECH_STACK: TechItem[] = [
  // Databases
  { name: "SQL (SQLite, PostgreSQL)", category: "Databases & Storage", proficiency: 95, featured: true, description: "Relational schemas, window functions, indexing, complex analytical queries" },
  { name: "MongoDB Atlas / Mongoose", category: "Databases & Storage", proficiency: 93, featured: true, description: "Document schemas, connection pooling, aggregation pipelines, latency tuning" },
  { name: "Supabase", category: "Databases & Storage", proficiency: 86, featured: false, description: "Realtime subscriptions, Row-Level Security policies, PostgreSQL backend" },

  // Frameworks & Libraries
  { name: "Python (Pandas, NumPy)", category: "Frameworks & Libraries", proficiency: 96, featured: true, description: "Vectorized data munging, time-series analysis, statistical modeling" },
  { name: "OpenCV & InsightFace", category: "Frameworks & Libraries", proficiency: 92, featured: true, description: "Biometric feature extraction, face bounding boxes, liveness detection" },
  { name: "React (React 19)", category: "Frameworks & Libraries", proficiency: 92, featured: true, description: "Declarative reactive interfaces, custom hooks, Tailwind CSS" },
  { name: "Node.js & Express", category: "Frameworks & Libraries", proficiency: 90, featured: true, description: "RESTful microservices, WebSockets, asynchronous concurrent I/O" },
  { name: "Flask & Django REST", category: "Frameworks & Libraries", proficiency: 92, featured: true, description: "Daemon schedulers, JWT authentication, modular REST microservices" },

  // Programming Languages
  { name: "Python", category: "Programming Languages", proficiency: 96, featured: true, description: "Primary language: data science, scrapers, ML, and API services" },
  { name: "SQL", category: "Programming Languages", proficiency: 94, featured: true, description: "Database querying, data extraction pipelines, KPI aggregation" },
  { name: "Java", category: "Programming Languages", proficiency: 85, featured: false, description: "Object-Oriented Programming, enterprise architecture, algorithms" },
  { name: "JavaScript", category: "Programming Languages", proficiency: 90, featured: false, description: "Full-stack scripting, event-driven DOM runtime, Node.js" },

  // Tools & Platforms
  { name: "Excel", category: "Tools & BI Platforms", proficiency: 95, featured: true, description: "Pivot tables, formula modeling, exploratory statistical analysis" },
  { name: "Power BI & Tableau", category: "Tools & BI Platforms", proficiency: 92, featured: true, description: "Interactive executive BI dashboards, DAX queries, KPI reporting" },
  { name: "Docker & Docker Compose", category: "Tools & BI Platforms", proficiency: 88, featured: true, description: "Containerized deployment pipelines, multi-service topologies, Nginx" },
  { name: "Git & GitHub", category: "Tools & BI Platforms", proficiency: 94, featured: false, description: "Branch management, semantic commits, code reviews, collaboration" },
  { name: "Pytest & Playwright", category: "Tools & BI Platforms", proficiency: 90, featured: true, description: "Automated unit testing (59 suites), Supertest, Playwright E2E flows" }
];

export const ACHIEVEMENTS: Achievement[] = [
  {
    title: "Second Place – Best Presentation Award",
    issuer: "PresenceIQ: AI-Driven Web-Based Automated Attendance System",
    year: "2025",
    category: "Award",
    description: "Presented at Smartworld 2025 – Third International Conference on Intelligent Systems in Mechanical, Civil, Electronics, Computer, Science & Management. Recognized with Second Place (Best Presentation Award) for originality, technical contribution, system implementation, and presentation excellence among evaluated research projects."
  },
  {
    title: "Introduction to Industry 4.0 and Industrial Internet of Things",
    issuer: "NPTEL | Jan–Apr 2026",
    year: "2026",
    category: "Certification",
    description: "Successfully completed the NPTEL certification course on Introduction to Industry 4.0 and Industrial Internet of Things (IIoT), achieving a score of 72%. Gained foundational knowledge of Industry 4.0 technologies, industrial IoT systems, smart manufacturing, and the integration of intelligent technologies in modern industrial processes."
  },
  {
    title: "Elite Certification – Artificial Intelligence: Concepts and Techniques",
    issuer: "NPTEL | Indian Institute of Science (IISc), Bangalore",
    year: "2025",
    category: "Certification",
    description: "Successfully completed a 12-week NPTEL certification course in Artificial Intelligence: Concepts and Techniques, achieving an Elite certification with a consolidated score of 75%. Demonstrated proficiency through online assignments (25/25) and a proctored examination (49.5/75), strengthening my foundation in AI concepts and techniques."
  },
  {
    title: "1st Prize – Artificial Intelligence Theme | Intercollegiate Project Expo 2026",
    issuer: "Bangalore Technological Institute (BTI)",
    year: "2026",
    category: "Award",
    description: "Secured First Prize in the Artificial Intelligence theme at the Intercollegiate Project Expo 2026, organized by Bangalore Technological Institute under the theme “Innovate | Design | Build a Better Tomorrow.” Recognized for innovation, technical excellence, and the practical application of AI-driven technologies to address real-world challenges. The achievement highlights my ability to develop intelligent solutions, implement innovative ideas, and translate technical concepts into impactful applications."
  }
];

export const SPOKEN_LANGUAGES = [
  { language: "English", level: "Professional" },
  { language: "Hindi", level: "Professional" },
  { language: "Gujarati", level: "Professional" },
  { language: "Kannada", level: "Professional" }
];

