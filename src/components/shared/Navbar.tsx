// src/components/shared/Navbar.tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BarChart3, Home, BookOpen, FlaskConical, HelpCircle } from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();

  const links = [
    { href: '/', label: 'Accueil', icon: Home },
    { href: '/analyse', label: 'Analyse', icon: FlaskConical },
    { href: '/pedagogie/types-statistiques', label: 'Types', icon: BookOpen },
    { href: '/pedagogie/calculs-detailles', label: 'Calculs', icon: BarChart3 },
    { href: '/pedagogie/graphiques-interactifs', label: 'Graphiques', icon: BarChart3 },
    { href: '/guide', label: 'Guide', icon: HelpCircle },
  ];

  return (
    <nav className="navbar">
      <Link href="/" className="navbar-brand">
        <BarChart3 size={28} />
        <span>StatDescriptive</span>
      </Link>
      <div className="navbar-links">
        {links.map(l => (
          <Link
            key={l.href}
            href={l.href}
            className={`navbar-link ${pathname === l.href ? 'active' : ''}`}
          >
            <l.icon size={16} />
            <span>{l.label}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
}
