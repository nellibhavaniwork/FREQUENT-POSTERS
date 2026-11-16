import mongoose from 'mongoose';

const WebsiteSettingsSchema = new mongoose.Schema(
  {
    companyName: { type: String, default: 'Frequent Posters' },
    tagline: { type: String, default: 'DESIGN • BRAND • CREATE • GROW' },
    phone: { type: String, default: '+91 7780271948' },
    whatsapp: { type: String, default: '+91 7780271948' },
    email: { type: String, default: 'frequentposters@gmail.com' },
    location: { type: String, default: 'Hyderabad, Telangana, India' },
    instagram: { type: String, default: '@frequentposters' },
    googleReviewsUrl: { type: String, default: 'https://g.page/r/frequentposters/review' },
    founderName: { type: String, default: 'Nelli Bhavani' },
    founderTitle: { type: String, default: 'Founder — Frequent Posters' },
    founderBio: {
      type: String,
      default:
        'Every business has a unique identity. My passion is helping that identity come to life through thoughtful creativity and dependable digital execution.',
    },
    founderImage: { type: String, default: '' },
    founderImagePublicId: { type: String, default: '' },
    vision: {
      type: String,
      default:
        'To empower entrepreneurs and businesses with memorable visual identities and digital confidence.',
    },
    mission: {
      type: String,
      default:
        'Deliver high-impact branding, creative social media assets, and accessible live digital training under one unified roof.',
    },
    heroEyebrow: {
      type: String,
      default: 'CREATIVE DESIGN & DIGITAL BRANDING STUDIO',
    },
    heroHeading: {
      type: String,
      default: 'We Make Brands Impossible to Ignore.',
    },
    heroSubheading: {
      type: String,
      default: "Your Vision. Our Creativity. Your Brand's Next Chapter.",
    },
    heroDescription: {
      type: String,
      default:
        'Great businesses deserve more than ordinary designs. At Frequent Posters, we transform ideas into meaningful visual experiences. From striking brand identities and social media creatives to professional digital presence and hands-on training, we help businesses stand out, communicate better and move forward with confidence.',
    },
  },
  { timestamps: true }
);

export default mongoose.models.WebsiteSettings ||
  mongoose.model('WebsiteSettings', WebsiteSettingsSchema);

