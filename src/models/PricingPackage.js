import mongoose from 'mongoose';

const PricingPackageSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    type: { type: String, enum: ['workshop', 'setup', 'custom'], default: 'workshop' },
    price: { type: String, required: true },
    period: { type: String, default: 'per session' },
    description: { type: String, required: true },
    features: [{ type: String }],
    ctaText: { type: String, default: 'Enquire Now' },
    ctaLink: { type: String, default: '/contact' },
    isFeatured: { type: Boolean, default: false },
    order: { type: Number, default: 0 },
    isPublished: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.models.PricingPackage || mongoose.model('PricingPackage', PricingPackageSchema);

