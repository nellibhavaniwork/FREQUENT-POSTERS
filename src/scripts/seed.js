import bcrypt from 'bcryptjs';
import { dbFindOne, dbCreate } from '../lib/dbService.js';

async function seed() {
  console.log('--- Initializing Frequent Posters Seed Data ---');

  // 1. Seed Admin
  const adminEmail = 'frequentposters@redadmin.in';
  const rawPassword = '1234567890';

  const existingAdmin = await dbFindOne('admin', { email: adminEmail });
  if (!existingAdmin) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(rawPassword, salt);
    await dbCreate('admin', {
      email: adminEmail,
      password: hashedPassword,
      role: 'superadmin',
      mustChangePassword: true,
    });
    console.log(`Created Admin: ${adminEmail}`);
  } else {
    console.log(`Admin ${adminEmail} already exists.`);
  }

  // 2. Settings
  const existingSettings = await dbFindOne('settings');
  if (!existingSettings) {
    await dbCreate('settings', {
      companyName: 'Frequent Posters',
      tagline: 'DESIGN • BRAND • CREATE • GROW',
      phone: '+91 7780271948',
      whatsapp: '+91 7780271948',
      email: 'frequentposters@gmail.com',
      location: 'Hyderabad, Telangana, India',
      instagram: '@frequentposters',
      googleReviewsUrl: 'https://g.page/r/frequentposters/review',
      founderName: 'Nelli Bhavani',
      founderTitle: 'Founder — Frequent Posters',
      founderBio:
        'Every business has a unique identity. My passion is helping that identity come to life through creativity, purposeful visual design, and real-world digital training.',
      vision:
        'To be the most trusted creative partner for ambitious businesses, building memorable brands that thrive online and offline.',
      mission:
        'Combine artistic excellence, commercial understanding, and accessible digital training to help every brand communicate with unstoppable confidence.',
      heroEyebrow: 'CREATIVE DESIGN & DIGITAL BRANDING STUDIO',
      heroHeading: 'We Make Brands Impossible to Ignore.',
      heroSubheading: "Your Vision. Our Creativity. Your Brand's Next Chapter.",
      heroDescription:
        'Great businesses deserve more than ordinary designs. At Frequent Posters, we transform ideas into meaningful visual experiences. From striking brand identities and social media creatives to professional digital presence and hands-on training, we help businesses stand out, communicate better and move forward with confidence.',
    });
    console.log('Website settings initialized.');
  }

  // 3. Services
  const initialServices = [
    {
      title: 'Brand Identity & Logo Design',
      slug: 'brand-identity-logo-design',
      tagline: 'Be Recognized. Be Remembered.',
      description:
        'Your brand deserves a visual identity that reflects its personality. From logos to complete business branding, we create designs that make every first impression count.',
      icon: 'Palette',
      deliverables: [
        'Custom Logo Design & Variations',
        'Brand Color Palette & Typography Guidelines',
        'Brand Style Guide & Iconography',
        'Social Media Profile Avatar & Banner Kits',
        'Print & Vector Export Formats (AI, SVG, PDF, PNG)',
      ],
      order: 1,
      isPublished: true,
      isFeatured: true,
    },
    {
      title: 'Social Media Design & Management',
      slug: 'social-media-design-management',
      tagline: "Don't Just Post. Make an Impact.",
      description:
        'Your social media is your brand’s digital voice. We help you maintain a professional presence through creative content, engaging visuals and consistent communication.',
      icon: 'Share2',
      deliverables: [
        'Curated Monthly Content Calendars',
        'High-Converting Carousel & Single Post Creatives',
        'Engaging Story Sets & Promotional Banners',
        'Captivating Reel Covers & Video Thumbnails',
        'Captions, Hashtag Strategy & Scheduling',
      ],
      order: 2,
      isPublished: true,
      isFeatured: true,
    },
    {
      title: 'Digital Business Setup',
      slug: 'digital-business-setup',
      tagline: 'Your Business Belongs Online.',
      description:
        'Build a professional digital identity across Instagram, Facebook, LinkedIn, Google Business Profile, YouTube and other relevant platforms.',
      icon: 'Globe',
      deliverables: [
        'Google Business Profile Setup & Local SEO Verification',
        'Instagram & Facebook Business Account Configuration',
        'LinkedIn Company Page & Showcase Setup',
        'Meta Business Suite Integration & Pixel Setup',
        'WhatsApp Business Catalog & Quick Replies Setup',
      ],
      order: 3,
      isPublished: true,
      isFeatured: true,
    },
    {
      title: 'Marketing & Promotional Design',
      slug: 'marketing-promotional-design',
      tagline: 'Make Every Promotion Worth Noticing.',
      description:
        'From promotional posters to brochures, flyers, catalogues and event creatives, we turn your message into visuals that capture attention.',
      icon: 'Megaphone',
      deliverables: [
        'Product & Service Brochures / Catalogues',
        'Eye-Catching Flyers & Event Posters',
        'Digital Ad Creatives (Meta & Google Display)',
        'Standees, Roll-Up Banners & Billboard Layouts',
        'Packaging, Labels & Branded Merch Assets',
      ],
      order: 4,
      isPublished: true,
      isFeatured: true,
    },
    {
      title: 'Business & Corporate Design',
      slug: 'business-corporate-design',
      tagline: 'Professional Designs for Professional Businesses.',
      description:
        'Give your business a polished identity through company profiles, presentations, proposals, branded documents and business communication materials.',
      icon: 'Briefcase',
      deliverables: [
        'Corporate Company Profile & Pitch Decks',
        'Executive Business Cards & Branded Stationery',
        'Client Proposal Templates & Invoices',
        'Annual Reports & Service Whitepapers',
        'Email Signatures & Letterheads',
      ],
      order: 5,
      isPublished: true,
      isFeatured: true,
    },
    {
      title: 'Social Media Workshops',
      slug: 'social-media-workshops',
      tagline: 'Learn It. Manage It. Own It.',
      description:
        'Discover how to create, manage and maintain your business social media accounts through practical, beginner-friendly live Zoom training.',
      icon: 'GraduationCap',
      deliverables: [
        'Beginner-Friendly Live Zoom Sessions',
        'Hands-on Canva Design for Business Owners',
        'Meta Business Suite & Schedule Mastery',
        'Platform-by-Platform Optimization Guide',
        'Direct Q&A & Post-Session Cheat Sheets',
      ],
      order: 6,
      isPublished: true,
      isFeatured: true,
    },
  ];

  for (const s of initialServices) {
    const exists = await dbFindOne('services', { slug: s.slug });
    if (!exists) {
      await dbCreate('services', s);
      console.log(`Seeded Service: ${s.title}`);
    }
  }

  // 4. Pricing Packages
  const initialPackages = [
    {
      name: 'GROUP LIVE WORKSHOP',
      type: 'workshop',
      price: '₹199',
      period: 'per participant',
      description: 'Interactive beginner-friendly group session to master social media essentials for your business.',
      features: [
        'Live interactive Zoom masterclass',
        'Instagram & Facebook essentials',
        'Canva design basics for everyday posts',
        'Live group Q&A session',
        'Recording / summary cheat sheet access',
      ],
      ctaText: 'Register for Group Workshop',
      ctaLink: 'https://wa.me/917780271948?text=Hi%20Frequent%20Posters,%20I%20want%20to%20register%20for%20the%20Group%20Live%20Workshop%20(%E2%82%B9199)',
      isFeatured: false,
      order: 1,
      isPublished: true,
    },
    {
      name: 'PRIVATE 1-to-1 SESSION',
      type: 'workshop',
      price: '₹399',
      period: 'per business',
      description: 'Personalized private consultation and hands-on guidance customized directly to your business niche.',
      features: [
        '1-on-1 dedicated Zoom session with Bhavani',
        'Audit of your existing social media pages',
        'Personalized content & hashtag strategy',
        'Live screen-share Canva training for your brand',
        'Direct ongoing WhatsApp support for 7 days',
      ],
      ctaText: 'Book Private 1-to-1 Session',
      ctaLink: 'https://wa.me/917780271948?text=Hi%20Frequent%20Posters,%20I%20would%20like%20to%20book%20a%20Private%201-to-1%20Session%20(%E2%82%B9399)',
      isFeatured: true,
      order: 2,
      isPublished: true,
    },
    {
      name: 'COMPLETE BUSINESS SETUP',
      type: 'setup',
      price: '₹2,999',
      period: 'one-time complete setup',
      description: 'Full done-for-you professional digital setup across all major platforms with optimized brand profiles.',
      features: [
        'Instagram & Facebook Business page creation',
        'Google Business Profile setup & map pin',
        'LinkedIn & YouTube channel basic branding',
        'WhatsApp Business catalog & automated greeting',
        'Custom avatar, cover banner, and 3 starter launch posts',
      ],
      ctaText: 'Get Complete Business Setup',
      ctaLink: 'https://wa.me/917780271948?text=Hi%20Frequent%20Posters,%20I%20want%20the%20Complete%20Business%20Setup%20package%20(%E2%82%B92,999)',
      isFeatured: false,
      order: 3,
      isPublished: true,
    },
    {
      name: 'MONTHLY SOCIAL GROWTH',
      type: 'custom',
      price: '₹9,999',
      period: 'per month',
      description: 'Consistent, high-converting social media creative design & strategic posting for growing businesses.',
      features: [
        '12 Custom designed carousel & static posts',
        'High-engagement captions & targeted hashtag sets',
        'Monthly content plan & visual grid scheduling',
        'Custom story templates & highlight covers',
        'Dedicated creative manager & monthly growth report',
      ],
      ctaText: 'Start Monthly Growth',
      ctaLink: 'https://wa.me/917780271948?text=Hi%20Frequent%20Posters,%20I%20am%20interested%20in%20the%20Monthly%20Social%20Growth%20package',
      isFeatured: false,
      order: 4,
      isPublished: true,
    },
    {
      name: 'BRAND IDENTITY SUITE',
      type: 'setup',
      price: '₹6,999',
      period: 'one-time complete kit',
      description: 'Transform your business into an unforgettable brand with an executive visual identity system.',
      features: [
        '3 Distinct custom logo concepts with unlimited tweaks',
        'Official typography guidelines & brand color palette',
        'Premium business cards & stationery collateral',
        'Social media kit: DP, banner, and launch templates',
        'Full high-res vector files (AI, EPS, SVG, PNG)',
      ],
      ctaText: 'Claim Brand Identity',
      ctaLink: 'https://wa.me/917780271948?text=Hi%20Frequent%20Posters,%20I%20want%20the%20Brand%20Identity%20Suite%20package',
      isFeatured: false,
      order: 5,
      isPublished: true,
    },
    {
      name: 'REELS & VIDEO MASTERCLASS',
      type: 'workshop',
      price: '₹799',
      period: 'per participant (live Zoom)',
      description: 'Master shooting, scripting, and editing viral Instagram Reels & Shorts using only your smartphone.',
      features: [
        'Live 2-hour hands-on CapCut & Canva video masterclass',
        'Hook writing formula to stop user scrolling',
        'Trending audio curation & copyright-safe workflows',
        'High-CTR cover design & thumbnail strategies',
        'Lifetime recording + 25 Viral Hook templates PDF',
      ],
      ctaText: 'Join Reels Masterclass',
      ctaLink: 'https://wa.me/917780271948?text=Hi%20Frequent%20Posters,%20I%20want%20to%20join%20the%20Reels%20and%20Video%20Masterclass',
      isFeatured: false,
      order: 6,
      isPublished: true,
    },
    {
      name: 'CORPORATE TEAM TRAINING',
      type: 'workshop',
      price: '₹14,999',
      period: 'custom team cohort (up to 10)',
      description: 'Upskill your internal marketing or sales team with custom agency-level design and digital workflows.',
      features: [
        'Custom 3-day curriculum tailored to your industry',
        'Hands-on brand consistency & Canva speed training',
        'Review & revamp of current company pitch decks & collateral',
        'Live Q&A, practical assignments & direct instructor critique',
        'Certificate of Completion for every team member',
      ],
      ctaText: 'Book Corporate Cohort',
      ctaLink: 'https://wa.me/917780271948?text=Hi%20Frequent%20Posters,%20I%20would%20like%20to%20book%20Corporate%20Team%20Training',
      isFeatured: false,
      order: 7,
      isPublished: true,
    },
  ];

  for (const p of initialPackages) {
    const exists = await dbFindOne('pricing', { name: p.name });
    if (!exists) {
      await dbCreate('pricing', p);
      console.log(`Seeded Package: ${p.name}`);
    }
  }

  // 5. Clients
  const clientsList = [
    { name: 'Ekranfix', description: 'Tech repair & display solutions brand.', order: 1, isPublished: true },
    { name: 'Traditions Event Management & Marketing', description: 'Premier event planning & marketing agency.', order: 2, isPublished: true },
    { name: 'Newline Show Production LLP', description: 'Entertainment, stage & show production specialists.', order: 3, isPublished: true },
    { name: 'Swift Digitals', description: 'Digital printing & promotional graphics provider.', order: 4, isPublished: true },
    { name: 'Sri Durga Ladies Tailor', description: 'Bespoke traditional & modern designer boutique.', order: 5, isPublished: true },
    { name: 'Golden Eye Security', description: 'Comprehensive commercial & residential security solutions.', order: 6, isPublished: true },
    { name: 'Kernel Masters', description: 'Specialized embedded systems & Linux engineering academy.', order: 7, isPublished: true },
    { name: 'i-Leaf Doors & Windows', description: 'Architectural steel doors and interior solutions.', order: 8, isPublished: true },
    { name: 'Christiva Ministries', description: 'Community outreach and spiritual publication identity.', order: 9, isPublished: true },
  ];

  for (const c of clientsList) {
    const exists = await dbFindOne('clients', { name: c.name });
    if (!exists) {
      await dbCreate('clients', c);
      console.log(`Seeded Client: ${c.name}`);
    }
  }

  // 6. Blog Topics
  const initialBlogs = [
    {
      title: 'How to Build a Professional Brand Identity for Your Business',
      slug: 'how-to-build-a-professional-brand-identity',
      summary: 'Learn the foundational visual and strategic components required to make your brand instantly recognizable and memorable.',
      category: 'Branding',
      status: 'draft',
      readTime: '5 min read',
    },
    {
      title: 'Why Your Small Business Needs a Social Media Presence',
      slug: 'why-small-business-needs-social-media',
      summary: 'Discover how consistent social media activity builds customer trust, brand recall, and direct inbound enquiries.',
      category: 'Social Media',
      status: 'draft',
      readTime: '4 min read',
    },
    {
      title: 'How to Create an Instagram Business Account',
      slug: 'how-to-create-instagram-business-account',
      summary: 'Step-by-step tutorial on switching to a professional account, setting up contact buttons, and analyzing insights.',
      category: 'Digital Business',
      status: 'draft',
      readTime: '6 min read',
    },
    {
      title: 'Getting Started With Google Business Profile',
      slug: 'getting-started-with-google-business-profile',
      summary: 'Maximize local searches in Hyderabad and get your business on Google Maps with verified reviews.',
      category: 'Digital Business',
      status: 'draft',
      readTime: '5 min read',
    },
    {
      title: 'Canva Design Basics for Business Owners',
      slug: 'canva-design-basics-for-business-owners',
      summary: 'Master font pairing, color balance, and sizing to create clean marketing graphics without needing complex software.',
      category: 'Design Training',
      status: 'draft',
      readTime: '7 min read',
    },
    {
      title: 'How to Make Your Social Media Posts More Professional',
      slug: 'make-social-media-posts-more-professional',
      summary: '10 practical visual layout tips to instantly elevate the visual standard of your daily posts and stories.',
      category: 'Social Media',
      status: 'draft',
      readTime: '4 min read',
    },
    {
      title: "Beginner's Guide to Facebook Business Pages",
      slug: 'beginners-guide-facebook-business-pages',
      summary: 'Everything you need to know about setting up a Facebook Business Page that looks trustworthy and drives customer messages.',
      category: 'Social Media',
      status: 'draft',
      readTime: '5 min read',
    },
    {
      title: 'How Consistent Branding Builds Recognition',
      slug: 'how-consistent-branding-builds-recognition',
      summary: 'Why using identical colors, logos, and typography across all touchpoints generates 3x higher customer retention.',
      category: 'Branding',
      status: 'draft',
      readTime: '4 min read',
    },
    {
      title: 'What Every Business Should Include in a Company Profile',
      slug: 'what-to-include-in-company-profile',
      summary: 'A complete checklist of slides and sections to include in your executive corporate profile and pitch deck.',
      category: 'Corporate Design',
      status: 'draft',
      readTime: '6 min read',
    },
    {
      title: 'Simple Social Media Content Planning Tips',
      slug: 'simple-social-media-content-planning-tips',
      summary: 'How to plan a month of engaging content in just two hours using content buckets and pre-made templates.',
      category: 'Social Media',
      status: 'draft',
      readTime: '5 min read',
    },
  ];

  for (const b of initialBlogs) {
    const exists = await dbFindOne('blog', { slug: b.slug });
    if (!exists) {
      await dbCreate('blog', b);
      console.log(`Seeded Blog Topic: ${b.title}`);
    }
  }

  // 7. Portfolio Items
  const sampleProjects = [
    {
      title: 'Apex Dynamics — Visual Identity & Brand System',
      slug: 'apex-dynamics-branding',
      category: 'Brand Identity',
      client: 'Apex Dynamics',
      description: 'Comprehensive brand identity redesign featuring modern geometry, dynamic typography, and stationery.',
      thumbnailUrl: 'https://images.unsplash.com/photo-1600132806370-bf17e65e942f?q=80&w=800&auto=format&fit=crop',
      isFeatured: true,
      order: 1,
      isPublished: true,
    },
    {
      title: 'Urban Bloom — Curated Social Media Grid & Story System',
      slug: 'urban-bloom-social-creatives',
      category: 'Social Media Creatives',
      client: 'Urban Bloom Co.',
      description: 'High-aesthetic carousel templates, story sets, and promotional banners designed for high engagement.',
      thumbnailUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop',
      isFeatured: true,
      order: 2,
      isPublished: true,
    },
    {
      title: 'Nexus Venture Deck & Corporate Profile',
      slug: 'nexus-venture-profile',
      category: 'Business Profiles & Presentations',
      client: 'Nexus Global',
      description: 'Executive company profile and investor pitch deck designed with crisp information hierarchy.',
      thumbnailUrl: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=800&auto=format&fit=crop',
      isFeatured: true,
      order: 3,
      isPublished: true,
    },
    {
      title: 'Nova Launch Campaign & Outdoor Graphics',
      slug: 'nova-campaign-graphics',
      category: 'Marketing & Advertising',
      client: 'Nova Retail',
      description: 'Billboard banners, promotional flyers, and digital display ads for high-impact seasonal campaigns.',
      thumbnailUrl: 'https://images.unsplash.com/photo-1542744094-24638eff58bb?q=80&w=800&auto=format&fit=crop',
      isFeatured: true,
      order: 4,
      isPublished: true,
    },
  ];

  for (const pr of sampleProjects) {
    const exists = await dbFindOne('portfolio', { slug: pr.slug });
    if (!exists) {
      await dbCreate('portfolio', pr);
      console.log(`Seeded Portfolio: ${pr.title}`);
    }
  }

  // 8. Testimonials
  const initialTestimonials = [
    {
      name: 'Ramesh Reddy',
      company: 'Newline Show Production LLP',
      designation: 'Managing Director',
      content:
        'Frequent Posters elevated our visual presence completely. The social media assets and event branding they produced set a new benchmark for our productions.',
      rating: 5,
      order: 1,
      isPublished: true,
    },
    {
      name: 'Kavitha V.',
      company: 'Sri Durga Ladies Tailor',
      designation: 'Founder & Proprietor',
      content:
        'The 1-to-1 live workshop with Bhavani helped me understand Instagram and Canva with zero technical background. Our enquiries have grown consistently ever since!',
      rating: 5,
      order: 2,
      isPublished: true,
    },
  ];

  for (const t of initialTestimonials) {
    const exists = await dbFindOne('testimonials', { name: t.name });
    if (!exists) {
      await dbCreate('testimonials', t);
      console.log(`Seeded Testimonial: ${t.name}`);
    }
  }

  console.log('--- Seeding Done! ---');
}

seed();
