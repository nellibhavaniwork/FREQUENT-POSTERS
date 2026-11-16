import mongoose from 'mongoose';

const TestimonialSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    designation: { type: String, default: '' },
    company: { type: String, default: '' },
    content: { type: String, required: true },
    avatarUrl: { type: String, default: '' },
    avatarPublicId: { type: String, default: '' },
    rating: { type: Number, default: 5 },
    order: { type: Number, default: 0 },
    isPublished: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.models.Testimonial || mongoose.model('Testimonial', TestimonialSchema);

