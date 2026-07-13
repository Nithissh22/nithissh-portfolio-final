export type Project = {
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  image: string;
  overview: string;
  problem?: string;
  solution?: string;
  stack: string[];
  features?: string[];
  impact?: string[];
  githubUrl: string;
  demoUrl?: string;
  outcomeStat?: string;
};

export const profile = {
  displayName: "Nithissh S G",
  fullName: "Nithissh Sampath Kumar",
  firstName: "NITHISSH",
  lastName: "S G",
  role: "AI Engineer, Full Stack Developer & Product Builder",
  intro:
    "I specialize in Artificial Intelligence, Machine Learning, Computer Vision, NLP, and Full Stack Development — transforming ideas into scalable real-world solutions.",
  email: "nithisshcodemeshflow@gmail.com",
  phone: "+91 93425 62305",
  location: "Chennai, India",
  linkedInUrl: "https://www.linkedin.com/in/nithissh-s-g-09a0aa2a0/",
  githubUrl: "https://github.com/Nithissh22",
  resumeUrl: "/resume-nithissh-sampath-kumar.pdf"
};

export const stats = [
  { label: "CGPA", value: "8.38" },
  { label: "INTERNSHIPS", value: "02" },
  { label: "PROJECTS", value: "05" },
  { label: "CERTIFICATIONS", value: "09" },
  { label: "RESEARCH PAPERS", value: "02" }
];

export const experiences = [
  {
    role: "Data Science Intern",
    company: "Cognizance",
    period: "Jun — Aug 2024",
    responsibilities: [
      "Built production REST APIs with FastAPI serving ML model inference endpoints",
      "Developed React dashboards consuming real-time data pipelines",
      "Optimised MySQL query performance for large-scale dataset operations",
      "Architected modular backend system reducing feature deployment time"
    ],
    stack: ["FASTAPI", "REACT", "MYSQL", "PYTHON"],
    outcome: "First exposure to shipping ML-integrated APIs in a team environment"
  },
  {
    role: "Software Engineer Intern",
    company: "Yuga Yatra Retail OPC Pvt Ltd",
    period: "Jun — Aug 2025",
    responsibilities: [
      "Contributed across full frontend-to-backend engineering workflow in a production environment",
      "Built reusable React component library adopted across 3 internal product workflows",
      "Implemented service layer patterns improving API response consistency"
    ],
    stack: ["REACT", "REST APIs", "UI SYSTEMS", "PYTHON"],
    outcome: "Currently ongoing — contributing to live product used by internal operations teams"
  }
];

export const projects: Project[] = [
  {
    slug: "codemeshflow",
    title: "CodeMeshFlow",
    subtitle: "Developer Collaboration Platform",
    category: "FULL STACK",
    image: "/images/project-codemeshflow.png",
    overview: "A powerful developer collaboration platform built to streamline workflows, enabling teams to code, review, and ship together seamlessly.",
    stack: ["NEXT.JS", "REACT", "NODE.JS", "TYPESCRIPT"],
    githubUrl: "https://codemeshflow.in/",
    demoUrl: "https://codemeshflow.in/",
    outcomeStat: "Live Platform"
  },
  {
    slug: "emotisync",
    title: "EmotiSync",
    subtitle: "Emotion-Aware Meeting Summarizer",
    category: "AI SYSTEMS",
    image: "/images/project-emotisync.png",
    overview: "A meeting intelligence system that combines transcription, emotion detection, sentiment analysis, and structured AI summaries.",
    stack: ["WHISPER", "BERT", "LANGCHAIN", "MEDIAPIPE"],
    githubUrl: "https://github.com/Nithissh22/emotisync",
    outcomeStat: "Real-time · 3 modalities"
  },
  {
    slug: "lipspeak",
    title: "LipSpeak",
    subtitle: "Visual Speech Recognition",
    category: "COMPUTER VISION",
    image: "/images/project-lipspeak.png",
    overview: "Lip-reading assistive app.",
    stack: ["LIPNET", "MEDIAPIPE", "PYTORCH", "FASTAPI"],
    githubUrl: "https://github.com/Nithissh22/lipspeak",
    outcomeStat: "92% word accuracy"
  },
  {
    slug: "notesynth",
    title: "NoteSynth",
    subtitle: "Lecture-to-Notes Assistant",
    category: "NLP",
    image: "/images/project-coral-reef.png",
    overview: "Lecture-to-notes assistant using retrieval-augmented generation.",
    stack: ["LLM", "RAG", "FASTAPI", "REACT"],
    githubUrl: "https://github.com/Nithissh22/notesynth",
    outcomeStat: "RAG automation"
  },
  {
    slug: "kyc-sync-ai",
    title: "KYC Sync AI",
    subtitle: "Autonomous KYC Verification",
    category: "AI SYSTEMS",
    image: "/images/project-pacifier.png",
    overview: "Autonomous KYC verification across banking & insurance.",
    stack: ["FASTAPI", "BERT", "OCR", "REACT"],
    githubUrl: "https://github.com/Nithissh22/kyc-sync-ai",
    outcomeStat: "Automated verification"
  }
];

export const allSkills = [
  "Python", "C", "C++", "JavaScript", "MySQL",
  "React", "HTML", "CSS", "Tailwind",
  "FastAPI", "Flask", "REST APIs",
  "Machine Learning", "Deep Learning", "TensorFlow", "PyTorch",
  "Computer Vision", "NLP", "MediaPipe", "BERT", "LangChain"
];

export const music = [
  {
    title: "KANNAMA",
    artist: "AR RAHMAN · KAATRU VELIYIDAI",
    mood: "LATE NIGHT",
    url: "https://open.spotify.com/track/45THyhjDbYhNU7bDrTTUK6?si=b5902d5533c14013",
    image: "https://i.scdn.co/image/ab67616d0000b2731ead2ca8a05400ab4d96a6e6"
  },
  {
    title: "NEW YORK NAGARAM",
    artist: "AR RAHMAN · SAKKARAKATTI",
    mood: "FOCUS MODE",
    url: "https://open.spotify.com/track/0cVrLxeQjiAcftuGzp32qY?si=8cd94d5c90b246f3",
    image: "https://i.scdn.co/image/ab67616d0000b273ff3e3dcc8b72e3315b7a04d9"
  },
  {
    title: "VAA KANAMA",
    artist: "YUVAN SHANKAR RAJA · ONCE MORE",
    mood: "FEEL GOOD",
    url: "https://open.spotify.com/track/3YH8zD0ycqxKtk6xTyW4w3?si=5f721c803dab472f",
    image: "https://i.scdn.co/image/ab67616d0000b273cf81dd85b15cb94dfba1f52c"
  },
  {
    title: "SITHIRA PUTHIRI",
    artist: "SAI ABHYANKKAR",
    mood: "DEEP WORK",
    url: "https://open.spotify.com/track/1uQU9b93tlMlMoZ0h2bRgf?si=ac6a3193d25a4f2a",
    image: "https://i.scdn.co/image/ab67616d0000b273478f243c557031f035f9a804"
  }
];

export const skillGroups = [
  {
    title: "Languages",
    skills: ["Python", "C", "C++", "JavaScript", "MySQL"]
  },
  {
    title: "Frontend",
    skills: ["React", "HTML", "CSS", "Tailwind"]
  },
  {
    title: "Backend",
    skills: ["FastAPI", "Flask", "REST APIs", "Databases"]
  },
  {
    title: "AI & ML",
    skills: [
      "Machine Learning", "Deep Learning", "TensorFlow", "PyTorch",
      "Computer Vision", "NLP", "MediaPipe", "BERT", "LangChain"
    ]
  }
];

export const education = [
  {
    title: "SRM Institute of Science and Technology",
    detail: "B.Tech CSE (AI & ML)",
    metric: "CGPA 8.38",
    year: "2023"
  },
  {
    title: "Class XII — Higher Secondary",
    detail: "68.8%",
    metric: "",
    year: "2021"
  },
  {
    title: "Class X — Secondary School",
    detail: "85.3%",
    metric: "",
    year: ""
  }
];

export const certifications = [
  { name: "NLP Course", provider: "HuggingFace", file: "#", inProgress: true },
  { name: "Getting Started with Deep Learning", provider: "NVIDIA", file: "#", inProgress: true },
  { name: "Azure AI Fundamentals", provider: "Microsoft", file: "#", inProgress: true },
  { name: "Artificial Intelligence & Deep Learning", provider: "Professional Certification", file: "/certificates/ai-deep-learning.pdf" },
  { name: "AWS Machine Learning Terminology & Process", provider: "AWS", file: "/certificates/aws-machine-learning.pdf" },
  { name: "GenAI Powered Data Analytics Simulation", provider: "Tata via Forage", file: "/certificates/tata-gen-ai.pdf" },
  { name: "SQL Advanced", provider: "HackerRank", file: "/certificates/sql-advanced.pdf" },
  { name: "Google Analytics Certification", provider: "Google Skillshop", file: "/certificates/google-analytics.html" },
  { name: "C# Programming", provider: "Professional Certification", file: "/certificates/csharp.pdf" },
  { name: "Computer Networks", provider: "Professional Certification", file: "/certificates/computer-networks.pdf" },
  { name: "Network Security", provider: "Professional Certification", file: "/certificates/network-security.pdf" },
  { name: "Software Engineering Internship", provider: "Yuga Yatra Retail", file: "/certificates/yuga-yatra-intern.jpg" }
];

export const leadership = [
  {
    title: "DSA Operations Committee Head",
    context: "Student Welfare",
    description: "Led operations coordination and supported student-facing initiatives."
  },
  {
    title: "Volunteer — Erode Siragugal",
    context: "Community",
    description: "Contributed to community initiatives with emphasis on reliable support."
  },
  {
    title: "Marathon Support Volunteer",
    context: "Event Operations",
    description: "Supported on-ground coordination for a public event."
  }
];

export const qna = [
  {
    q: "What drives you as an engineer?",
    a: "I'm motivated by building things that work in the real world — not just in notebooks. If AI can't ship, it doesn't count."
  },
  {
    q: "What's your ideal role?",
    a: "Something at the intersection of AI research and product engineering. I want to build models AND the interfaces people use them through."
  },
  {
    q: "What are you learning right now?",
    a: "Deeper into LangChain agents, multi-modal AI, and how to make computer vision systems production-ready."
  },
  {
    q: "Outside of code?",
    a: "I volunteer, run in marathons, and spend too much time reading about product strategy and design systems."
  },
  {
    q: "What tech excites you most right now?",
    a: "Multimodal LLMs and agent frameworks. The idea that a model can see, reason, and act — not just predict the next token — feels like the actual inflection point."
  },
  {
    q: "How do you approach a new project?",
    a: "I start with the problem, not the stack. Then I build the smallest version that proves the idea works before touching infrastructure."
  }
];

export const navItems = [
  { label: "Work", href: "#work", external: false },
  { label: "About", href: "#about", external: false },
  { label: "GitHub", href: "https://github.com/Nithissh22", external: true },
  { label: "Contact", href: "#contact", external: false }
];

export const projectCategories = ["ALL", "AI SYSTEMS", "COMPUTER VISION", "NLP", "FULL STACK"] as const;

export const favoriteGames = [
  {
    title: "Uncharted 4: A Thief's End",
    image: "/images/uncharted4.png",
    genre: "ACTION · ADVENTURE",
    note: "Proof that games can be cinema",
    platform: "PS4"
  },
  {
    title: "Marvel's Spider-Man 2",
    image: "/images/spiderman2.png",
    genre: "ACTION · OPEN WORLD",
    note: "Best traversal ever built — period",
    platform: "PS5"
  },
  {
    title: "Rise of the Tomb Raider",
    image: "/images/tombraider.png",
    genre: "SURVIVAL · ACTION",
    note: "Exploration and instinct over everything",
    platform: "PC"
  },
  {
    title: "Prototype 2",
    image: "/images/prototype2.png",
    genre: "ACTION · SANDBOX",
    note: "Pure chaos — my go-to stress reset",
    platform: "PC"
  }
];
