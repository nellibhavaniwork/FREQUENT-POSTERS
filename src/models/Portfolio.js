import mongoose from 'mongoose';

const PortfolioSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    category: {
      type: String,
      required: true,
      enum: [
        'Brand Identity',
        'Social Media Creatives',
        'Marketing & Advertising',
        'Business Profiles & Presentations',
        'Digital Branding',
      ],
    },
    description: { type: String, default: '' },
    client: { type: String, default: '' },
    thumbnailUrl: { type: String, required: true },
    thumbnailPublicId: { type: String, default: '' },
    images: [
      {
        url: { type: String },
        publicId: { type: String },
        caption: { type: String },
      },
    ],
    order: { type: Number, default: 0 },
    isFeatured: { type: Boolean, default: false },
    isPublished: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.models.Portfolio || mongoose.model('Portfolio', PortfolioSchema);

