import AdminSidebar from '../../../components/admin/AdminSidebar.js';

export const metadata = {
  title: 'Frequent Posters Admin CMS',
};

export default function AdminLayout({ children }) {
  return <AdminSidebar>{children}</AdminSidebar>;
}

