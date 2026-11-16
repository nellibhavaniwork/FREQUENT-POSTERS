import mongoose from 'mongoose';

const EnquirySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    businessName: { type: String, default: '' },
    whatsappNumber: { type: String, required: true },
    email: { type: String, default: '' },
    service: { type: String, default: 'General Enquiry' },
    requirement: { type: String, required: true },
    status: {
      type: String,
      enum: ['new', 'in_progress', 'completed'],
      default: 'new',
    },
    notes: { type: String, default: '' },
  },
  { timestamps: true }
);

export default mongoose.models.Enquiry || mongoose.model('Enquiry', EnquirySchema);

