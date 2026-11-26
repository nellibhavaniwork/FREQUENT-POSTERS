import './globals.css';
import Navbar from '../components/layout/Navbar.js';
import Footer from '../components/layout/Footer.js';
import WhatsAppButton from '../components/common/WhatsAppButton.js';
import ScrollProgressBar from '../components/common/ScrollProgressBar';
import GlobalBackground from '../components/common/GlobalBackground';

export const metadata = {
  title: 'Frequent Posters | Premium Creative Agency & Digital Branding Studio',
  description:
    'Frequent Posters: Hyderabad’s premier creative branding, graphic design, social media management, business setup, and live workshops studio.',
  icons: {
    icon: '/icon.png',
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  keywords: [
    'Frequent Posters',
    'Creative Agency Hyderabad',
    'Branding Studio Hyderabad',
    'Social Media Design',
    'Nelli Bhavani',
    'Canva Workshop',
    'Logo Design',
  ],
  openGraph: {
    title: 'Frequent Posters | Design • Brand • Create • Grow',
    description: 'We Make Brands Impossible to Ignore. Transform your business identity today.',
    url: 'https://frequentposters.com',
    siteName: 'Frequent Posters',
    locale: 'en_IN',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://api.fontshare.com" />
        <link
          href="https://api.fontshare.com/v2/css?f[]=satoshi@900,800,700,600,500,400,300&display=swap"
          rel="stylesheet"
        />
        <link rel="stylesheet" href="/styles.css" />
      </head>
      <body className="antialiased min-h-screen flex flex-col font-sans text-slate-900 selection:bg-blue-100 selection:text-[#071957] relative">
        <GlobalBackground />
        <ScrollProgressBar />
        <Navbar />
        <main className="flex-1 relative z-10">{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
