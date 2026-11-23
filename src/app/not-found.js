export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 text-center">
      <h2 className="text-3xl font-black text-[#071957] mb-2">Page Not Found</h2>
      <p className="text-slate-600 text-sm mb-6">The page you are looking for does not exist.</p>
      <a href="/" className="brand-gradient text-white text-xs font-bold px-6 py-3 rounded-xl shadow-md">
        Return Home
      </a>
    </div>
  );
}

