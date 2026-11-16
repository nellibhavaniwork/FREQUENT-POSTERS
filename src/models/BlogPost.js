import mongoose from 'mongoose';

const BlogPostSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    category: { type: String, default: 'Branding & Social Media' },
    summary: { type: String, required: true },
    content: { type: String, default: '' },
    featuredImage: { type: String, default: '' },
    featuredImagePublicId: { type: String, default: '' },
    author: { type: String, default: 'Nelli Bhavani' },
    readTime: { type: String, default: '4 min read' },
    status: { type: String, enum: ['draft', 'published'], default: 'draft' },
    tags: [{ type: String }],
    publishedAt: { type: Date },
  },
  { timestamps: true }
);

export default mongoose.models.BlogPost || mongoose.model('BlogPost', BlogPostSchema);

