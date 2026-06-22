import { ArcadeProjectData } from '@/components/ArcadeModal';

export interface ConfiguredProject extends ArcadeProjectData {
  terminalContent: string;
}

export const PROJECTS: ConfiguredProject[] = [




  {
    id: 'proj-005',
    title: 'AJS-Terminal',
    ticket: 'AJS-TERM',
    status: 'DEPLOYED',
    date: '2026',
    category: 'Frontend',
    overview: 'A gamified, retro-themed interactive portfolio featuring a fully functional simulated UNIX terminal and smooth-scrolling GUI.',
    stack: ['Next.js 16', 'React 19', 'TypeScript', 'Tailwind v4', 'GSAP', 'Framer Motion'],
    achievements: [
      'Implemented a custom UNIX-like command-line interface in the browser',
      'Engineered an in-memory JSON data structure to simulate a hierarchical file system',
      'Created a real-time dynamic theme engine with 6 retro color palettes',
      'Optimized rendering performance of hardware-accelerated SVG CRT filters'
    ],
    metrics: [
      { label: 'LIGHTHOUSE', value: 98, color: '#28ca41' },
      { label: 'ENGAGEMENT', value: 300, color: '#bf5fff' }
    ],
    imagePlaceholderColor: '#100a1f',
    terminalContent: `# AJS-Terminal: Dual-Interface Interactive Developer Portfolio
> TICKET: AJS-TERM | STATUS: DEPLOYED | DATE: 2026

## Overview
A gamified, retro-themed interactive portfolio featuring a fully functional simulated UNIX terminal and dynamic UI. Engineered to combine a traditional scrolling web experience with an interactive, simulated command-line interface. Built with Next.js and React, the application features a custom in-memory file system, dynamic retro theming, and complex SVG/CSS visual effects.

## Tech Stack
- Frontend: Next.js 16 (App Router), React 19, TypeScript
- Styling: Tailwind CSS v4, custom SVG filters (CRT aberration)
- Animations: GSAP, Framer Motion
- Infrastructure: Custom TypeScript Command Parser & Virtual FS

## Key Achievements
[1] Architected a dual-interface portfolio featuring a fully functional simulated UNIX terminal and a smooth-scrolling graphical UI.
[2] Engineered a custom in-memory file system and command parser in TypeScript, supporting complex path resolution and directory traversal.
[3] Designed an immersive retro user experience with dynamic CSS variable theming and hardware-accelerated CRT SVG filters.
[4] Optimized rendering performance of complex visual effects without dropping frame rates.

## Architectural Patterns
- Component-Based Architecture: Modular React components (TerminalOverlay, ArcadeSelectScreen).
- Strategy Pattern: The command registry maps string commands to specific handler functions.
- In-Memory Data Store: The file system uses a JSON tree structure to simulate a hierarchical database.

## Engineering Challenges
- Simulating a File System in the Browser: Engineered a robust resolvePath utility and recursive JSON tree search.
- State Sync Between CLI and GUI: Utilized a shared CommandContext interface passed down from the root state.
- Performance Optimization: Leveraged CSS variables and SVG hardware-accelerated filters over heavy canvas operations.`
  },
  {
    id: 'proj-006',
    title: 'Creative Universe',
    ticket: 'CRTV-3D',
    status: 'DEPLOYED',
    date: '2026',
    category: 'Frontend',
    overview: 'An immersive, 3D-navigable cinematic portfolio powered by React Three Fiber, WebGL, and Sanity CMS.',
    stack: ['Next.js 16', 'Three.js', 'React Three Fiber', 'Sanity CMS', 'Tailwind', 'GSAP'],
    achievements: [
      'Architected an immersive, high-performance 3D portfolio using Next.js and WebGL',
      'Integrated a headless Sanity CMS to manage complex VFX project data and metrics',
      'Developed an interactive Tesseract Gallery utilizing dynamic 3D spatial mapping',
      'Optimized WebGL rendering performance through dynamic imports and Suspense'
    ],
    metrics: [
      { label: '3D FPS', value: 60, color: '#28ca41' },
      { label: 'CMS SCHEMAS', value: 5, color: '#00e5ff' }
    ],
    imagePlaceholderColor: '#001a1a',
    projectUrl: 'https://visakhps.vercel.app/',
    terminalContent: `# Creative Universe: 3D WebGL Cinematic Portfolio
> TICKET: CRTV-3D | STATUS: DEPLOYED | DATE: 2026
> LIVE URL: https://visakhps.vercel.app/

## Overview
Designed and developed a highly interactive 3D web experience to showcase VFX and graphic design work. Built on Next.js and Three.js, the platform features scroll-triggered 3D animations, multiple interactive gallery modes (Cinematic, Technical, and a 3D "Tesseract" view), and a robust headless CMS architecture for managing complex project metadata and technical statistics.

## Tech Stack
- Frontend: Next.js 16 (App Router), React 19, TypeScript
- 3D Engine: Three.js, React Three Fiber, Drei
- Backend/CMS: Sanity CMS (Headless) via next-sanity
- Forms & Email: React Hook Form, Zod, Resend
- Styling & Motion: Tailwind CSS, Framer Motion, GSAP, Styled Components

## Key Achievements
[1] Architected an immersive, high-performance 3D portfolio using Next.js 16 and React Three Fiber, synchronizing WebGL environments with HTML overlays via scroll controls.
[2] Integrated a headless Sanity CMS to manage complex VFX project data, engineering custom schemas for media and technical stats (poly-counts, render times).
[3] Developed an interactive Tesseract Gallery utilizing dynamic 3D spatial mapping and state-driven viewing modes (Cinematic, Technical, 3D).
[4] Optimized WebGL rendering performance through dynamic React imports, Suspense fallbacks, and strict pixel ratio management across devices.
[5] Secured lead generation by integrating a robust Contact Portal, utilizing Zod for strict form validation and the Resend API for serverless transactional emails.

## Architectural Patterns
- WebGL Layering: Separating the Universe3D (Canvas) layer from the HTML overlay layer, synchronizing them via scroll progress.
- Headless CMS Architecture: Content decoupled from presentation, allowing the artist to update VFX projects without touching code.
- Dynamic View Routing: The Gallery section uses state to render entirely different React component trees.

## Engineering Challenges
- WebGL and DOM Synchronization: Leveraged ScrollControls and HTML overlays to lock DOM elements to the 3D scroll progress.
- Performance Optimization for 3D & Media: Used React Suspense, dynamic imports, and Three.js optimization (low poly counts, adjusting pixel ratio).
- Complex Data Modeling in CMS: Engineered highly customized Sanity schemas with conditional fields to ensure clean data entry.`
  },
  {
    id: 'proj-007',
    title: 'Conduit Catalog',
    featured: true,
    ticket: 'B2B-CATA',
    status: 'DEPLOYED',
    date: '2026',
    category: 'Frontend',
    overview: 'A high-performance React-based digital catalog and quoting system for industrial materials. Features a custom "Enquiry Cart" to streamline the B2B quotation process.',
    stack: ['React 18', 'Vite', 'TypeScript', 'Tailwind CSS', 'EmailJS'],
    achievements: [
      'Digitized a massive inventory of industrial UPVC/HP fittings',
      'Engineered a custom "Enquiry Cart" state management system using React Context API',
      'Eliminated backend infrastructure costs with a serverless architecture using EmailJS',
      'Optimized application performance and UX using Vite, lazy loading, and Framer Motion'
    ],
    metrics: [
      { label: 'PERFORMANCE', value: 99, color: '#28ca41' },
      { label: 'COST SAVINGS', value: 100, color: '#00e5ff' }
    ],
    imagePlaceholderColor: '#102025',
    projectUrl: 'https://cbm-pipe-fittings.netlify.app/',
    terminalContent: `# Conduit Catalog: B2B Digital Enquiry Platform
> TICKET: B2B-CATA | STATUS: DEPLOYED | DATE: 2026
> LIVE URL: https://cbm-pipe-fittings.netlify.app/

## Overview
Engineered a modern B2B product catalog utilizing React, TailwindCSS, and serverless form submission. The platform digitizes thousands of product variants (UPVC/HP fittings) and introduces an "Enquiry Cart" to streamline the quotation process for contractors, significantly reducing manual sales friction.

## Tech Stack
- Frontend: React 18, Vite, TypeScript
- Styling & UI: TailwindCSS, Framer Motion, Lucide React
- Routing & State: React Router DOM v6, React Context API
- Integrations: EmailJS (Serverless email delivery)
- Deployment & Build: Netlify, ESLint, Prettier

## Key Achievements
[1] Architected and launched a B2B digital catalog using React and TypeScript, digitizing a massive inventory of industrial UPVC/HP fittings.
[2] Engineered a custom "Enquiry Cart" state management system using React Context API, allowing contractors to compile and submit multi-item quotation requests.
[3] Eliminated backend infrastructure costs by implementing a serverless architecture, utilizing EmailJS for immediate lead routing.
[4] Designed a mobile-first, highly responsive UI using TailwindCSS and Framer Motion.
[5] Enforced strict type safety and data integrity across thousands of product specifications by modeling the catalog strictly through TypeScript interfaces.

## Architectural Patterns
- Serverless Static Site Architecture combined with Feature-Driven Frontend Design.
- Data Layer: Operates completely headless using robust local TypeScript data models as an in-memory database.
- State Management: Utilizes React's Context API to manage the global state of the "Enquiry Cart".
- Backend-as-a-Service: Routes all quotation requests through EmailJS directly from the client side.

## Engineering Challenges
- Managing Complex Product State Without a Backend: Designed a rigorous TypeScript schema to act as an in-memory database without API latency.
- B2B Quoting vs. B2C Purchasing: Built an EnquiryContext to act as an aggregator where users add SKUs, transmitted via EmailJS.
- Performance with Large Media: Employed Vite for rapid bundling, React lazy loading (Suspense) for route splitting, ensuring instantaneous page transitions.`
  },
  {
    id: 'proj-008',
    title: 'Mother Theresa Institute',
    ticket: 'EDU-PORTAL',
    status: 'DEPLOYED',
    date: '2026',
    category: 'Frontend',
    overview: 'A responsive, high-performance static web application serving as the primary digital storefront and lead-generation platform for a vocational training institute in Kerala.',
    stack: ['HTML5', 'CSS3', 'Bootstrap 5', 'Vanilla JS', 'Lottie'],
    achievements: [
      'Developed a fully responsive educational portal showcasing 10+ vocational course categories',
      'Implemented a custom Vanilla JS light/dark mode theme engine',
      'Engineered an interactive client-side course filtering system',
      'Boosted visual engagement using LottieFiles animations and Swiper.js'
    ],
    metrics: [
      { label: 'LIGHTHOUSE', value: 95, color: '#28ca41' },
      { label: 'LOAD TIME', value: 1.5, color: '#00e5ff' }
    ],
    imagePlaceholderColor: '#1a1025',
    projectUrl: 'https://mothertheresavocationalinstitute.org',
    terminalContent: `# Mother Theresa Vocational Institute Digital Portal
> TICKET: EDU-PORTAL | STATUS: DEPLOYED | DATE: 2026
> LIVE URL: https://mothertheresavocationalinstitute.org

## Overview
Designed and developed a modern, accessible web portal for a 25-year-old vocational institute in Kerala. The platform serves as a lead-generation tool, showcasing 10+ course categories using an interactive UI, seamless Lottie animations, and a responsive layout powered by Bootstrap 5. It includes a custom light/dark theme engine and optimized SEO strategies to reach prospective students.

## Tech Stack
- Frontend Layout: HTML5, CSS3, Bootstrap 5.2.3
- Frontend Logic: Vanilla JavaScript (ES6)
- UI Components: Font Awesome (Icons), Swiper.js (Carousels)
- Animations: LottieFiles Web Components, CSS Transitions
- SEO & Meta: Schema.org JSON-LD, Open Graph, Twitter Cards

## Key Achievements
[1] Developed a fully responsive educational portal using HTML5, CSS3, and Bootstrap 5, effectively showcasing 10+ vocational course categories.
[2] Implemented a custom Vanilla JS light/dark mode theme engine, allowing users to seamlessly switch interfaces based on their preference.
[3] Engineered an interactive client-side course filtering system, enabling prospective students to easily navigate between Medical, Computer, Logistics, and Teaching programs.
[4] Boosted visual engagement and maintained high performance by integrating LottieFiles web components instead of heavy video assets.
[5] Structured the platform with advanced SEO meta tags and Schema.org JSON-LD to improve local search visibility for vocational training in Kerala.

## Architectural Patterns
- Static Site Architecture: Leverages semantic HTML for structure, paired with a component-based CSS architecture.
- Client-Side Logic: JavaScript is strictly utilized for DOM manipulation (filtering logic, theme toggling, and preloading).
- Backendless Infrastructure: The absence of a backend or database ensures rapid page loads, maximum security, and low hosting overhead.

## Engineering Challenges
- High Performance with Rich Animations: The use of dotlottie-wc ensures the animations are lightweight, scalable (SVG-based), and hardware-accelerated.
- Light/Dark Mode without CSS Preprocessors: Engineered a robust CSS variable system in theme-styles.css. JavaScript intercepts the toggle event and swaps the data-theme attribute on the root element.`
  },
  {
    id: 'proj-009',
    title: 'AR Tyres Premium Web',
    ticket: 'AR-TYRES',
    status: 'DEPLOYED',
    date: '2026',
    category: 'Frontend',
    overview: 'A high-performance, animated digital showroom driving WhatsApp conversions for a premium auto service center.',
    stack: ['React 18', 'Vite', 'TypeScript', 'Tailwind', 'Framer Motion'],
    achievements: [
      'Engineered a premium digital showroom using React, TypeScript, and Vite',
      'Developed a dynamic, responsive tyre catalog with glassmorphism UI design',
      'Implemented a zero-backend lead generation system integrating directly with WhatsApp API',
      'Optimized application performance and load times by utilizing React lazy loading'
    ],
    metrics: [
      { label: 'CONVERSION', value: 85, color: '#28ca41' },
      { label: 'LIGHTHOUSE', value: 95, color: '#00e5ff' }
    ],
    imagePlaceholderColor: '#121212',
    projectUrl: 'https://artyres.in/',
    terminalContent: `# AR Tyres - Premium Digital Showroom
> TICKET: AR-TYRES | STATUS: DEPLOYED | DATE: 2026
> LIVE URL: https://artyres.in/

## Overview
Developed a stunning, responsive React Single Page Application featuring interactive tyre catalogs, smooth scroll animations, and dynamic WhatsApp quote generation to modernize local auto retail and generate leads.

## Tech Stack
- Frontend Framework: React 18, Vite
- Language: TypeScript
- Styling & UI: Tailwind CSS, shadcn/ui, Radix UI
- Animations: Framer Motion, tailwindcss-animate
- Routing: React Router DOM
- Deployment & Hosting: Netlify

## Key Achievements
[1] Engineered a premium digital showroom using React, TypeScript, and Vite, featuring smooth scroll animations via Framer Motion to enhance user engagement.
[2] Developed a dynamic, responsive tyre catalog with glassmorphism UI design, resulting in a highly polished aesthetic that aligns with premium automotive branding.
[3] Implemented a zero-backend lead generation system integrating directly with the WhatsApp API, passing product-specific context to increase conversion rates.
[4] Optimized application performance and load times by utilizing React lazy loading (Suspense) and static asset management.
[5] Built modular, reusable UI components using Tailwind CSS and shadcn/ui, establishing a robust design system for future feature expansion.

## Architectural Patterns
- Component-Based Architecture typical of modern Single Page Applications (SPAs).
- Routing Tier: React Router handles navigation with lazy loading for specific routes.
- Presentation Tier: Highly modular components encapsulate their own logic and Framer Motion animation states.
- Data Tier: Data is statically defined within the component files ensuring immediate data availability without network latency.

## Engineering Challenges
- Delivering a premium, highly animated UI without sacrificing performance: Utilized Vite for optimized building and React's Suspense for route-based code splitting. Framer motion used judiciously with whileInView props.
- Preventing build failures from missing image assets: Implemented inline try/catch blocks for dynamic asset resolution.
- Seamless customer handoff: By linking directly to WhatsApp with pre-filled context, the business receives instant, high-intent leads on a platform they already use daily.`
  },
  {
    id: 'proj-010',
    title: 'Grow High Portal',
    featured: true,
    ticket: 'GROW-HIGH',
    status: 'DEPLOYED',
    date: '2026',
    category: 'Frontend',
    overview: 'A serverless, high-conversion educational consultancy platform connecting students with global universities.',
    stack: ['React 18', 'Vite', 'TypeScript', 'Tailwind CSS', 'shadcn-ui'],
    achievements: [
      'Architected a serverless educational portal serving as a lead generation engine for 40+ universities',
      'Implemented a zero-latency data architecture using static JSON models',
      'Integrated a backend-free lead capture system using EmailJS and Zod validation',
      'Designed a premium component-driven UI utilizing Tailwind CSS and shadcn-ui'
    ],
    metrics: [
      { label: 'UNIVERSITIES', value: 40, color: '#28ca41' },
      { label: 'INFRA COST', value: 0, color: '#00e5ff' }
    ],
    imagePlaceholderColor: '#002533',
    projectUrl: 'https://growhigh.com/',
    terminalContent: `# Grow High Educational Consultancy Portal
> TICKET: GROW-HIGH | STATUS: DEPLOYED | DATE: 2026
> LIVE URL: https://growhigh.com/

## Overview
Engineered a React-based SPA that serves as a centralized hub for university admissions and scholarships. The platform features advanced course filtering, seamless lead capture via EmailJS, and dynamic SEO optimization, resulting in a robust, zero-maintenance student acquisition funnel.

## Tech Stack
- Frontend Framework: React 18, Vite, TypeScript
- Styling & UI: Tailwind CSS, shadcn-ui, Radix UI
- Animation & UX: Framer Motion, React Fast Marquee, Lucide React
- State & Routing: React Router DOM, React Query
- Forms & Integrations: React Hook Form, Zod, EmailJS

## Key Achievements
[1] Architected a serverless educational portal using React, Vite, and TypeScript, serving as a primary lead generation engine for 40+ international university partnerships.
[2] Designed a highly responsive, component-driven UI utilizing Tailwind CSS and shadcn-ui, resulting in a premium user experience across all devices.
[3] Implemented a zero-latency data architecture using static JSON models, enabling instant filtering and search across diverse academic categories without database overhead.
[4] Integrated a backend-free lead capture system using EmailJS and Zod validation, securely routing high-intent student inquiries directly to sales teams.
[5] Optimized application SEO and performance by leveraging React Helmet Async for dynamic metadata and Vite for rapid bundling, deployed via Netlify edge networks.

## Architectural Patterns
- Static SPA (Single Page Application) pattern utilizing CDN edge nodes.
- Data Layer: Static JSON files acting as a virtual database, enabling zero-latency data retrieval.
- Container/Presentational Separation: Uses a global Layout component to wrap individual page content.
- Declarative Form Validation: Replacing manual checks with declarative schemas using Zod.

## Engineering Challenges
- Backend-Free Form Handling: Integrated EmailJS with React Hook Form and Zod to handle complex validation on the client side without exposing SMTP credentials.
- Data Management in a Static App: Structured the curriculum into relational JSON files to simulate a database query experience.
- Engaging UI without Heavy Assets: Utilized react-fast-marquee for university logos and heavily optimized CSS gradients and overlays to maintain high FPS.`
  },
  {
    id: 'proj-011',
    title: 'Zarcz Fitness & Gaming',
    featured: true,
    ticket: 'ZARCZ-POS',
    status: 'DEPLOYED',
    date: '2026',
    category: 'Full Stack',
    overview: 'A monolithic Next.js application acting as a high-performance digital storefront and a full-fledged internal Point-of-Sale (POS) system with dynamic GST invoicing.',
    stack: ['Next.js 14', 'PostgreSQL', 'Prisma', 'Tailwind', 'Zustand'],
    achievements: [
      'Architected a unified Next.js platform integrating eCommerce with an internal POS dashboard',
      'Built a custom client-side PDF invoice generator handling complex dynamic GST rules',
      'Secured administrative routes using a bespoke edge-compatible JWT auth system via jose',
      'Designed a PostgreSQL schema via Prisma ORM for inventory and historical invoicing'
    ],
    metrics: [
      { label: 'LATENCY', value: 200, color: '#28ca41' },
      { label: 'EFFICIENCY', value: 40, color: '#00e5ff' }
    ],
    imagePlaceholderColor: '#2b0000',
    projectUrl: 'https://www.zarczfitness.in/',
    terminalContent: `# Zarcz Fitness & Gaming Hub: Integrated Retail & POS Platform
> TICKET: ZARCZ-POS | STATUS: DEPLOYED | DATE: 2026
> LIVE URL: https://www.zarczfitness.in/

## Overview
A monolithic Next.js application designed for a hybrid sports retail store and gaming arena. The public-facing site features a visually stunning, Framer Motion-powered product catalog to drive footfall. Behind a JWT-secured authentication wall, it houses a robust Point-of-Sale (POS) dashboard for store administrators to manage inventory, process walk-in sales, calculate dynamic GST rates, and instantly generate professional PDF invoices.

## Tech Stack
- Frontend: React 18, Next.js 14+ (App Router), Tailwind CSS, Framer Motion, GSAP, Radix UI (Shadcn)
- Backend: Next.js API Routes, Node.js
- Database: PostgreSQL, Prisma ORM
- Authentication: Custom JWT implementation (jose), HTTP-only cookies
- Utilities: jsPDF & jsPDF-AutoTable, Zustand, React Hook Form, Zod

## Key Achievements
[1] Engineered a full-stack Next.js retail platform serving as both a public digital storefront and an internal POS system, streamlining operations.
[2] Developed a secure, custom JWT authentication flow using jose and HTTP-only cookies to protect the administrative dashboard.
[3] Implemented an in-browser PDF invoice generator using jspdf and jspdf-autotable, capable of dynamically calculating complex GST rules and producing print-ready bills.
[4] Built a highly interactive public product catalog featuring advanced client-side filtering and sophisticated scroll animations using Framer Motion and GSAP.
[5] Designed a PostgreSQL database schema via Prisma ORM to efficiently handle relational data between products, categories, historical invoices, and inventory levels.

## Architectural Patterns
- Monolithic Full-Stack: Utilizes Next.js App Router to tightly couple the React frontend with backend API routes, reducing deployment complexity.
- Client-Side Document Generation: Offloads computational heavy lifting (PDF creation) to the client browser using jspdf, reducing server costs and latency during checkout.
- Custom Lightweight Auth: Bespoke edge-compatible JWT solution with jose for securing admin routes instead of heavy libraries.

## Engineering Challenges
- Generating complex tax invoices without server delays: Implemented jspdf strictly on the client side. The client handles all GST math, renders the PDF in-memory, and triggers a download instantly, while concurrently saving the record to PostgreSQL.
- Cohesive UI (Premium Public vs Utilitarian Admin): Leveraged Radix UI primitives. Public pages heavily utilize framer-motion for micro-interactions, while the admin panel uses dense, data-rich DataTable components.
- Lightweight, Edge-compatible Auth: Built a bespoke auth utility utilizing the jose library to sign and verify JWTs stored in HTTP-only cookies, avoiding OAuth overhead.`
  },
  {
    id: 'proj-012',
    title: 'PeakTrack AI',
    featured: true,
    ticket: 'PEAK-TRK',
    status: 'PROTOTYPE (TRIAL)',
    date: '2026',
    category: 'Full Stack',
    overview: 'An AI-powered wellness and productivity platform that uses statistical analysis to turn daily habits into actionable insights. Currently in a closed trial phase.',
    stack: ['React 18', 'Django 5', 'PostgreSQL', 'Celery', 'OpenAI API'],
    achievements: [
      'Architected a full-stack wellness tracking platform using React and Django REST Framework',
      'Engineered a custom analytics pipeline using NumPy and SciPy to calculate Pearson correlations',
      'Integrated OpenAI GPT-4 API to act as an automated performance coach generating weekly reflections',
      'Implemented an asynchronous task queue architecture utilizing Celery and Redis'
    ],
    metrics: [
      { label: 'RETENTION', value: 40, color: '#28ca41' },
      { label: 'EFFICIENCY', value: 85, color: '#00e5ff' }
    ],
    imagePlaceholderColor: '#001a0f',
    terminalContent: `# PeakTrack: AI-Powered Wellness & Productivity
> TICKET: PEAK-TRK | STATUS: PROTOTYPE (TRIAL) | DATE: 2026
> NOTE: This project was deployed as a trial and is currently offline.

## Overview
PeakTrack is a comprehensive full-stack application built with React and Django that allows users to track their daily wellness pillars. It features advanced data analytics to find correlations between habits, automated AI weekly coaching reflections using GPT-4, and complex PDF report generation.

## Tech Stack
- Frontend: React 18, Vite, React Router DOM, Tailwind CSS, Recharts
- Backend: Django 5.2, Django REST Framework (DRF)
- Database: PostgreSQL (psycopg)
- Background Processing: Celery, Redis
- Data Science & AI: NumPy, SciPy, OpenAI API (GPT-4)
- Utilities: ReportLab (PDF), JWT (SimpleJWT)

## Key Achievements
[1] Architected a full-stack wellness tracking platform using React and Django REST Framework, integrating Celery and Redis to process asynchronous background tasks.
[2] Engineered a custom analytics pipeline using NumPy and SciPy to perform linear regression and calculate Pearson correlations across user habits.
[3] Integrated the OpenAI GPT-4 API via a dedicated backend Service Layer, automating the generation of weekly user reflections based on raw analytical data.
[4] Implemented an asynchronous task queue architecture utilizing Celery and Redis to handle heavy AI data generation and automated email reminders without blocking the API.
[5] Built a robust document generation module using ReportLab, enabling users to export structured, highly styled PDF reports of their performance trends.

## Architectural Patterns
- Decoupled Single Page Application (SPA) architecture via RESTful API.
- Service Layer Pattern: Keeps Django views thin by offloading business logic.
- Asynchronous Event-Driven Architecture: Offloads non-blocking operations to Celery workers backed by Redis.

## Engineering Challenges
- Meaningful AI Integration: Instead of sending raw logs, the backend first processes the data using SciPy to find the strongest mathematical correlations. This structured statistical context is then injected into the GPT-4 prompt.
- Blocking API Calls: Generating AI reflections takes several seconds. Adopted a Celery/Redis background task architecture to execute heavy processing asynchronously.
- PDF Generation: Utilized ReportLab to create a robust export service with custom grids, bypassing brittle HTML-to-PDF libraries.`
  },
  {
    id: 'proj-013',
    title: 'ApexLift Tracker',
    featured: true,
    ticket: 'APEX-LIFT',
    status: 'DEPLOYED',
    date: '2026',
    category: 'Mobile',
    overview: 'A high-performance, offline-first mobile fitness tracker that puts data ownership and seamless workout logging into the hands of the user.',
    stack: ['React Native', 'Expo', 'TypeScript', 'Context API', 'AsyncStorage'],
    achievements: [
      'Architected a local-first data layer utilizing AsyncStorage, ensuring 100% offline functionality',
      'Developed a highly responsive Active Workout Tracker leveraging React Context API and Animated',
      'Implemented an advanced on-device file parsing system for CSV and JSON routine templates',
      'Engineered a dynamic PDF Generation Engine to convert HTML reports to PDFs natively'
    ],
    metrics: [
      { label: 'OFFLINE', value: 100, color: '#28ca41' },
      { label: 'FPS', value: 60, color: '#00e5ff' }
    ],
    imagePlaceholderColor: '#0a1a1a',
    terminalContent: `# ApexLift - Local-First Premium Workout Tracker
> TICKET: APEX-LIFT | STATUS: DEPLOYED | DATE: 2026

## Overview
ApexLift is a cross-platform React Native application designed for fitness enthusiasts. Featuring customizable routines, live workout tracking with haptics, and robust data export (PDF/CSV/JSON), it provides a premium, zero-latency experience by keeping all data securely on the device.

## Tech Stack
- Frontend Framework: React Native, Expo (SDK 55)
- Navigation: React Navigation v7
- UI & Styling: React Native Paper (Material Design 3), Lucide React Native
- State Management: React Context API
- Local Storage: AsyncStorage
- Native APIs: Expo Haptics, File System, Document Picker, Print, Sharing

## Key Achievements
[1] Designed and built ApexLift, a high-performance offline-first React Native application deployed via Expo.
[2] Architected a highly responsive Active Workout Tracker leveraging React Context API and React Native Animated, achieving 60fps animations.
[3] Implemented an advanced, on-device file management and parsing system using Expo FileSystem and DocumentPicker for CSV/JSON routines.
[4] Developed a dynamic PDF Generation Engine that constructs visually premium HTML reports and converts them to PDFs natively via Expo Print.
[5] Optimized micro-interactions to enhance user engagement, incorporating LayoutAnimation for smooth transitions and Expo Haptics for tactile feedback.

## Architectural Patterns
- Local-First Architecture: Completely decoupled from a backend server. All user data is stored locally, strictly guarding user privacy.
- Context-Driven State Isolation: Utilizes Context API to manage complex states. Isolates high-frequency state of ongoing workouts.
- Platform-Agnostic File Handling: The import/export system uses native sharing intents on mobile and fallback Blob downloads on the web.

## Engineering Challenges
- Managing state during an active workout without UI lag: Abstracted the workout state into a dedicated ActiveWorkoutContext. Heavily utilized React.memo on individual components.
- Generating styled PDFs locally without a backend: Implemented a custom HTML generator within the app that injects inline CSS and remote Google Fonts. This raw HTML is passed to expo-print to render a native PDF.`
  },
  {
    id: 'proj-014',
    title: 'My Expense Tracker',
    featured: true,
    ticket: 'EXP-TRK',
    status: 'DEPLOYED',
    date: '2026',
    category: 'Mobile',
    overview: 'A privacy-first, offline-capable personal finance app built with React Native and Expo.',
    stack: ['React Native', 'Expo', 'TypeScript', 'AsyncStorage', 'Context API'],
    achievements: [
      'Engineered a privacy-first, cross-platform personal finance mobile app processing 100% of data locally via AsyncStorage',
      'Architected a robust data portability engine allowing users to export structured JSON backups and stylized PDF reports',
      'Developed a resilient JSON import system featuring data normalization, validation, and conflict resolution',
      'Implemented predictable global state management utilizing React Context and useReducer'
    ],
    metrics: [
      { label: 'PRIVACY', value: 100, color: '#28ca41' },
      { label: 'LATENCY', value: 0, color: '#00e5ff' }
    ],
    imagePlaceholderColor: '#1a1025',
    terminalContent: `# My Expense Tracker: Privacy-First Finance Manager
> TICKET: EXP-TRK | STATUS: DEPLOYED | DATE: 2026

## Overview
Designed and developed a cross-platform mobile application that enables users to effortlessly track expenses, analyze monthly budgets, and manage custom categories. Features robust local storage, dynamic theming, and advanced data portability (JSON/PDF exports and smart imports).

## Tech Stack
- Framework: React Native (v0.81), Expo (SDK 54)
- Language: TypeScript, React 19
- State Management: Context API, useReducer
- Storage: @react-native-async-storage/async-storage
- UI & Styling: React Native Paper, @expo-google-fonts/dm-sans
- Navigation: React Navigation (bottom-tabs, material-top-tabs)
- Native APIs: expo-file-system, expo-document-picker, expo-print, expo-sharing

## Key Achievements
[1] Engineered a privacy-first, cross-platform personal finance mobile app using React Native and Expo, processing 100% of data locally via AsyncStorage.
[2] Architected a robust data portability engine allowing users to export structured JSON backups and stylized PDF reports utilizing expo-print and expo-sharing.
[3] Developed a resilient JSON import system featuring data normalization, validation, and user-selectable merge/replace conflict resolution strategies to prevent data corruption.
[4] Implemented predictable global state management using React Context and useReducer to drive a monthly dashboard, complex transaction filters, and dynamic UI feedback.
[5] Optimized application performance and memory usage by implementing lazy-loaded navigation screens and modularized component design.

## Architectural Patterns
- Local-First Architecture: 100% local data processing ensures zero latency and absolute privacy. No cloud connectivity.
- Data Transfer Layer: Complex I/O operations abstracting HTML generation for PDF creation and JSON parsing.
- State Management: Centralized predictable state container (Context + useReducer) processing domain events.

## Engineering Challenges
- Handling data imports safely without corrupting local state: The import utility features robust validation and normalization, regenerating unique IDs during Merge operations to prevent React key collisions.
- Generating structured PDFs entirely on the client side: Utilized expo-print combined with dynamically generated, styled HTML strings containing user data to create professional reports.`
  },
  {
    id: 'proj-015',
    title: 'Executive BDE Portfolio',
    ticket: 'BDE-PORT',
    status: 'DEPLOYED',
    date: '2026',
    category: 'Frontend',
    overview: 'A high-impact digital portfolio for a Business Development Executive, designed to drive client acquisition and showcase sales achievements via interactive animations.',
    stack: ['Next.js 14', 'React', 'Framer Motion', 'Tailwind CSS', 'TypeScript'],
    achievements: [
      'Engineered a high-conversion personal branding platform utilizing Next.js App Router for optimal SEO',
      'Implemented complex scroll-driven animations using Framer Motion to highlight career progression',
      'Designed a sleek, corporate-friendly UI with Tailwind CSS to appeal to B2B clients',
      'Optimized application performance to ensure sub-second load times for potential leads'
    ],
    metrics: [
      { label: 'PERFORMANCE', value: 98, color: '#28ca41' },
      { label: 'CONVERSION', value: 35, color: '#00e5ff' }
    ],
    imagePlaceholderColor: '#001f3f',
    projectUrl: 'https://www.jobinyesudas.com/',
    terminalContent: `# Executive BDE Portfolio: Jobin Yesudas
> TICKET: BDE-PORT | STATUS: DEPLOYED | DATE: 2026
> LIVE URL: https://www.jobinyesudas.com/

## Overview
A high-impact digital portfolio designed for a Business Development Executive with over 3 years of experience. The platform serves as a lead generation tool and a dynamic resume, showcasing B2B sales achievements, client retention metrics, and career progression through an engaging, animated interface.

## Tech Stack
- Frontend Framework: Next.js 14 (App Router), React
- Language: TypeScript
- Styling: Tailwind CSS
- Animations: Framer Motion
- Deployment: Vercel

## Key Achievements
[1] Engineered a high-conversion personal branding platform utilizing Next.js App Router to maximize SEO and organic reach.
[2] Implemented complex scroll-driven animations using Framer Motion to dynamically reveal career progression and revenue milestones.
[3] Designed a sleek, corporate-friendly UI with Tailwind CSS tailored specifically to appeal to enterprise decision-makers and B2B clients.
[4] Built a seamless, highly responsive contact funnel to capture high-intent leads directly from the portfolio.
[5] Optimized application performance through Next.js Image optimization and static generation, ensuring sub-second load times.

## Architectural Patterns
- Server-Side Rendering (SSR) & Static Site Generation (SSG): Leveraged Next.js to pre-render content for instant load times and optimal search engine indexing.
- Component-Driven Animation: Encapsulated Framer Motion variants within reusable UI components to maintain a clean codebase while delivering a premium feel.

## Business Impact
Provides a centralized, highly professional digital identity that bridges the gap between a traditional CV and a dynamic sales pitch. The integration of smooth animations and stark typography keeps potential clients engaged, ultimately driving higher contact conversion rates.`
  }
];
