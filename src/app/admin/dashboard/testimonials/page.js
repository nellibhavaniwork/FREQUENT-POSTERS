import { dbFind } from '../../../../lib/dbService.js';
import TestimonialsCMSClient from './TestimonialsCMSClient.js';

export const revalidate = 0;

export default async function TestimonialsAdminPage() {
  const testimonials = await dbFind('testimonials', {});
  return <TestimonialsCMSClient initialTestimonials={testimonials || []} />;
}

