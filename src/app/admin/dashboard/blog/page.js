import { dbFind } from '../../../../lib/dbService.js';
import BlogCMSClient from './BlogCMSClient.js';

export const revalidate = 0;

export default async function BlogAdminPage() {
  const blogs = await dbFind('blog', {});
  return <BlogCMSClient initialBlogs={blogs || []} />;
}

