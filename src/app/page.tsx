// src/app/page.tsx
import HeroSection from '@/components/home/HeroSection';
import PedagogicButtons from '@/components/home/PedagogicButtons';
import GuideSection from '@/components/home/GuideSection';
import Footer from '@/components/home/Footer';

export default function HomePage() {
  return (
    <div className="home-page">
      <HeroSection />
      <PedagogicButtons />
      <GuideSection />
      <Footer />
    </div>
  );
}